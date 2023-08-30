import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    '../../services/waivers-api/src/graphql/schemas/*.ts',
    '../../services/booking-api/src/graphql/schemas/*.ts',
  ],
  documents: './lib/graphql/queries/api-gateway/*.gql',
  generates: {
    './lib/graphql-sdk-api-gateway.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};

export default config;
