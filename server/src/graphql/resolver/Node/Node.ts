import { Resolvers } from '~/graphql/__generated__';
import { getTypeName, globalIdResolver } from '~/graphql/service/common';

export const Node: Resolvers['Node'] = {
  __resolveType: (parent) => {
    return getTypeName(parent);
  },

  id: (parent) => {
    return globalIdResolver(parent);
  },
};
