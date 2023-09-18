import { gql } from "@apollo/client";
import contentfulClient from "./contentful-client.service";

import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import CONTENTFUL_QUERY_MAPS from "@/constants/contentful-query-maps.constants";
import { RichTextLinksFragments, RichtextLinksQuery } from "../graphql/shared/richtext.gql";
import { sleep } from "@/utils/functions";
import { getBlockInfo } from "./references-content.service";

const RICHTEXT_REFERENCES = {
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: [
    "content",
    "promoDescription"
  ],
  [CONTENTFUL_TYPENAMES.PAGE]: [
    "content",
  ],
  [CONTENTFUL_TYPENAMES.PRODUCT]: [
    "features",
  ],
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: [
    "description",
  ]
};

const getReferencesRichtextContent = async ({ content, preview }) => {

  if (!content?.sys?.id && RICHTEXT_REFERENCES[content.__typename] !== undefined) return null;

  const references = RICHTEXT_REFERENCES[content.__typename];
  if (!Array.isArray(references)) return null;
  
  const referencesContent: any = {};
  const { queryName: type } = CONTENTFUL_QUERY_MAPS[content.__typename];
  
  // Only if the RichText has relations to embeds
  const newReferences = references.filter((ref) => {
    const textoJSON = JSON.stringify(content?.[ref]);
    return (
      content?.[ref] &&
      (
        textoJSON.includes("embedded-entry-block") ||
        textoJSON.includes("embedded-entry-inline") ||
        textoJSON.includes("embedded-asset-block") || 
        textoJSON.includes("asset-hyperlink")
      )
    );
  });
  
  // Join de Ref Maps in One Query to GraphQL (For example with AuxCustomContent which has 2 fields with RichText)
  const contentReferences = newReferences.map((ref) => `
    ${ref}{
      ${RichtextLinksQuery}
    }
  `).join("");

  // Si no hay referencias por consultar retornar
  if(!contentReferences) return null;

  let responseData = null, responseError = null;  
  try {
    await sleep(30);
    ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
      query: gql`
        ${RichTextLinksFragments}
        query getReferencesRichText($id: String!, $preview: Boolean!) {
          ${type}(id: $id, preview: $preview) {
            ${contentReferences}
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
    responseError = e, responseData = {};
  }

  if (responseError) {
    console.error(`Error on richtext query (${type}) => `, responseError.message);
    return null;
  }

  for (const ref of newReferences) {
    const richTextContent = JSON.parse(
      JSON.stringify(
        responseData?.[type]?.[ref]
      )
    );

    if(richTextContent?.links?.entries?.block?.length > 0) {
      let blockIndex = 0; 
      for (const linkEntry of richTextContent.links.entries.block) {
        if(linkEntry.__typename === CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT) {
          richTextContent.links.entries.block[blockIndex] = await getBlockInfo(linkEntry, preview);
        }
        blockIndex++;
      }
    }

    referencesContent[ref] = richTextContent;
  }

  return referencesContent;
};

const CACHE_DATACONTENT = {};

export const getDataContent = async (blockInfo: any, preview = false) => {

  const cacheIndex = blockInfo.sys.id;
  if (CACHE_DATACONTENT[cacheIndex]) return { ...CACHE_DATACONTENT[cacheIndex] };

  let responseData = null, responseError = null;

  const { queryName: type, query, fragments = "" } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];
  
  try {
    await sleep(30);
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
    console.error(`Error on entry query 5 (${type}) => `, responseError.message, blockInfo);
  }

  if (!responseData?.[type]) {
    return null;
  }

  const entryContent = JSON.parse(
    JSON.stringify(
      responseData?.[type]
    )
  );

  CACHE_DATACONTENT[cacheIndex] = { ...entryContent };

  setTimeout(() => {
    CACHE_DATACONTENT[cacheIndex] = null;
  }, 10 * 60 * 1000); // Cache for 10 minutes for deployment

  return entryContent;
  
};

export default getReferencesRichtextContent;
