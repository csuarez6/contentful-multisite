import { gql } from '@apollo/client';

import contentfulClient from './contentful-client.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';

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

  let responseData = null;
  let responseError = null;

  const { queryName: type, query } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];

  if (where) {
    where = `where: ${where}, `;
  }

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
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
  } catch (e) {
    responseError = e;
    responseData = {};
  }

  if (responseError) {
    console.error(`Error on collection query (${type}) => `, responseError.message, blockInfo);
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
