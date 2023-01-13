import { gql } from '@apollo/client';

import contentfulClient from './contentful-client.service';

import { DEFAULT_HEADER_ID } from '@/constants/contentful-ids.constants';
// import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';
// import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';

import DefaultQuery from '../graphql/shared/default.gql';
import { AssetImageQuery } from '../graphql/shared/asset.gql';

// const REFERENCES = {
//   [CONTENTFUL_TYPENAMES.AUX_NAVIGATION]: [
//     'mainNavCollection',
//     'secondaryNavCollection',
//     'utilityNavCollection'
//   ],
//   [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: [
//     'mainNavCollection',
//   ],
// };

// const getMenuItems = () => {
//   return {};
// };

export const getMenu = async (navigationId: string = null, preview = false) => {
  if (!navigationId) {
    navigationId = DEFAULT_HEADER_ID;
  }

  let responseData = null;
  let responseError = null;

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntry($id: String!, $preview: Boolean!) {
          auxCustomContent(id: $id, preview: $preview) {
            ${DefaultQuery}
            promoTitle
            promoImage {
              ${AssetImageQuery}
            }
            mainNavCollection {
              items {
                ...on Page {
                  ${DefaultQuery}
                }
                ...on AuxNavigation {
                  ${DefaultQuery}
                }
                ...on AuxCustomContent {
                  ${DefaultQuery}
                }
              }
            }
            secondaryNavCollection {
              items {
                ...on Page {
                  ${DefaultQuery}
                }
                ...on AuxCustomContent {
                  ${DefaultQuery}
                }
              }
            }
            utilityNavCollection {
              items {
                ...on Page {
                  ${DefaultQuery}
                }
                ...on AuxCustomContent {
                  ${DefaultQuery}
                }
              }
            }
          }
        }
      `,
      variables: {
        id: navigationId,
        preview
      },
      errorPolicy: 'all'
    }));
  } catch (e) {
    responseError = e;
    responseData = {};
  }

  if (responseError) {
    console.error(`Error on entry query (getMenu) => `, responseError.message);
  }

  if (!responseData?.auxCustomContent) {
    return null;
  }

  const entryContent = JSON.parse(
    JSON.stringify(
      responseData?.auxCustomContent
    )
  );

  return entryContent;
};
