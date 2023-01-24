import { gql } from '@apollo/client';
import _ from 'lodash';

import contentfulClient from './contentful-client.service';
// import getReferencesContent from './references-content.service';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';


const getFilteredContent = async ({ contentTypesFilter, parentIds }) => {
  if (!contentTypesFilter) {
    console.error(`Error on getFilteredContent: «contentTypesFilter» are required or it's not defined`);
    return null;
  }

  const preview = false;
  let responseData = null;
  let responseError = null;

  let filterQuery = '';
  const types = [];

  for (const contentTypeFilter of contentTypesFilter) {
    const { queryName: type, query } = CONTENTFUL_QUERY_MAPS[_.capitalize(contentTypeFilter)];
    types.push(type);

    filterQuery += `
      ${type}Collection(where: { parent: { sys: { id_in: ["${parentIds.join('", "')}"] } } }, preview: $preview, limit: 12) {
        items {
          ${query}
        }
        total
      }
    `;
  }

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getEntry($preview: Boolean!) {
          ${filterQuery}
        }
      `,
      variables: {
        preview
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

  const filteredContent = { items: [], total: 0 };
  for (const t of types) {
    if (responseData?.[`${t}Collection`]?.items) {
      filteredContent.total += parseInt(responseData[`${t}Collection`].total);
      _.merge(filteredContent.items, responseData[`${t}Collection`].items);
    }
  }

  return filteredContent;
};

export default getFilteredContent;
