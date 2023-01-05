import { gql } from '@apollo/client';
import _ from 'lodash';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import contentfulClient from './contentful-client.service';
import getReferencesContent from './references-content.service';

const REFERENCES = ['blocksCollection'];

const getPageContent = async (urlPath, preview = false) => {
  if (!urlPath || urlPath === '') {
    throw new Error(`«urlPath» is required`);
  }

  let responseData = null;
  let responseError = null;

  const { queryName: type, query } = CONTENTFUL_QUERY_MAPS[CONTENTFUL_TYPENAMES.PAGE];

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getPage($urlPath: String!, $preview: Boolean!) {
          ${type}Collection(where: { OR: [{ urlPath: $urlPath }] }, limit: 1, preview: $preview) {
            items {
              ${query}
            }
          }
        }
      `,
      variables: {
        urlPath,
        preview
      },
      errorPolicy: 'all'
    }));
  } catch (e) {
    responseError = e;
    responseData = {};
  }

  if (responseError) {
    console.error('Error on page content service, query => ', responseError.message);
  }

  if (!responseData[`${type}Collection`]?.items?.[0]) {
    return null;
  }

  const pageContent = JSON.parse(
    JSON.stringify(
      responseData[`${type}Collection`]?.items?.[0]
    )
  );

  if (REFERENCES.length > 0) {
    const referencesContent = await getReferencesContent(pageContent, REFERENCES, preview);
    _.merge(pageContent, referencesContent);
  }

  return pageContent;
};

export default getPageContent;
