import { gql } from '@apollo/client';
import _ from 'lodash';

import contentfulClient from './contentful-client.service';
import getReferencesContent from './references-content.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';
import getFilteredContent from './content-filter.service';
import { getCommercelayerProduct } from './commerce-layer.service';
import getReferencesRichtextContent from './richtext-references.service';

type DefaultBlockInfo = {
  __typename: string;
  sys: {
    id: string;
  }
};

const CACHE_CONTENT = {};

const getEntryContent = async (blockInfo: DefaultBlockInfo, preview = false, recursive = true, overrideMaxDepth = 6, minimal = false) => {
  if (!blockInfo || !CONTENTFUL_QUERY_MAPS[blockInfo.__typename]) {
    console.error(`Error on getEntryContent: «blockInfo» are required or it's not defined`);
    return null;
  }

  let responseData = null;
  let responseError = null;
  let cacheIndex = blockInfo.sys.id;
  
  if (!blockInfo?.sys?.id) {
    console.error(`Error on entry query, sys.id not defined => `, blockInfo);
    return null;
  }

  if (blockInfo?.__typename === CONTENTFUL_TYPENAMES.PAGE_MINIMAL || minimal) {
    cacheIndex += '_minimal';
  }

  if (CACHE_CONTENT[cacheIndex]) return { ...CACHE_CONTENT[cacheIndex] };

  const { queryName: type, query, fragments = "" } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        ${fragments}
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
    console.error(`Error on entry query 1 (${type}) => `, responseError.message, blockInfo);
  }

  if (!responseData?.[type]) {
    return null;
  }

  const entryContent = JSON.parse(
    JSON.stringify(
      responseData?.[type]
    )
  );

  if (blockInfo.__typename == CONTENTFUL_TYPENAMES.PAGE_MINIMAL) {
    entryContent.__typename = CONTENTFUL_TYPENAMES.PAGE_MINIMAL;
  }

  const richtextReferences = await getReferencesRichtextContent({ content: entryContent, preview });
  if (richtextReferences && typeof richtextReferences === 'object' && Object.keys(richtextReferences).length > 0) {
    _.merge(entryContent, richtextReferences);
  }

  if (recursive) {
    if (entryContent?.parent?.__typename) {
      entryContent.parent.__typename = CONTENTFUL_TYPENAMES.PAGE_MINIMAL;
    }

    const referencesContent = await getReferencesContent({
      content: entryContent,
      maxDepthRecursion: overrideMaxDepth,
      preview,
    });

    _.merge(entryContent, referencesContent);
  }

  if (entryContent.__typename === CONTENTFUL_TYPENAMES.BLOCK_CONTENT_FILTER) {
    const preloadContent = await getFilteredContent({
      contentTypesFilter: entryContent.contentTypesFilter ?? [],
      parentIds: entryContent.parentsCollection?.items?.map((p) => p.sys.id) ?? [],
      availableFacets: entryContent.availableFacets ?? [],
      fullTextSearch: entryContent.fullTextSearch ?? '',
      pageResults: entryContent.pageResults ?? 9,
    });

    _.merge(entryContent, { preloadContent });
  }

  if (entryContent.__typename === CONTENTFUL_TYPENAMES.PRODUCT && entryContent?.sku) {
    const commercelayerProduct = await getCommercelayerProduct(entryContent.sku);
    _.merge(entryContent, commercelayerProduct);
  }

  CACHE_CONTENT[cacheIndex] = { ...entryContent };

  setTimeout(() => {
    CACHE_CONTENT[cacheIndex] = null;
  }, 10 * 60 * 1000); // Cache for 10 minutes for deployment

  return entryContent;
};

export default getEntryContent;
