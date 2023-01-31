import { gql } from '@apollo/client';
import _ from 'lodash';
import algoliasearch, { SearchIndex } from 'algoliasearch';

import contentfulClient from './contentful-client.service';
// import getReferencesContent from './references-content.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { FACET_QUERY_MAP } from '@/constants/search.constants';

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
  filters = {},
  page = 1
}) => {
  const resultObject: {
    items: any[],
    totalItems: number,
    totalPages: number,
    actualPage: number,
    facets: any
  } = {
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
    `(${parentIdsSearchQuery.join(' OR ')})`,
  );

  for (const filterName in filters) {
    const filterDef = Object.keys(FACET_QUERY_MAP).find(fk => filterName === FACET_QUERY_MAP[fk].inputName);

    if (filterDef) {
      algoliaFilter.push(`${filterDef}:${filters[filterName]}`);
    }
  }

  const indexSearch = getAlgoliaSearchIndex(
    process.env.ALGOLIASEARCH_APP_ID,
    process.env.ALGOLIASEARCH_READ_API_KEY
  );
  const resultAlgolia = await indexSearch.search('', {
    filters: algoliaFilter.join(' AND '),
    facets: algoliaFacets,
    hitsPerPage: pageResults,
    attributesToRetrieve: ['fields'],
    page: (--page)
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

const getFacetsValues = async (facets: any): Promise<Array<any>> => {
  const facetsWithValues = [];
  const preview = false;

  for (const facetId in facets) {
    const facetContentNames = Object.keys(facets[facetId]);

    if (FACET_QUERY_MAP[facetId]) {
      const { queryName, query } = FACET_QUERY_MAP[facetId];

      if (query) {
        try {
          const { data: responseData } = await contentfulClient(preview).query({
            query: gql`
            query getEntriesCollection($preview: Boolean!, $limit: Int!) {
              ${queryName}Collection(where: { name_in: ["${facetContentNames.join('", "')}"] }, preview: $preview, limit: $limit) {
                items {
                  ${query}
                }
              }
            }
          `,
            variables: {
              preview,
              limit: facetContentNames.length
            },
            errorPolicy: 'all'
          });

          if (responseData?.[`${queryName}Collection`]?.items) {
            const facetContents = {
              name: FACET_QUERY_MAP[facetId].inputName,
              labelSelect: FACET_QUERY_MAP[facetId].title,
              placeholder: `Seleccionar ${FACET_QUERY_MAP[facetId].title}`,
              listedContents: responseData[`${queryName}Collection`].items.map((facetContent: any) => {
                return {
                  ...facetContent,
                  text: `${facetContent.promoTitle ?? facetContent.name} (${facets[facetId][facetContent.name]})`,
                  value: facetContent.name,
                  totalItems: facets[facetId][facetContent.name]
                };
              })
            };

            facetsWithValues.push(facetContents);
          }
        } catch (e) {
          console.error(`Error on getFacetsValues => `, e.message);
        }
      } else {
        const facetContents = {
          name: FACET_QUERY_MAP[facetId].inputName,
          labelSelect: FACET_QUERY_MAP[facetId].title,
          placeholder: `Seleccionar ${FACET_QUERY_MAP[facetId].title}`,
          listedContents: facetContentNames.map((facetValue: any) => {
            return {
              name: '',
              text: `${facetValue} (${facets[facetId][facetValue]})`,
              value: facetValue,
              image: null,
              totalItems: facets[facetId][facetValue]
            };
          })
        };

        facetsWithValues.push(facetContents);
      }
    }
  };

  return facetsWithValues;
};

const getFilteredContent = async ({
  contentTypesFilter,
  parentIds = [],
  availableFacets = [],
  pageResults = 12,
  filters = {},
  page = 1
}) => {
  if (!contentTypesFilter) {
    console.error(`Error on getFilteredContent: «contentTypesFilter» are required or it's not defined`);
    return null;
  }

  const filteredContentResults = await getAlgoliaResults({
    contentTypesFilter,
    parentIds,
    availableFacets,
    pageResults,
    filters,
    page
  });

  if (!filteredContentResults?.items?.length) {
    return null;
  }

  filteredContentResults.items = filteredContentResults.items.map(item => item.fields);

  if (filteredContentResults?.facets && Object.keys(filteredContentResults?.facets).length > 0) {
    filteredContentResults.facets = await getFacetsValues(filteredContentResults.facets);
  }

  return filteredContentResults;
};

export default getFilteredContent;
