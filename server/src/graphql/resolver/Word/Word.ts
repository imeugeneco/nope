import { Resolvers } from '~/graphql/__generated__';

export const Word: Resolvers['Word'] = {
  originalId: (parent) => parent.id,
  word: (parent) => parent.word,
};
