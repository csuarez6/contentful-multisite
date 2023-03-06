import { gql } from '@apollo/client';

import contentfulClient from './contentful-client.service';
import _ from 'lodash';

import { DEFAULT_HEADER_ID } from '@/constants/contentful-ids.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import AuxNavigationQuery from '../graphql/aux/navigation.gql';
import getReferencesContent from './references-content.service';

const REFERENCES = {
  [CONTENTFUL_TYPENAMES.AUX_NAVIGATION]: [
    'mainNavCollection',
    'secondaryNavCollection',
    'utilityNavCollection'
  ],
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: [
    'mainNavCollection',
  ],
  [CONTENTFUL_TYPENAMES.PAGE]: [
    'mainNavCollection',
  ],
};

const getInitialMenu = async (navigationId: string = null, preview = false) => {
  if (!navigationId) {
    return null;
  }

  let responseData = null;
  let responseError = null;

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntry($id: String!, $preview: Boolean!) {
          auxNavigation(id: $id, preview: $preview) {
            ${AuxNavigationQuery}
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
    console.error(`Error on entry query (getInitialMenu) => `, responseError.message);
  }

  if (!responseData?.auxNavigation) {
    return null;
  }

  const entryContent = JSON.parse(
    JSON.stringify(
      responseData?.auxNavigation
    )
  );

  return entryContent;
};

export const getMenu = async (navigationId: string = null, preview = false, depth = 6) => {
  if (!navigationId) {
    navigationId = DEFAULT_HEADER_ID;
  }

  const menu = await getInitialMenu(navigationId, preview);
  if (!menu) {
    return null;
  }

  const referencesContent = await getReferencesContent({
    content: menu,
    preview,
    referenceOverride: REFERENCES,
    maxDepthRecursion: depth
  });

  if (referencesContent) {
    _.merge(menu, referencesContent);
  }

  return menu;
};
