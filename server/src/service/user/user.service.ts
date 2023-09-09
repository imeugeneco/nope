import _ from 'lodash';
import { z } from 'zod';
import { IUserEntity } from '~/entity/user.entity';

import { User } from '@prisma/client';

import { getServices } from '../services';
import { UserNotfoundException } from '~/service-exception';

export const getUserService = _.memoize(() => {
  const zodPrismaUserEntity = z.object({
    id: z.number(),
    createdAt: z.date(),
    phoneNumber: z.string().nullable(),
    email: z.string().nullable(),
    nickname: z.string(),
    bio: z.string().nullable(),
  });

  const prismaUserToEntity = (obj: User): IUserEntity => {
    const parsed = zodPrismaUserEntity.parse(obj);
    return {
      $typename: 'UserEntity',
      id: parsed.id.toString(),
      createdAt: parsed.createdAt,
      phoneNumber: parsed.phoneNumber,
      email: parsed.email,
      nickname: parsed.nickname,
      bio: parsed.bio,
    };
  };

  return {
    async getUserById(id: string) {
      const user = await getServices().prisma.primaryClient.user.findUnique({
        where: { id: Number(id) },
      });
      return user ? prismaUserToEntity(user) : null;
    },

    async createUser(args: {
      nickname: string;
      phoneNumber?: string;
      email?: string;
    }): Promise<IUserEntity> {
      const createdUser = await getServices().prisma.primaryClient.user.create({
        data: args,
      });
      return prismaUserToEntity(createdUser);
    },

    async updateUser(args: {
      id: string;
      nickname?: string;
      phoneNumber?: string;
      email?: string;
      bio?: string;
    }): Promise<IUserEntity> {
      const user = await getServices().prisma.primaryClient.user.findUnique({
        where: { id: Number(args.id) },
      });
      if (!user) {
        throw new UserNotfoundException();
      }
      const updatedUser = await getServices().prisma.primaryClient.user.update({
        where: { id: user.id },
        data: {
          nickname: args.nickname ?? user.nickname,
          phoneNumber: args.phoneNumber ?? user.phoneNumber,
          email: args.email ?? user.email,
          bio: args.bio ?? user.bio,
        },
      });
      return prismaUserToEntity(updatedUser);
    },
  };
});

export type UserService = ReturnType<typeof getUserService>;
