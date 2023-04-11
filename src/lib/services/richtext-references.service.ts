import { gql } from "@apollo/client";
import contentfulClient from "./contentful-client.service";
// import getEntryContent from "./entry-content.service";

import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import CONTENTFUL_QUERY_MAPS from "@/constants/contentful-query-maps.constants";
import { RichtextLinksQuery } from "../graphql/shared/richtext.qql";

const RICHTEXT_REFERENCES = {
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: [
    "content"
  ],
  [CONTENTFUL_TYPENAMES.PAGE]: [
    "content",
  ]
};

const getReferencesRichtextContent = async ({ content, preview }) => {
  const referencesContent: any = {};
  if (!content?.sys?.id && RICHTEXT_REFERENCES[content.__typename] !== undefined) {
    return null;
  }

  const { queryName: type } = CONTENTFUL_QUERY_MAPS[content.__typename];
  const references = RICHTEXT_REFERENCES[content.__typename];
  if (!Array.isArray(references)) {
    return null;
  }
  for (const ref of references) {
    let responseData = null;
    let responseError = null;
    try {
      ({ data: responseData, error: responseError } = await contentfulClient(
        preview
      ).query({
        query: gql`
          query getRichText($id: String!, $preview: Boolean!) {
            ${type}(id: $id, preview: $preview) {
              ${ref}{
                ${RichtextLinksQuery}
              }
            }
          }
        `,
        variables: {
          id: content.sys.id,
          preview,
        },
        errorPolicy: "all",
      }));
    } catch (e) {
      responseError = e;
      responseData = {};
    }

    if (responseError) {
      console.error(`Error on richtext query (${type}) => `, responseError.message);
    }

    if (!responseData?.[type]?.[ref]?.links) {
      continue;
    }

    referencesContent[ref] = responseData[type][ref];
  }

  return referencesContent;
};

export default getReferencesRichtextContent;
