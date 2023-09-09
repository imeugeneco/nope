process.env.TZ = 'UTC';
import './load-config';

import express from 'express';
import morgan from 'morgan';

import { getConfig } from '@config/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { LOGGER_FORMAT } from './common/lib';
import logger from './common/lib/logger';
import { createGraphqlServer } from './graphql/server';
import { getServices, initServices } from './service/services';

async function bootstrap() {
  console.log('ENV:', getConfig().env);
  const expressInstance = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.setGlobalPrefix(getConfig().apiPrefix);

  app.enableCors({
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.use(
    morgan(getConfig().env === 'dev' ? 'dev' : LOGGER_FORMAT, {
      skip: (req) => {
        return req.url!.includes('/health') || req.url === '/';
      },
    }),
  );

  await initServices(app);
  logger.info('init services');

  await createGraphqlServer({
    services: getServices(),
    express: expressInstance,
  });

  await app.startAllMicroservices();
  await app.listen(`${getConfig().port}`);
}

bootstrap();
