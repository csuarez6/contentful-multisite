import { gql } from '@apollo/client';
import contentfulClient, { removeUnresolved } from './contentful-client.service';

const getEntriesSlugs = async ({ limit = 100 }, preview = false) => {
  let responseData = null;
  let responseError = null;

  try {
    ({ data: responseData, errors: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntriesSlugs($limit: Int!, $preview: Boolean!) {
          pageCollection(where: { AND: { urlPaths_exists: true, contentfulMetadata: { tags: { id_contains_none: ["testPage"] } } } }, order: name_ASC, limit: $limit, preview: false) {
            items {
              sys {
                id
                publishedAt
              }
              urlPaths
            }
          }
          productCollection(where: { AND: { urlPaths_exists: true, contentfulMetadata: { tags: { id_contains_none: ["testPage"] } } } }, order: name_ASC, limit: $limit, preview: $preview) {
            items {
              sys {
                id
                publishedAt
              }
              urlPaths
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
    responseData = removeUnresolved(responseData, responseError);
  } catch (e) {
    console.error('Error on getEntriesSlugs query => ', e.message);
    return null;
  }

  const resultEntries = responseData?.pageCollection?.items ?? [];
  if (responseData?.productCollection?.items) {
    resultEntries.push(...responseData.productCollection.items);
  }

  return resultEntries;
};

export default getEntriesSlugs;
