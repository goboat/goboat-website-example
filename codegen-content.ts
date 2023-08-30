import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['./content-service-schema.graphql'],
  documents: './lib/graphql/queries/content/*.gql',
  generates: {
    './lib/graphql-sdk-content.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};

export default config;
