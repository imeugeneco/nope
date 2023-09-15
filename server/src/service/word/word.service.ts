import { Word } from '@prisma/client';
import _ from 'lodash';
import { z } from 'zod';
import { IWordEntity } from '~/entity/word.entity';
import { getServices } from '../services';

export const getWordService = _.memoize(() => {
  const zodPrismaWordEntity = z.object({
    id: z.number(),
    word: z.string(),
  });

  const prismaWordToEntity = (obj: Word): IWordEntity => {
    const parsed = zodPrismaWordEntity.parse(obj);
    return {
      $typename: 'WordEntity',
      id: parsed.id.toString(),
      word: parsed.word,
    };
  };

  return {
    async getWordById(id: string) {
      const word = await getServices().prisma.primaryClient.word.findFirst({
        where: { id: Number(id) },
      });
      return word ? prismaWordToEntity(word) : null;
    },
  };
});

export type WordService = ReturnType<typeof getWordService>;
