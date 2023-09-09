import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/resolver/**/*.graphql',
  overwrite: true,
  generates: {
    'src/graphql/__generated__/schema.graphql': {
      plugins: [
        'schema-ast',
        {
          add: {
            content: `${constraintDirectiveTypeDefs}\n`,
          },
        },
      ],
      config: {
        includeDirectives: true,
      },
    },
    'src/graphql/__generated__/typeDefs.ts': {
      schema: './src/graphql/resolver/**/*.graphql',
      plugins: [
        {
          add: {
            content: 'const typeDefs = `\n',
          },
        },
        'schema-ast',
        {
          add: {
            placement: 'append',
            content: `\`

export default typeDefs
`,
          },
        },
      ],
      config: {
        includeDirectives: true,
      },
    },
    'src/graphql/__generated__/typings.ts': {
      schema: './src/graphql/resolver/**/*.graphql',
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
      config: {
        contextType: '../context#GraphqlContext',
        noNamespaces: true,
        mappers: {
          User: '~/entity/user.entity#IUserEntity',
        },
        scalars: {
          Date: 'string',
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;
