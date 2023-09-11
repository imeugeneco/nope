import { DateResolver, DateTimeResolver } from 'graphql-scalars';

import { Resolvers } from '../__generated__/typings';
import { User } from './User/User';
import { UserMutation } from './User/UserMutation';
import { UserQuery } from './User/UserQuery';
import { NodeQuery } from './Node/NodeQuery';
import { Node } from './Node/Node';

export const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  Query: {
    ...UserQuery,
    ...NodeQuery,
  },
  Mutation: {
    ...UserMutation,
  },
  User,
  Node,
};
