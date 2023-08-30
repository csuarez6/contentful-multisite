import { gql } from '@apollo/client';

import contentfulClient from './contentful-client.service';

import { DEFAULT_HEADER_ID } from '@/constants/contentful-ids.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import HeaderMainQuery, { HeaderMainFragments } from '../graphql/aux/header-main.gql';
import { HeaderSecondaryFragments, HeaderSecondaryQuery } from '../graphql/aux/header-secondary.gql';

const getInitialMenu = async (navigationId: string = null, preview = false) => {
  if (!navigationId) return null;

  let responseData = null, responseError = null;

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        ${HeaderMainFragments}
        query getInitialNavigation($id: String!, $preview: Boolean!) {
          auxNavigation(id: $id, preview: $preview) {
            ${HeaderMainQuery}
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
    responseError = e, responseData = {};
  }

  if (responseError) console.error(`Error on entry query 2 (getInitialMenu) => `, responseError.message);

  if (!responseData?.auxNavigation) return null;

  const entryContent = JSON.parse(
    JSON.stringify(
      responseData?.auxNavigation
    )
  );

  return entryContent;
};

const getReferenceItem = async (mainItemInfo: any, preview: boolean) => {
  let responseData = null;
  try {
    ({ data: responseData } = await contentfulClient(preview).query({
      query: gql`
      ${HeaderSecondaryFragments}
      query getNavigationReferences($id: String!, $preview: Boolean!) {
        auxNavigation(id: $id, preview: $preview) {
          ${HeaderSecondaryQuery}
        }
      }`,
      variables: {
        id: mainItemInfo.sys.id,
        preview
      },
      errorPolicy: 'all'
    }));
  } catch (e) {
    return { responseError: e, responseData };
  }    
  
  const blockEntryContent = JSON.parse(
    JSON.stringify(
      responseData?.auxNavigation
    )
  );
  return { responseData: blockEntryContent };
};

export const getMenu = async (navigationId: string = null, preview = false) => {
  if (!navigationId) navigationId = DEFAULT_HEADER_ID;

  const menu = await getInitialMenu(navigationId, preview);

  if (!menu) return null;

  if(menu?.mainNavCollection?.items?.length > 0) {
    for (let i = 0; i < menu.mainNavCollection.items.length; i++) {
      const mainItem = menu.mainNavCollection.items[i];
      if(mainItem.__typename === CONTENTFUL_TYPENAMES.AUX_NAVIGATION){
        const { responseData, responseError = "" } = await getReferenceItem(mainItem, preview);
        if(responseError) console.error(`Error on get reference item => `, responseError.message, mainItem);
        else { 
          menu.mainNavCollection.items[i] = responseData;
          // console.log("El responseData es: ", responseData);
        }
      }
    }
  }

  return menu;
};
