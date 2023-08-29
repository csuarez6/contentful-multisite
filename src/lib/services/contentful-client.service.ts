import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  gql
} from '@apollo/client';
import compress from "graphql-query-compress";
import { InvalidationPolicyCache, RenewalPolicy } from '@nerdwallet/apollo-cache-policies';

// const cache = new InvalidationPolicyCache({
//   invalidationPolicies: {
//     timeToLive: 300 * 1000, // 5 min TTL on all types in the cache
//     renewalPolicy: RenewalPolicy.WriteOnly
//   }
// });

const cache = new InMemoryCache({});

const errorLink  = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.error(graphQLErrors);
  if (networkError) console.warn(networkError);
});

const generalLink = new ApolloLink((operation, forward) => {
  const minifiedQuery = compress(operation.query.loc.source.body);
  operation.query = gql`${minifiedQuery}`;
  console.log("Se realizará una petición a GraphQL");
  return forward(operation);
});

const combinedLink = errorLink.concat(generalLink);

const httpLink = (preview = false) => {
  const CONTENTFUL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`;
  return new HttpLink({
    fetch,
    uri: CONTENTFUL_ENDPOINT,
    headers: {
      authorization: `Bearer ${preview
        ? process.env.CONTENTFUL_PREVIEW_API_TOKEN
        : process.env.CONTENTFUL_DELIVERY_API_TOKEN
        }`,
      'Content-Language': 'en-us',
    },
  });
};

const contentfulClient = (preview = false) => {
  return new ApolloClient({
    link: from([
      combinedLink, httpLink(preview)
    ]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }
  });
};

export default contentfulClient;
