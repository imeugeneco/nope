import { ExecutionContext } from 'graphql-helix';
import _ from 'lodash';
import { ApplicationServices } from '~/service/services';

export interface GraphqlContext {
  services: ApplicationServices;
  clientIp?: string;
  authToken: string | undefined;
}

export function createContextFactory({
  services,
}: {
  services: GraphqlContext['services'];
}): (executionContext: ExecutionContext) => Promise<GraphqlContext> {
  return async (executionContext) => {
    const headers = executionContext.request.headers as Record<
      string,
      string | string[] | null
    >;

    const authToken = headers['x-auth-token'];

    const ctx: GraphqlContext = {
      services,
      clientIp: (executionContext as any).req._remoteAddress,
      authToken: _.isArray(authToken) ? authToken[0] : authToken ?? undefined,
    };

    return ctx;
  };
}
