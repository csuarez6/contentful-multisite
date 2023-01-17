import { gql } from '@apollo/client';

import contentfulClient from './contentful-client.service';
import _ from 'lodash';

import { DEFAULT_HEADER_ID } from '@/constants/contentful-ids.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';
// import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';

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

export const getMenu = async (navigationId: string = null, preview = false, deepth = 4) => {
  if (!navigationId) {
    navigationId = DEFAULT_HEADER_ID;
  }

  // First Level
  const menu = await getInitialMenu(navigationId, preview);
  if (!menu) {
    return null;
  }

  if (
    REFERENCES[menu.__typename] &&
    REFERENCES[menu.__typename].length > 0
  ) {
    const referencesContent = await getReferencesContent(
      menu,
      REFERENCES[menu.__typename],
      preview,
      false
    );

    _.merge(menu, referencesContent);
  }


  if (deepth >= 2) {
    // Second level
    for (const itemMenuKey in menu.mainNavCollection.items) {
      const contentSubMenu = { ...menu.mainNavCollection.items[itemMenuKey] };
      const referencesContent = await getReferencesContent(
        contentSubMenu,
        REFERENCES[contentSubMenu.__typename],
        preview,
        false
      );

      _.merge(menu.mainNavCollection.items[itemMenuKey], referencesContent);

      if (deepth >= 3 && contentSubMenu.mainNavCollection?.items?.length > 0) {
        for (const thirdMenuKey in contentSubMenu.mainNavCollection.items) {
          const thirdMenuContent = { ...contentSubMenu.mainNavCollection.items[thirdMenuKey] };
          const referencesThirdContent = await getReferencesContent(
            thirdMenuContent,
            REFERENCES[thirdMenuContent.__typename],
            preview,
            false
          );

          _.merge(menu.mainNavCollection.items[itemMenuKey].mainNavCollection.items[thirdMenuKey], referencesThirdContent);

          if (deepth >= 4 && thirdMenuContent.mainNavCollection?.items?.length > 0) {
            for (const fourthMenuKey in thirdMenuContent.mainNavCollection.items) {
              const fourthMenuContent = { ...thirdMenuContent.mainNavCollection.items[fourthMenuKey] };
              const referencesFourthContent = await getReferencesContent(
                fourthMenuContent,
                REFERENCES[fourthMenuContent.__typename],
                preview,
                false
              );

              _.merge(menu.mainNavCollection.items[itemMenuKey].mainNavCollection.items[thirdMenuKey].mainNavCollection.items[fourthMenuKey], referencesFourthContent);
            }
          }
        }
      }
    }
  }

  return menu;
};
