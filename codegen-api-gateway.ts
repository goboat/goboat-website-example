import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://staging.api.goboat.io/v2/graphql',
  documents: './lib/graphql/queries/api-gateway/*.gql',
  generates: {
    './lib/graphql-sdk-api-gateway.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};

export default config;
