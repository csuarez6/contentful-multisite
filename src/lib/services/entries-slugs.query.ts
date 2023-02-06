import { gql } from '@apollo/client';
import contentfulClient from './contentful-client.service';

const getEntriesSlugs = async ({ limit = 100 }, preview = false) => {
  let responseData = null;
  let responseError = null;

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntriesSlugs($limit: Int!, $preview: Boolean!) {
          entryCollection(where: { urlPath_exists: true }, limit: $limit, preview: $preview) {
            items {
              ...on Product {
                sys {
                  id
                  publishedAt
                }
                slug
              }
              ...on Page {
                sys {
                  id
                  publishedAt
                }
                slug
              }
            }
          }
        }
      `,
      variables: {
        limit,
        preview
      },
      errorPolicy: 'all'
    }));
  } catch (e) {
    responseError = e;
    responseData = {};
  }

  if (responseError) {
    console.error('Error on entry-slug query => ', responseError.message);
  }

  return responseData?.entryCollection?.items ?? [];
};

export default getEntriesSlugs;
