import { ErrorRequestHandler, Express, json } from 'express';
import {
  execute,
  GraphQLError,
  parse,
  specifiedRules,
  subscribe,
  validate,
} from 'graphql';
import { createEnvelopQueryValidationPlugin } from 'graphql-constraint-directive';
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
} from 'graphql-helix';
import graphqlPlaygroundMiddleware from 'graphql-playground-middleware-express';
import { IncomingMessage } from 'http';
import { getConfig } from '~/common/config/config';
import logger from '~/common/lib/logger';
import { ServiceException } from '~/common/types/exception/service.exception';

import {
  envelop,
  useEngine,
  useErrorHandler,
  useExtendContext,
  useLogger,
  useSchema,
} from '@envelop/core';

import { createContextFactory, GraphqlContext } from './context';
import { getSchema } from './schema';

export async function createGraphqlServer(options: {
  services: GraphqlContext['services'];
  express: Express;
}) {
  const { express, services } = options;
  const extendContext = createContextFactory({ services });

  express.use((req, res, next) => {
    (req as any).start = new Date();
    next();
  });

  express.use(json());

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof Error && err.message.includes('request aborted')) {
      const reqDate: Date | undefined = (req as any).start;

      logger.error(err.message, {
        url: req.url,
        headers: req.headers,
        body: req.body,
        reqDate,
      });
    }
    next(err);
  };

  express.use(errorHandler);

  const getEnveloped = envelop({
    plugins: [
      useEngine({ parse, validate, specifiedRules, execute, subscribe }),
      useSchema(getSchema()),
      useExtendContext(extendContext),
      useErrorHandler<GraphqlContext>(({ errors, ...args }) => {
        errors.forEach((error) => {
          if (error instanceof ServiceException) {
            const errorJson = error.toJson();
            throw new GraphQLError(
              errorJson.message,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              {
                code: errorJson.code,
                type: errorJson.type,
              },
            );
          } else {
            console.error(error);
          }
        });
      }),
      createEnvelopQueryValidationPlugin(),
      useLogger({
        logFn: async (eventName, args) => {
          if (eventName === 'execute-end') {
            const action = args?.args?.contextValue?.operation?.operation;
            const method =
              args?.args?.contextValue?.operation?.name?.value ??
              args?.args?.contextValue?.operation?.loc?.source?.body;

            const now = new Date();

            logger.info(
              `[${now.toISOString()}] ${(
                args?.args?.contextValue?.req as IncomingMessage
              )?.socket?.remoteAddress} ${(
                args?.args?.contextValue?.req as IncomingMessage
              )?.headers['user-agent']} [${action}] ${method}`,
            );
          }
        },
      }),
    ],
  });

  express.use('/graphql', async (req, res) => {
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };

    const { parse, validate, contextFactory, execute, schema } = getEnveloped({
      req,
    });

    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      parse,
      validate,
      execute,
      contextFactory,
    });

    sendResult(result, res);
  });

  if (getConfig().env !== 'prod') {
    express.get(
      '/playground',
      graphqlPlaygroundMiddleware({
        endpoint: '/graphql',
      }),
    );
  }
}
