import { INestApplication } from '@nestjs/common';

import { getPrismaService, PrismaService } from './prisma/prisma.service';
import { getUserService, UserService } from './user/user.service';
import { getWordService, WordService } from './word/word.service';

export interface ApplicationServices {
  prisma: PrismaService;
  user: UserService;
  word: WordService;
}

let services: ApplicationServices | null = null;

export const initServices = async (
  nestApplication: INestApplication,
): Promise<void> => {
  services = {
    prisma: await getPrismaService(),
    user: getUserService(),
    word: getWordService(),
  };
};

export const getServices = (): ApplicationServices => {
  if (!services) {
    throw new Error(`Service was not initialized`);
  }
  return services;
};
