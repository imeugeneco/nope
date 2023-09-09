import { INestApplication } from '@nestjs/common';

import { getPrismaService, PrismaService } from './prisma/prisma.service';
import { getUserService, UserService } from './user/user.service';

export interface ApplicationServices {
  user: UserService;
  prisma: PrismaService;
}

let services: ApplicationServices | null = null;

export const initServices = async (
  nestApplication: INestApplication,
): Promise<void> => {
  services = {
    user: getUserService(),
    prisma: await getPrismaService(),
  };
};

export const getServices = (): ApplicationServices => {
  if (!services) {
    throw new Error(`Service was not initialized`);
  }
  return services;
};
