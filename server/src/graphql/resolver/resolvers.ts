import { DateResolver, DateTimeResolver } from 'graphql-scalars';

import { Resolvers } from '../__generated__/typings';
import { User } from './User/User';
import { UserMutation } from './User/UserMutation';
import { UserQuery } from './User/UserQuery';

export const resolvers: Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  Query: {
    ...UserQuery,
  },
  Mutation: {
    ...UserMutation,
  },
  User,
};
