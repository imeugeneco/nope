import { GraphQLSchema } from 'graphql';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';

import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs } from './__generated__';
import { resolvers } from './resolver';

let schema: GraphQLSchema | null = null;

export function getSchema() {
  if (schema) {
    return schema;
  }

  schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers,
    inheritResolversFromInterfaces: true,
  });

  return schema;
}
