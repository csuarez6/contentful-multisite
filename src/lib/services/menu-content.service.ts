import { gql } from '@apollo/client';

import contentfulClient from './contentful-client.service';

import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from '@/constants/contentful-ids.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import HeaderMainQuery, { HeaderMainFragments } from '../graphql/aux/header-main.gql';
import { HeaderSecondaryFragments, HeaderSecondaryQuery } from '../graphql/aux/header-secondary.gql';
import NavigationQuery, { NavigationFragments } from '../graphql/aux/navigation.gql';
import { getCommercelayerProduct } from './commerce-layer.service';
import _ from 'lodash';

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

  const entryContent = JSON.parse(JSON.stringify(responseData?.auxNavigation));

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

const applySaltToMegamenu = async (flow: any) => {
  const { mainNavCollection } = flow || {};

  if (mainNavCollection?.items?.length > 0) {
    for (const mainItem of mainNavCollection.items) {
      if (mainItem.__typename === CONTENTFUL_TYPENAMES.AUX_NAVIGATION) {
        const { secondaryNavCollection } = mainItem || {};

        if (secondaryNavCollection?.items?.length > 0) {
          mainItem.secondaryNavCollection.items = await Promise.all(
            secondaryNavCollection.items.map(async (item: any) => {
              if (item.__typename === CONTENTFUL_TYPENAMES.PRODUCT && item?.sku) {
                const commercelayerProduct = await getCommercelayerProduct(item.sku);
                _.merge(item, commercelayerProduct);
              }
              return item;
            })
          );
        }
      }
    }
  }

  return flow;
};

const NAVIGATION_FIELDS = ["mainNavCollection", "secondaryNavCollection"];

export const getHeader = async (navigationId: string = null, preview = false) => {
  if (!navigationId) navigationId = DEFAULT_HEADER_ID;

  const header = await getMainHeader(navigationId, preview);

  for (const navigationField of NAVIGATION_FIELDS) {
    if (header?.[navigationField]?.items?.length > 0) {
      for (let i = 0; i < header[navigationField].items.length; i++) {
        const mainItem = header[navigationField].items[i];
        if (mainItem.__typename === CONTENTFUL_TYPENAMES.AUX_NAVIGATION) {
          const { responseData, responseError = "" } = await getSecondaryHeader(mainItem, preview);
          if (responseError) {
            console.error(`Error on get reference item => `, responseError.message, mainItem);
          } else {
            let navigation = responseData;
            if (navigation?.[navigationField]?.items?.length > 0) { // If its a normal flow
              navigation = await applySaltToMegamenu(navigation);
            } else if (navigation?.secondaryNavCollection?.items?.length > 0) { // If its a folder of flows
              navigation.secondaryNavCollection.items = await Promise.all(
                navigation.secondaryNavCollection.items.map(async (item: any) => await applySaltToMegamenu(item))
              );
            }
            header[navigationField].items[i] = navigation;
          }
        }
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

  const navigation = JSON.parse(JSON.stringify(responseData?.auxNavigation));

  return navigation ?? false;
};
