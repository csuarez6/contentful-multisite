import { gql } from '@apollo/client';
import contentfulClient from './contentful-client.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';

const getEntryContent = async (blockInfo, preview = false) => {
  if (!blockInfo) {
    throw new Error(`«blockInfo» are required`);
  }

  let responseData = null;
  let responseError = null;

  const { typeQuery: type, query } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntry($id: String!, $preview: Boolean!) {
          ${type}(id: $id, preview: $preview) {
            ${query}
          }
        }
      `,
      variables: {
        id: blockInfo.sys.id,
        preview
      },
      errorPolicy: 'all'
    }));
  } catch (e) {
    responseError = e;
    responseData = {};
  }

  if (responseError) {
    console.error('Error on entry query => ', responseError.message);
  }

  return responseData?.[type];
};

export default getEntryContent;
