import {
  GetGeneralOptionsQuery,
  GetGeneralOptionsQueryVariables,
  GetRelatedArticlesQuery,
  GetRelatedArticlesQueryVariables,
  GetRelatedEventsQuery,
  GetRelatedEventsQueryVariables,
  GetResourceQuery,
  GetResourceQueryVariables,
  GetStaticPathsQuery,
  GetStaticPathsQueryVariables,
} from '../graphql-sdk-content';
import {
  GetShopWithWaiversQuery,
  GetShopWithWaiversQueryVariables,
  GetWaiverQuery,
  GetWaiverQueryVariables,
} from '../graphql-sdk-api-gateway';
import { apiGatewaySdk, sdk } from './client';

// Typescript overloads
async function getWithRetries(
  query: 'getResource',
  variables: GetResourceQueryVariables
): Promise<GetResourceQuery>;

async function getWithRetries(
  query: 'getGeneralOptions',
  variables: GetGeneralOptionsQueryVariables
): Promise<GetGeneralOptionsQuery>;

async function getWithRetries(
  query: 'getRelatedArticles',
  variables: GetRelatedArticlesQueryVariables
): Promise<GetRelatedArticlesQuery>;

async function getWithRetries(
  query: 'getRelatedEvents',
  variables: GetRelatedEventsQueryVariables
): Promise<GetRelatedEventsQuery>;

async function getWithRetries(
  query: 'getStaticPaths',
  variables: GetStaticPathsQueryVariables
): Promise<GetStaticPathsQuery>;

async function getWithRetries(query: keyof typeof sdk, variables: any) {
  let retries = 0;

  while (retries++ < 5) {
    try {
      const data = await sdk[query](variables);
      return data;
    } catch (error) {
      console.error(
        `Error running ${query} ${variables.type || ''} ${variables.key || ''} on site ${
          variables.siteId
        }:${variables.target}`
      );
      console.error(error);
      await new Promise((resolve) => {
        setTimeout(resolve, 5 * 1000);
      });
    }
  }
  throw new Error(
    `Error fetching ${variables.type} ${variables.key} on site ${variables.siteId}:${variables.target} - failed five times`
  );
}

export default getWithRetries;

export async function apiGatewayGetWithRetries(
  query: 'getWaiver',
  variables: GetWaiverQueryVariables
): Promise<GetWaiverQuery>;

export async function apiGatewayGetWithRetries(
  query: 'getShopWithWaivers',
  variables: GetShopWithWaiversQueryVariables
): Promise<GetShopWithWaiversQuery>;

export async function apiGatewayGetWithRetries(
  query: keyof typeof apiGatewaySdk,
  variables: any
) {
  let retries = 0;

  while (retries++ < 5) {
    try {
      const data = await apiGatewaySdk[query](variables);
      return data;
    } catch (error) {
      console.error(`Error running ${query} on API Gateway`);
      console.error(error);
      await new Promise((resolve) => {
        setTimeout(resolve, 5 * 1000);
      });
    }
  }
  throw new Error(`Error running query ${query} on API Gateway - failed five times`);
}
