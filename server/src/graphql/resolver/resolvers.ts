import { DateResolver, DateTimeResolver } from 'graphql-scalars';

import { Resolvers } from '../__generated__/typings';
import { User } from './User/User';
import { UserMutation } from './User/UserMutation';
import { UserQuery } from './User/UserQuery';
import { NodeQuery } from './Node/NodeQuery';
import { WordQuery } from './Word/WordQuery';
import { Node } from './Node/Node';
import { Word } from './Word/Word';

export const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  Query: {
    ...NodeQuery,
    ...UserQuery,
    ...WordQuery,
  },
  Mutation: {
    ...UserMutation,
  },
  Node,
  User,
  Word,
};
