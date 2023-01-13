import { gql } from '@apollo/client';
import _ from 'lodash';

import contentfulClient from './contentful-client.service';
import getReferencesContent from './references-content.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

const REFERENCES = {
  [CONTENTFUL_TYPENAMES.PAGE]: [
    'blocksCollection', 
    'mainNavCollection',
  ],
  [CONTENTFUL_TYPENAMES.AUX_NAVIGATION]: [
    'mainNavCollection',
    'secondaryNavCollection',
    'utilityNavCollection'
  ],
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: [
    'ctaCollection',
    'featuredContentsCollection',
    'listedContentsCollection',
  ],
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: [
    'mainNavCollection',
  ],
};

type DefaultBlockInfo = {
  __typename: string;
  sys: {
    id: string;
  }
};

const getEntryContent = async (blockInfo: DefaultBlockInfo, preview = false) => {
  if (!blockInfo || !CONTENTFUL_QUERY_MAPS[blockInfo.__typename]) {
    throw new Error(`«blockInfo» are required or it's not defined`);
  }

  let responseData = null;
  let responseError = null;

  const { queryName: type, query } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];

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
    console.error(`Error on entry query (${type}) => `, responseError.message);
  }

  if (!responseData?.[type]) {
    return null;
  }

  const entryContent = JSON.parse(
    JSON.stringify(
      responseData?.[type]
    )
  );

  if (REFERENCES[entryContent.__typename] && REFERENCES[entryContent.__typename].length > 0) {
    const referencesContent = await getReferencesContent(
      entryContent,
      REFERENCES[entryContent.__typename],
      preview
    );

    _.merge(entryContent, referencesContent);
  }

  return entryContent;
};

export default getEntryContent;
