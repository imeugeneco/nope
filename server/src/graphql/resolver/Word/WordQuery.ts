import { Resolvers } from '~/graphql/__generated__';
import { WordNotFoundException } from '~/service-exception/word.exception';
import { getServices } from '~/service/services';

export const WordQuery: Resolvers['Query'] = {
  wordByOriginalId: async (parent, args, context) => {
    const word = await getServices().word.getWordById(args.originalId);
    if (!word) {
      throw new WordNotFoundException();
    }
    return word;
  },
};
