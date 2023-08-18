import _ from "lodash";
import getEntryContent from "./entry-content.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import CONTENTFUL_QUERY_MAPS from "@/constants/contentful-query-maps.constants";
import contentfulClient from "./contentful-client.service";
import { gql } from "@apollo/client";
import getReferencesRichtextContent from "./richtext-references.service";
import { getCommercelayerProduct } from "./commerce-layer.service";
import getFilteredContent from "./content-filter.service";

const REFERENCES = {
  [CONTENTFUL_TYPENAMES.PAGE]: [
    'blocksCollection',
    'mainNavCollection',
    'relatedContentCollection',
    'parent'
  ],
  [CONTENTFUL_TYPENAMES.PAGE_MINIMAL]: [
    'parent'
  ],
  [CONTENTFUL_TYPENAMES.PRODUCT]: [
    'parent'
  ],
  [CONTENTFUL_TYPENAMES.AUX_NAVIGATION]: [
    'mainNavCollection',
    'secondaryNavCollection',
    'utilityNavCollection'
  ],
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: [
    'ctaCollection',
    'featuredContentsCollection',
    'listedContentsCollection',
  ],
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: [
    'mainNavCollection',
  ],
};

const getReferencesContent = async ({ content, preview = false, actualDepth = 1, referenceOverride = null, maxDepthRecursion = 6 }) => {
  let referencesContent: any = {};
  if (actualDepth > maxDepthRecursion) {
    return content;
  }

  if (!Array.isArray(content) && !content?.sys?.id) {
    return null;
  }

  if (Array.isArray(content)) {
    referencesContent = [];
    for (const contentItem of content) {
      const itemReferenceContent = await getReferencesContent({ content: contentItem, preview, actualDepth, referenceOverride, maxDepthRecursion });
      referencesContent.push(itemReferenceContent);
    }
  } else {
    referencesContent = Object.keys(content).length <= 2 ? await getEntryContent(content, preview, false) : content;
    const references = referenceOverride ? referenceOverride[content.__typename] : REFERENCES[content.__typename];

    if (!Array.isArray(references)) {
      return referencesContent;
    }

    for (const ref of references) {
      if (referencesContent?.[ref]?.items?.length) {
        referencesContent[ref] = {
          items: await getReferencesContent({ content: referencesContent[ref].items, preview, actualDepth: (actualDepth + 1), referenceOverride, maxDepthRecursion })
        };
      } else if (referencesContent[ref]?.sys?.id) {
        if (ref === 'parent') {
          referencesContent[ref].__typename = CONTENTFUL_TYPENAMES.PAGE_MINIMAL;
        }
        const subRefrencesContent = await getReferencesContent({ content: referencesContent[ref], preview, actualDepth: (actualDepth + 1), referenceOverride, maxDepthRecursion });

        if (subRefrencesContent) {
          _.merge(referencesContent[ref], subRefrencesContent);
        }
      }
    }
  }

  return referencesContent;
};

export const getBlocksContent = async ({ content, preview = false, getSubBlocks = false }) => {
  if(!(content?.sys?.id) || !(content?.blocksCollection?.items?.[0])) return content;
  
  const newBlocksCollection: any = { items: [] }; 

  for (const blockInfo of content.blocksCollection.items) {
    const { queryName: type, query } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];
    let responseData = null, responseError = null;
    try {
      ({ data: responseData, error: responseError } = await contentfulClient(preview).query({
        query: gql`
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
      responseError = e, responseData = {};
    }

    if (responseError) console.error(`Error on entry query (${type}) => `, responseError.message, blockInfo);
    
    const blockEntryContent = JSON.parse(
      JSON.stringify(
        responseData?.[type]
      )
    );

    const richtextReferences = await getReferencesRichtextContent({ content: blockEntryContent, preview });
    if (richtextReferences && typeof richtextReferences === 'object' && Object.keys(richtextReferences).length > 0) {
      _.merge(blockEntryContent, richtextReferences);
    }

    if (getSubBlocks) {
      // const subBlocks = await getBlocksContent({
      //   content: blockInfo,
      //   preview,
      // });
  
      // _.merge(blockEntryContent, subBlocks);
    }

    if (blockEntryContent.__typename === CONTENTFUL_TYPENAMES.BLOCK_CONTENT_FILTER) {
      const preloadContent = await getFilteredContent({
        contentTypesFilter: blockEntryContent.contentTypesFilter ?? [],
        parentIds: blockEntryContent.parentsCollection?.items?.map((p) => p.sys.id) ?? [],
        availableFacets: blockEntryContent.availableFacets ?? [],
        fullTextSearch: blockEntryContent.fullTextSearch ?? '',
        pageResults: blockEntryContent.pageResults ?? 9,
      });
      _.merge(blockEntryContent, { preloadContent });
    }

    if (blockEntryContent.__typename === CONTENTFUL_TYPENAMES.PRODUCT && blockEntryContent?.sku) {
      const commercelayerProduct = await getCommercelayerProduct(blockEntryContent.sku);
      _.merge(blockEntryContent, commercelayerProduct);
    }

    newBlocksCollection.items.push(blockEntryContent);
  };

  return newBlocksCollection;
};

export default getReferencesContent;
