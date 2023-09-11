import { Resolvers } from '~/graphql/__generated__';
import { getNodeFromGlobalId } from '~/graphql/service/common';

export const entityTypeToGraphQlType = (entityType: string) => {};

export const NodeQuery: Resolvers['Query'] = {
  node: async (parent, args, context) => {
    return await getNodeFromGlobalId(args.id, { ...context });
  },
};
