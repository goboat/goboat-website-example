import { GraphQLClient } from 'graphql-request';

const contentGraphQLClient = new GraphQLClient(`${process.env.CONTENT_HOST}/graphql`);
const publicContentGraphQLClient = new GraphQLClient('/graphql');
const apiGraphQLClient = new GraphQLClient(`${process.env.API_HOST}`, {
  headers: {
    'x-client-name': 'website-private',
  },
});
const publicApiGraphQLClient = new GraphQLClient(`/api-gateway/graphql`, {
  headers: {
    'x-client-name': 'website-public',
  },
});

import { getSdk } from '../graphql-sdk-content';
import { getSdk as getGatewaySdk } from '../graphql-sdk-api-gateway';

export const sdk = getSdk(contentGraphQLClient);
export const publicSdk = getSdk(publicContentGraphQLClient);
export const apiGatewaySdk = getGatewaySdk(apiGraphQLClient);
export const publicApiGatewaySdk = getGatewaySdk(publicApiGraphQLClient);
