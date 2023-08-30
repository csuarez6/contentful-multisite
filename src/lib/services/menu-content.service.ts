import { gql } from '@apollo/client';

import contentfulClient from './contentful-client.service';

import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from '@/constants/contentful-ids.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import HeaderMainQuery, { HeaderMainFragments } from '../graphql/aux/header-main.gql';
import { HeaderSecondaryFragments, HeaderSecondaryQuery } from '../graphql/aux/header-secondary.gql';
import NavigationQuery, { NavigationFragments } from '../graphql/aux/navigation.gql';

const getMainHeader = async (navigationId: string = null, preview = false) => {
  if (!navigationId) return null;

  let responseData = null, responseError = null;

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        ${HeaderMainFragments}
        query getMainHeader($id: String!, $preview: Boolean!) {
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

  if (responseError) console.error(`Error on entry query (getMainHeader) => `, responseError.message);

  if (!responseData?.auxNavigation) return null;

  const entryContent = JSON.parse(
    JSON.stringify(
      responseData?.auxNavigation
    )
  );

  return entryContent;
};

const getSecondaryHeader = async (mainItemInfo: any, preview: boolean) => {
  let responseData = null;
  try {
    ({ data: responseData } = await contentfulClient(preview).query({
      query: gql`
      ${HeaderSecondaryFragments}
      query getSecondaryHeader($id: String!, $preview: Boolean!) {
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

export const getHeader = async (navigationId: string = null, preview = false) => {
  if (!navigationId) navigationId = DEFAULT_HEADER_ID;

  const header = await getMainHeader(navigationId, preview);

  if(header?.mainNavCollection?.items?.length > 0) {
    for (let i = 0; i < header.mainNavCollection.items.length; i++) {
      const mainItem = header.mainNavCollection.items[i];
      if(mainItem.__typename === CONTENTFUL_TYPENAMES.AUX_NAVIGATION){
        const { responseData, responseError = "" } = await getSecondaryHeader(mainItem, preview);
        if(responseError) console.error(`Error on get reference item => `, responseError.message, mainItem);
        else header.mainNavCollection.items[i] = responseData;
      }
    }
  }

  return header ?? false;
};

export const getNavigation = async (navigationId: string = null, preview = false) => {
  if (!navigationId) navigationId = DEFAULT_FOOTER_ID;
  let responseData = null, responseError = null;
  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        ${NavigationFragments}
        query getNavigation($id: String!, $preview: Boolean!) {
          auxNavigation(id: $id, preview: $preview) {
            ${NavigationQuery}
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

  if (responseError) console.error(`Error on entry query (getNavigation) => `, responseError.message);

  const navigation = JSON.parse(
    JSON.stringify(
      responseData?.auxNavigation
    )
  );

  return navigation ?? false;
};
