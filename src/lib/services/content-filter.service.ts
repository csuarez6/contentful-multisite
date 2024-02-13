import { gql } from "@apollo/client";
import _ from "lodash";
import algoliasearch, { SearchIndex } from "algoliasearch";
import contentfulClient, { removeUnresolved } from "./contentful-client.service";
import CONTENTFUL_QUERY_MAPS from "@/constants/contentful-query-maps.constants";
import { FACET_QUERY_MAP } from "@/constants/search.constants";
import { sleep } from "@/utils/functions";

export const getAlgoliaSearchIndex = (appId, appKey, indexName): SearchIndex => {
  const searchClient = algoliasearch(appId, appKey);
  return searchClient.initIndex(indexName);
};

const applyFilterModifier = (filterKey, filterValue, modifier) => {
  let filterValueModified = `${filterKey}:${filterValue}`;

  if (modifier === "stringify") {
    filterValueModified = `${filterKey}:"${filterValue}"`;
  }

  if (modifier === "range") {
    const [min, max] = filterValue.split("-");
    filterValueModified = max
      ? min
        ? `${filterKey}:${min} TO ${max}`
        : `${filterKey} <= ${max}`
      : min
        ? `${filterKey} >= ${min}`
        : "";
  }

  return filterValueModified;
};

const getAlgoliaResults = async ({
  fullTextSearch = '',
  contentTypesFilter,
  parentIds = [],
  availableFacets = [],
  mainFacet = '',
  pageResults,
  filters = {},
  sortingBy = null,
  page = 1,
}) => {
  const resultObject: {
    items: any[];
    totalItems: number;
    totalPages: number;
    actualPage: number;
    facets: any;
    pageResults: number;
  } = {
    items: [],
    totalItems: 0,
    totalPages: 0,
    actualPage: 0,
    facets: {},
    pageResults: 9,
  };

  const types = [];
  const algoliaFilter = [];
  const mainFacetacetConverted = {};
  const algoliaFacets = Object.keys(FACET_QUERY_MAP).filter(
    (fk) => availableFacets.indexOf(FACET_QUERY_MAP[fk].title) >= 0
  );

  for (const contentTypeFilter of contentTypesFilter) {
    const { queryName: type, algoliaType } = CONTENTFUL_QUERY_MAPS[
      _.upperFirst(contentTypeFilter)
    ] ?? { queryName: null };
    if (type || algoliaType) types.push(algoliaType ?? type);
  }

  const contentTypeFilterSearchQuery = types.map(
    (ct) => {
      const ctfinal = _.upperFirst(ct).replaceAll("_", "");
      return `fields.__typename:${ctfinal}`;
    }
  );

  algoliaFilter.push(
    `(${contentTypeFilterSearchQuery.join(" OR ")})`
  );

  if (parentIds?.length) {
    const parentIdsSearchQuery = parentIds?.map(
      (pid) => `fields.parent.sys.id:${pid}`
    );
    algoliaFilter.push(
      `(${parentIdsSearchQuery.join(" OR ")})`
    );
  }

  algoliaFilter.push(`NOT metadata.tags.sys.id:testPage`);

  const indexSearch = getAlgoliaSearchIndex(
    process.env.ALGOLIASEARCH_APP_ID,
    process.env.ALGOLIASEARCH_READ_API_KEY,
    process.env.ALGOLIASEARCH_INDEX + (sortingBy !== null ? '_' + sortingBy : '')
  );
  
  const mainFacetDef = Object.keys(FACET_QUERY_MAP).find(
    (fk) => mainFacet === FACET_QUERY_MAP[fk].title
  );

  if(mainFacet && mainFacetDef){
    const resultFacetsAlgolia = await indexSearch.searchForFacetValues(mainFacetDef, '', {
      filters: algoliaFilter.join(' AND '),
    });
  
    mainFacetacetConverted[mainFacetDef] = {};
    resultFacetsAlgolia.facetHits.forEach(facet => {
      mainFacetacetConverted[mainFacetDef][facet.value] = facet.count;
    });
  }

  for (const filterName in filters) {
    const filterDef = Object.keys(FACET_QUERY_MAP).find(
      (fk) => filterName === FACET_QUERY_MAP[fk].inputName
    );

    if (filterDef) {
      let filterValue = `${filterDef}:${filters[filterName]}`;
      const modifier = FACET_QUERY_MAP[filterDef].modifier;

      if (modifier) {
        filterValue = applyFilterModifier(
          filterDef,
          filters[filterName],
          modifier
        );
      }

      algoliaFilter.push(filterValue);
    }
  }

  const resultAlgolia = await indexSearch.search((fullTextSearch), {
    filters: algoliaFilter.join(' AND '),
    facets: algoliaFacets,
    hitsPerPage: pageResults,
    attributesToRetrieve: ["fields", "metadata"],
    page: --page,
  });
  
  ({
    hits: resultObject.items,
    nbHits: resultObject.totalItems,
    nbPages: resultObject.totalPages,
    page: resultObject.actualPage,
    facets: resultObject.facets,
  } = resultAlgolia);

  resultObject.facets = { ...resultObject.facets, ...mainFacetacetConverted };
  
  resultObject.pageResults = pageResults;

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
          await sleep(30);
          let responseData = null, errorsData = null;
          ({ data: responseData, errors: errorsData } = await contentfulClient(preview).query({
            query: gql`
            query getEntriesCollection($preview: Boolean!, $limit: Int!) {
              ${queryName}Collection(where: { name_in: ["${facetContentNames.join(
              '", "'
            )}"] }, preview: $preview, limit: $limit) {
                items {
                  ${query}
                }
              }
            }
          `,
            variables: {
              preview,
              limit: facetContentNames.length,
            },
            errorPolicy: "all",
          }));

          responseData = removeUnresolved(responseData, errorsData);

          if (responseData?.[`${queryName}Collection`]?.items) {
            const facetContents = {
              name: FACET_QUERY_MAP[facetId].inputName,
              labelSelect: FACET_QUERY_MAP[facetId].title,
              listedContents:
                FACET_QUERY_MAP[facetId].rawOptions ??
                responseData[`${queryName}Collection`].items.map(
                  (facetContent: any) => {
                    return {
                      ...facetContent,
                      text: facetContent.promoTitle ?? facetContent.name[0].toUpperCase() + facetContent.name.slice(1).toLowerCase(),
                      value: facetContent.name,
                      totalItems: facets[facetId][facetContent.name],
                    };
                  }
                ),
            };

            facetContents.listedContents.unshift({
              sys: {
                id: `${facetContents.name}_all-items`,
              },
              name: `Todo`,
              text: `Todo`,
              value: "*",
              totalItems: 0,
              image: {
                url: `/images/show-all-${facetContents.name}.webp`,
              },
            });
            facetsWithValues.push(facetContents);
          }
        } catch (e) {
          console.error(`Error on getFacetsValues => `, e.message);
          return [];
        }
      } else {
        const facetContents = {
          name: FACET_QUERY_MAP[facetId].inputName,
          labelSelect: FACET_QUERY_MAP[facetId].title,
          listedContents:
            FACET_QUERY_MAP[facetId].rawOptions ??
            facetContentNames.map((facetValue: any) => {
              return {
                name: "",
                text: facetValue[0].toUpperCase() + facetValue.slice(1).toLowerCase(),
                value: facetValue,
                image: null,
                totalItems: facets[facetId][facetValue],
              };
            }),
        };
        let countFirstFacets = 0;
        for(let i = 0; i < facetContents?.listedContents.length; i++){
          if(facetContents.listedContents?.[i]?.text === 'Todo'){
            countFirstFacets++;
          }
        }
        if(countFirstFacets === 0){
          facetContents.listedContents.unshift({
            name: "",
            text: `Todo`,
            image: null,
            value: "*",
            totalItems: 0,
          });
        }
        facetsWithValues.push(facetContents);
      }
    }
  }

  return facetsWithValues;
};

const getFilteredContent = async ({
  fullTextSearch = '',
  contentTypesFilter,
  parentIds = [],
  pageResults,
  availableFacets = [],
  mainFacet = '',
  filters = {},
  sortingBy = null,
  page = 1,
}) => {
  if (!contentTypesFilter) {
    console.error(
      `Error on getFilteredContent: «contentTypesFilter» are required or it's not defined`
    );
    return null;
  }

  const filteredContentResults = await getAlgoliaResults({
    fullTextSearch,
    contentTypesFilter,
    parentIds,
    availableFacets,
    mainFacet,
    pageResults,
    filters,
    sortingBy,
    page,
  });

  if (!filteredContentResults?.items?.length) {
    return null;
  }

  filteredContentResults.items = filteredContentResults.items.map(
    (item) => {
      return {
        ...item.fields,
        objectID: item.objectID
      };
    }
  );
  
  if (
    filteredContentResults?.facets &&
    Object.keys(filteredContentResults?.facets).length > 0
  ) {
    filteredContentResults.facets = await getFacetsValues(
      filteredContentResults.facets
    );
  } else {
    filteredContentResults.facets = [];
  }

  return filteredContentResults;
};

export default getFilteredContent;
