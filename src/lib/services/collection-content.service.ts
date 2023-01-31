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

  // if (
  //   REFERENCES[entryContent.__typename] &&
  //   REFERENCES[entryContent.__typename].length > 0 &&
  //   recursive && actualDeepth < MAX_DEEPTH_RECURSION
  // ) {
  //   const referencesContent = await getReferencesContent(
  //     entryContent,
  //     REFERENCES[entryContent.__typename],
  //     preview,
  //     recursive,
  //     actualDeepth
  //   );

  //   _.merge(entryContent, referencesContent);
  // }

  return collectionContent;
};

export default getCollectionContent;
