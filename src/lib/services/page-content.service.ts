import { gql } from '@apollo/client';
import _ from 'lodash';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

import contentfulClient from './contentful-client.service';
import getReferencesContent from './references-content.service';

const REFERENCES = ['blocksCollection'];

const getPageContent = async (slug, preview = false) => {
  if (!slug || slug === '') {
    throw new Error(`«slug» is required`);
  }

  let responseData = null;
  let responseError = null;

  const { queryName: type, query } = CONTENTFUL_QUERY_MAPS[CONTENTFUL_TYPENAMES.PAGE];

  try {
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        query getPage($slug: String!, $preview: Boolean!) {
          ${type}Collection(where: { OR: [{ slug: $slug }] }, limit: 1, preview: $preview) {
            items {
              ${query}
            }
          }
        }
      `,
      variables: {
        slug,
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
