import { gql } from '@apollo/client';
import _ from 'lodash';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import contentfulClient from './contentful-client.service';
import { getPageBlocks } from './references-content.service';
import { getCommercelayerProduct } from './commerce-layer.service';
import { IProductOverviewDetails } from '../interfaces/product-cf.interface';
import { hasItems } from '@/utils/functions';
import getReferencesRichtextContent from './richtext-references.service';

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

  // Get Related products if its necesary
  if (hasItems(responseData[`${typeProduct}Collection`])) {
    const categoryName = responseData[`${typeProduct}Collection`]?.items?.[0]?.category?.name ?? '';
    responseData[`${typeProduct}Collection`].items[0].relatedProducts = await getRelatedProducts(categoryName, typeProduct, queryProduct, urlPath, preview);
  }

  // Process data to JSON
  const pageContent = JSON.parse(
    JSON.stringify(
      responseData[`${typeProduct}Collection`]?.items?.[0] ?? responseData[`${typePage}Collection`]?.items?.[0]
    )
  );

  const richtextPageContent = await getReferencesRichtextContent({ content: pageContent, preview });
  if (richtextPageContent && typeof richtextPageContent === 'object' && Object.keys(richtextPageContent).length > 0) {
    _.merge(pageContent, richtextPageContent);
  }

  if (fullContent) {
    pageContent.blocksCollection = await getPageBlocks({ content: pageContent, preview });
    if (pageContent.__typename === CONTENTFUL_TYPENAMES.PRODUCT && pageContent?.sku) {
      const commercelayerProduct = await getCommercelayerProduct(pageContent.sku);
      _.merge(pageContent, commercelayerProduct);
    }
  }

  return pageContent;
};

const getRelatedProducts = async (categoryName: string, typeProduct: string, queryProduct: string, urlPath: string, preview: boolean) => {
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
        categoryName,
        preview
      },
      errorPolicy: 'all'
    }));

    const relatedProducts = await Promise.all(dataRelatedProducts[`${typeProduct}Collection`]?.items.map(async (relatedProduct: IProductOverviewDetails) => {
      return { ...relatedProduct, ...(await getCommercelayerProduct(relatedProduct.sku)) };
    }));

    return relatedProducts;
  } catch (e) {
    console.error("An error has ocurred at related content fetching", e);
    return [];
  }
};

export default getPageContent;
