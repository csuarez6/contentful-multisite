import { gql } from '@apollo/client';

import contentfulClient, { removeUnresolved } from './contentful-client.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { sleep } from '@/utils/functions';

type DefaultBlockInfo = {
  __typename: string;
  sys?: {
    id?: string;
  }
};

export const MAX_DEEPTH_RECURSION = 14;

const getCollectionContent = async (
  blockInfo: DefaultBlockInfo, 
  where = '', 
  preview = false,
) => {
  if (!blockInfo || !CONTENTFUL_QUERY_MAPS[blockInfo.__typename]) {
    console.error(`Error on getCollectionContent: «blockInfo» are required or it's not defined`);
    return null;
  }

  let responseData = null, responseError = null;
  const { queryName: type, query, fragments = "" } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];
  if (where) where = `where: ${where}, `;

  try {
    await sleep(30);
    ({ data: responseData, errors: responseError } = await contentfulClient(preview).query({
      query: gql`
        ${fragments}
        query getEntry($preview: Boolean!) {
          ${type}Collection(${where}preview: $preview) {
            items {
              ${query}
            }
          }
        }
      `,
      variables: {
        preview
      },
      errorPolicy: 'all'
    }));
    responseData = removeUnresolved(responseData, responseError);
  } catch (e) {
    console.error(`Error on getCollectionContent query => `, e.message);
    return null;
  }

  if (!responseData[`${type}Collection`]?.items?.length) {
    return null;
  }

  const collectionContent = JSON.parse(
    JSON.stringify(
      responseData[`${type}Collection`].items
    )
  );

  return collectionContent;
};

export default getCollectionContent;
