import { gql } from '@apollo/client';
import _ from 'lodash';
import algoliasearch, { SearchIndex } from 'algoliasearch';

import contentfulClient from './contentful-client.service';
// import getReferencesContent from './references-content.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { FACET_QUERY_MAP } from '@/constants/search.constants';
import PageQuery from '../graphql/page.gql';
import ProductQuery from '../graphql/product.gql';
import ProductCategoryQuery from '../graphql/shared/product-category.gql';
import TrademarkQuery from '../graphql/shared/trademark.gql';

export const getAlgoliaSearchIndex = (appId, appKey): SearchIndex => {
  const searchClient = algoliasearch(appId, appKey);
  const searchIndex = searchClient.initIndex('Production');

  return searchIndex;
};

const getAlgoliaResults = async ({
  contentTypesFilter,
  parentIds = [],
  availableFacets = [],
  pageResults = 12,
  page = 1
}) => {
  const resultObject = {
    items: [],
    totalItems: 0,
    totalPages: 0,
    actualPage: 0,
    facets: {}
  };

  const types = [];
  const algoliaFilter = [];
  const algoliaFacets = Object.keys(FACET_QUERY_MAP).filter(
    fk => availableFacets.indexOf(FACET_QUERY_MAP[fk].title) >= 0
  );

  for (const contentTypeFilter of contentTypesFilter) {
    const { queryName: type } = CONTENTFUL_QUERY_MAPS[_.capitalize(contentTypeFilter)];
    types.push(type);
  }

  const contentTypeFilterSearchQuery = types.map(ct => `sys.contentType.sys.id:${ct}`);
  const parentIdsSearchQuery = parentIds.map(pid => `fields.parent.sys.id:${pid}`);
  algoliaFilter.push(
    `(${contentTypeFilterSearchQuery.join(' OR ')})`,
    `(${parentIdsSearchQuery.join(' OR ')})`
  );

  const indexSearch = getAlgoliaSearchIndex(
    process.env.ALGOLIASEARCH_APP_ID,
    process.env.ALGOLIASEARCH_READ_API_KEY
  );
  const resultAlgolia = await indexSearch.search('', {
    filters: algoliaFilter.join(' AND '),
    facets: algoliaFacets,
    hitsPerPage: pageResults,
    attributesToRetrieve: ['fields.name'],
    page
  });

  ({
    hits: resultObject.items,
    nbHits: resultObject.totalItems,
    nbPages: resultObject.totalPages,
    page: resultObject.actualPage,
    facets: resultObject.facets
  } = resultAlgolia);

  return resultObject;
};

const getFacetsValues = async (facets: any) => {
  const facetsWithValues = [];
  const preview = false;

  for (const facetId in facets) {
    const facetContentIds = Object.keys(facets[facetId]);

    try {
      const { data: responseData } = await contentfulClient(preview).query({
        query: gql`
          query getEntriesCollection($preview: Boolean!, $limit: Int!) {
            entryCollection(where: { sys: { id_in: ["${facetContentIds.join('", "')}"] } }, preview: $preview, limit: $limit) {
              items {
                ...on ProductCategory {
                  ${ProductCategoryQuery}
                }
                ...on Trademark {
                  ${TrademarkQuery}
                }
              }
            }
          }
        `,
        variables: {
          preview,
          limit: facetContentIds.length
        },
        errorPolicy: 'all'
      });

      if (responseData?.entryCollection?.items) {
        const facetContents = {
          name: FACET_QUERY_MAP[facetId].inputName,
          labelSelect: FACET_QUERY_MAP[facetId].title,
          placeholder: `Seleccionar ${FACET_QUERY_MAP[facetId].title}`,
          listedContents: responseData.entryCollection.items.map((facetContent: any) => {
            return {
              ...facetContent,
              text: `${facetContent.promoTitle ?? facetContent.name} (${facets[facetId][facetContent.sys.id]})`,
              value: facetContent.sys.id,
              totalItems: facets[facetId][facetContent.sys.id]
            };
          })
        };

        facetsWithValues.push(facetContents);
      }
    } catch (e) {
      console.error(`Error on getFacetsValues => `, e.message);
    }
  };

  return facetsWithValues;
};

const getFilteredContent = async ({
  contentTypesFilter,
  parentIds = [],
  availableFacets = [],
  pageResults = 12,
  page = 1
}) => {
  if (!contentTypesFilter) {
    console.error(`Error on getFilteredContent: «contentTypesFilter» are required or it's not defined`);
    return null;
  }

  const preview = false;
  let responseData = null;
  let responseError = null;

  const filteredContentResults = await getAlgoliaResults({
    contentTypesFilter,
    parentIds,
    availableFacets,
    pageResults,
    page
  });

  if (!filteredContentResults?.items?.length) {
    return responseData;
  }

  const contentfulIds = filteredContentResults.items.map(i => i.objectID);

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntriesCollection($preview: Boolean!, $limit: Int!) {
          entryCollection(where: { sys: { id_in: ["${contentfulIds.join('", "')}"] } }, preview: $preview, limit: $limit) {
            items {
              ...on Page {
                ${PageQuery}
              }
              ...on Product {
                ${ProductQuery}
              }
            }
          }
        }
      `,
      variables: {
        preview,
        limit: pageResults
      },
      errorPolicy: 'all'
    }));
  } catch (e) {
    responseError = e;
    responseData = {};
  }

  if (responseError) {
    console.error(`Error on getFilteredContent => `, responseError.message);
  }

  if (responseData?.entryCollection?.items) {
    filteredContentResults.items = responseData.entryCollection.items;
  }

  if (filteredContentResults?.facets && Object.keys(filteredContentResults?.facets).length > 0) {
    filteredContentResults.facets = await getFacetsValues(filteredContentResults.facets);
  }

  return filteredContentResults;
};

export default getFilteredContent;
