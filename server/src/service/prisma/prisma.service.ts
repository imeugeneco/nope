import _ from 'lodash';
import { getConfig } from '~/common/config/config';

import { PrismaClient } from '@prisma/client';

export const getPrismaService = _.memoize(async () => {
  const primaryClient = new PrismaClient({
    log:
      process.env.NODE_ENV === 'dev'
        ? [
            {
              emit: 'event',
              level: 'query',
            },
            {
              emit: 'stdout',
              level: 'info',
            },
            {
              emit: 'stdout',
              level: 'error',
            },
            {
              emit: 'stdout',
              level: 'warn',
            },
          ]
        : [],
    datasources: {
      db: {
        url: getConfig().primaryDbPrismaUrl,
      },
    },
  });

  if (process.env.NODE_ENV === 'dev') {
    primaryClient.$on('query', (e: any) => {
      console.log('Query: ' + e.query);
      console.log('Params: ' + e.params);
      console.log('Duration: ' + e.duration + 'ms');
    });
  }

  return { primaryClient };
});

export type PrismaService = Awaited<ReturnType<typeof getPrismaService>>;
