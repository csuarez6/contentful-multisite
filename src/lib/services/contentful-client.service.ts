import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from
} from '@apollo/client';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }

  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = (preview = false) => {
  const CONTENTFUL_ENDPOINT = process.env.CONTENTFUL_ENDPOINT ??
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`;

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
  const appLink = from([
    errorLink, httpLink(preview)
  ]);

  return new ApolloClient({
    link: appLink,
    cache: new InMemoryCache({
      resultCaching: process.env.NODE_ENV == 'production' || process.env.VERCEL_ENV == 'production'
    })
  });
};

export default contentfulClient;
