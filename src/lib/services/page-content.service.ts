import { gql } from '@apollo/client';
import _ from 'lodash';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import contentfulClient from './contentful-client.service';
import { getBlocksContent } from './references-content.service';
import { getCommercelayerProduct } from './commerce-layer.service';
import { IProductOverviewDetails } from '../interfaces/product-cf.interface';
import getReferencesRichtextContent from './richtext-references.service';
import { hasItems } from '@/utils/functions';

const getPageContent = async (urlPath, preview = false, fullContent = true) => {
  if (!urlPath || urlPath === '') throw new Error(`«urlPath» is required`);

  let responseData = null, responseError = null;

  const { queryName: typePage, query: queryPage, fragments = "" } = CONTENTFUL_QUERY_MAPS[CONTENTFUL_TYPENAMES.PAGE];
  const { queryName: typeProduct, query: queryProduct } = CONTENTFUL_QUERY_MAPS[CONTENTFUL_TYPENAMES.PRODUCT];

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        ${fragments}
        query getPage($urlPath: String!, $preview: Boolean!) {
          ${typePage}Collection(where: { urlPaths_contains_some: [$urlPath] }, limit: 1, preview: $preview) {
            items {
              ${queryPage}
            }
          }
          ${typeProduct}Collection(where: { urlPaths_contains_some: [$urlPath] }, limit: 1, preview: $preview) {
            items {
              ${queryProduct}
            }
          }
        }
      `,
      variables: { urlPath, preview },
      errorPolicy: 'all'
    }));
  } catch (e) {
    responseError = e, responseData = {};
  }

  if (responseError) console.error('Error on page content service, query => ', responseError.message);

  if (!hasItems(responseData[`${typePage}Collection`]) && !hasItems(responseData[`${typeProduct}Collection`])) return null;

  if (hasItems(responseData[`${typeProduct}Collection`])) { // Get related products (with the same category)
    let dataRelatedProducts = null;
    try {
      ({ data: dataRelatedProducts } = await contentfulClient(preview).query({
        query: gql`
          query getRelatedProducts($urlPath: String!, $categoryName: String!, $preview: Boolean!) {
            ${typeProduct}Collection(where: { 
              AND: [
                { category: { name: $categoryName } },
                { urlPath_not: $urlPath }
              ]
            }, limit: 2, preview: $preview, order: sys_publishedAt_DESC) {
              items {
                ${queryProduct}
              }
            }
          }
        `,
        variables: {
          urlPath,
          categoryName: responseData[`${typeProduct}Collection`]?.items?.[0]?.category?.name ?? '',
          preview
        },
        errorPolicy: 'all'
      }));

      const relatedProducts = await Promise.all(dataRelatedProducts[`${typeProduct}Collection`]?.items.map(async (relatedProduct: IProductOverviewDetails) => {
        return { ...relatedProduct, ...(await getCommercelayerProduct(relatedProduct.sku)) };
      }));
      responseData[`${typeProduct}Collection`].items[0].relatedProducts = relatedProducts;
    } catch (e) {
      console.error("An error has ocurred at related content fetching", e);
    }
  }

  const pageContent = JSON.parse(
    JSON.stringify(
      responseData[`${typeProduct}Collection`]?.items?.[0] ?? responseData[`${typePage}Collection`]?.items?.[0]
    )
  );

  if (pageContent?.parent?.__typename) pageContent.parent.__typename = CONTENTFUL_TYPENAMES.PAGE_MINIMAL;

  if (fullContent) {
    pageContent.blocksCollection = await getBlocksContent({ content: pageContent, preview, getSubBlocks: true });

    if (pageContent.__typename === CONTENTFUL_TYPENAMES.PRODUCT && pageContent?.sku) {
      const commercelayerProduct = await getCommercelayerProduct(pageContent.sku);
      _.merge(pageContent, commercelayerProduct);
    }

    const richtextReferences = await getReferencesRichtextContent({ content: pageContent, preview });
    if (richtextReferences && typeof richtextReferences === 'object' && Object.keys(richtextReferences).length > 0) {
      _.merge(pageContent, richtextReferences);
    }
  }

  return pageContent;
};

export default getPageContent;
