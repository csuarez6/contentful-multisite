import { gql } from '@apollo/client';
import contentfulClient, { removeUnresolved } from './contentful-client.service';

const getProductsSlugs = async ({ limit = 100 }, preview = false) => {
  let responseData = null;
  let responseError = null;

  try {
    ({ data: responseData, errors: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntriesSlugs($limit: Int!, $preview: Boolean!) {
          productCollection(where: { AND: { urlPaths_exists: true, contentfulMetadata: { tags: { id_contains_none: ["testPage"] } } } }, order: name_ASC, limit: $limit, preview: $preview) {
            items {
              sys {
                id
              }
              sku
              marketId
              promoImage 
                {  
                  url
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

export default getProductsSlugs;
