import { gql } from "@apollo/client";
import _ from 'lodash';
import contentfulClient from "./contentful-client.service";
import getEntryContent from "./entry-content.service";

import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import CONTENTFUL_QUERY_MAPS from "@/constants/contentful-query-maps.constants";
import { RichtextLinksQuery } from "../graphql/shared/richtext.gql";
import { sleep } from "@/utils/functions";

const RICHTEXT_REFERENCES = {
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: [
    "content",
    "promoDescription"
  ],
  [CONTENTFUL_TYPENAMES.PAGE]: [
    "content",
  ],
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: [
    "description",
  ]
};

const TO_MINIMAL = {
  [CONTENTFUL_TYPENAMES.PAGE]: CONTENTFUL_TYPENAMES.PAGE_MINIMAL,
  [CONTENTFUL_TYPENAMES.PRODUCT]: CONTENTFUL_TYPENAMES.PRODUCT_MINIMAL,
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT_MINIMAL,
};

const getReferencesRichtextContent = async ({ content, preview }) => {
  const referencesContent: any = {};
  if (!content?.sys?.id && RICHTEXT_REFERENCES[content.__typename] !== undefined) return null;
  const { queryName: type } = CONTENTFUL_QUERY_MAPS[content.__typename];
  const references = RICHTEXT_REFERENCES[content.__typename];
  if (!Array.isArray(references)) return null;
  for (const ref of references) {
    let responseData = null;
    let responseError = null;
    try {
      await sleep(300);
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

    const richTextContent = JSON.parse(
      JSON.stringify(
        responseData?.[type]?.[ref]
      )
    );

    if (!richTextContent?.links) {
      continue;
    }

    if (richTextContent?.links?.entries?.inline?.length > 0) {
      let inlineIndex = 0;
      for (const inline of richTextContent.links.entries.inline) {
        if (TO_MINIMAL[inline.__typename]) {
          inline.__typename = TO_MINIMAL[inline.__typename];
        }

        const inlineContent = await getEntryContent(inline, preview, false, 1, true);
        _.merge(richTextContent.links.entries.inline[inlineIndex], inlineContent);

        inlineIndex++;
      }
    }
    if(richTextContent?.links?.entries?.block?.length > 0){
      for (const block of richTextContent.links.entries.block) {
        if(block?.featuredContentsCollection?.items.length > 0){
          let featuredContentsCollectionIndex = 0;
          for (const featuredContentsCollection of block.featuredContentsCollection.items) {
            const content = await getDataContent(featuredContentsCollection);
            _.merge(block.featuredContentsCollection.items[featuredContentsCollectionIndex], content);
            featuredContentsCollectionIndex++;
          }
        }
        if(block?.listedContentsCollection?.items.length > 0){
          let listedContentsCollectionIndex = 0;
          for (const listedContentsCollection of block.listedContentsCollection.items) {
            const content = await getDataContent(listedContentsCollection);
            _.merge(block.listedContentsCollection.items[listedContentsCollectionIndex], content);
            listedContentsCollectionIndex++;
          }
        }
        if(block?.ctaCollection?.items.length  > 0){
          let ctaCollectionIndex = 0;
          for (const ctaCollection of block.ctaCollection.items) {
            const content = await getDataContent(ctaCollection);
            _.merge(block.ctaCollection.items[ctaCollectionIndex], content);
            ctaCollectionIndex++;
          }
        }

      }
    }
    
    referencesContent[ref] = richTextContent;
  }

  return referencesContent;
};

export const getDataContent = async (blockInfo: any, preview = false) => {

  let responseData = null;
  let responseError = null;

  const { queryName: type, query, fragments = "" } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];

  try {
    await sleep(300);
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

  return entryContent;
  
};

export default getReferencesRichtextContent;
