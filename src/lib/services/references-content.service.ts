import _ from "lodash";
import getEntryContent from "./entry-content.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import CONTENTFUL_QUERY_MAPS from "@/constants/contentful-query-maps.constants";
import contentfulClient from "./contentful-client.service";
import { gql } from "@apollo/client";
import { getCommercelayerProduct } from "./commerce-layer.service";
import getFilteredContent from "./content-filter.service";
import getReferencesRichtextContent from "./richtext-references.service";

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
  if (actualDepth > maxDepthRecursion) return content;

  if (!Array.isArray(content) && !content?.sys?.id) return null;

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

const getBlockEntry = async (blockInfo: any, preview: boolean) => {
  const { queryName: type, query, fragments = "" } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];
  let responseData = null;
  try {
    ({ data: responseData } = await contentfulClient(preview).query({
      query: gql`
        ${fragments}
        query getBlock($id: String!, $preview: Boolean!) {
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
    return { responseError: e, responseData };
  }    
  
  const blockEntryContent = JSON.parse(
    JSON.stringify(
      responseData?.[type]
    )
  );

  const richtextReferences = await getReferencesRichtextContent({ content: blockEntryContent, preview });
  if (richtextReferences && typeof richtextReferences === 'object' && Object.keys(richtextReferences).length > 0) {
    _.merge(blockEntryContent, richtextReferences);
  }

  return { responseData: blockEntryContent, type };
};

export const getBlocksContent = async ({ content, preview = false }) => {
  const newBlocksCollection: any = { items: [] }; 

  if(!(content?.sys?.id) || !(content?.blocksCollection?.items?.length > 0)) return newBlocksCollection;

  for (const blockInfo of content.blocksCollection.items) {
    const { responseData: blockEntryContent, responseError: responseError = "", type: type = "" } = await getBlockEntry(blockInfo, preview);

    if (responseError) console.error(`Error on entry query 3 (${type}) => `, responseError.message, blockInfo);

    if (blockEntryContent.__typename === CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT) {
      // Obtener los campos con referencias del bloque contenidos promo
      for (const ref of REFERENCES[blockEntryContent.__typename]) {
        if (blockEntryContent?.[ref]?.items?.length) {
          for (let i = 0; i < blockEntryContent[ref].items.length; i++) {
            const refItem = blockEntryContent[ref].items[i];

            // Para obtener los bloques dentro de los bloques
            if(ref === "featuredContentsCollection" && refItem.__typename == CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT){
              const { responseData: subBlockEntryContent, responseError: subResponseError = "" } = await getBlockEntry(refItem, preview);
              if (subResponseError) console.error(`Error on entry query 4 (${type}) => `, subResponseError.message, refItem);
              else {                
                // Si es una vista TABS, obtener un nivel más de referencias. (Esto quiere decir, obtener los bloques y richtext dentro de los bloques de los bloques)
                if (blockEntryContent?.view?.__typename === CONTENTFUL_TYPENAMES.VIEW_SERVICES_TABS) {
                  for (const subRef of REFERENCES[subBlockEntryContent.__typename]) {
                    if (subBlockEntryContent?.[subRef]?.items?.length) {
                      for (let j = 0; j < subBlockEntryContent[subRef].items.length; j++) {
                        const subRefItem = subBlockEntryContent[subRef].items[j];

                        // Agregar un bloque promo a un subbloque promo
                        if(subRef === "featuredContentsCollection" && subRefItem.__typename == CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT){
                          const { responseData: subsubBlockEntryContent, responseError: subsubResponseError = "" } = await getBlockEntry(subRefItem, preview);
                          if(subsubResponseError) console.error(`Error on sub entry query => `, subsubResponseError.message, subRef);
                          else subBlockEntryContent[subRef].items[j] = subsubBlockEntryContent;
                        }

                        const richtextSubSubBlockItemReferences = await getReferencesRichtextContent({ content: subRefItem, preview });
                        if (richtextSubSubBlockItemReferences && typeof richtextSubSubBlockItemReferences === 'object' && Object.keys(richtextSubSubBlockItemReferences).length > 0) {
                          _.merge(subBlockEntryContent[subRef].items[j], richtextSubSubBlockItemReferences);
                        }
                      }
                    }
                  }
                }
                blockEntryContent[ref].items[i] = subBlockEntryContent;
              }
            }

            const richtextItemReferences = await getReferencesRichtextContent({ content: refItem, preview });
            if (richtextItemReferences && typeof richtextItemReferences === 'object' && Object.keys(richtextItemReferences).length > 0) {
              _.merge(refItem, richtextItemReferences);
            }

            if(refItem.__typename === CONTENTFUL_TYPENAMES.PRODUCT && refItem?.sku){
              const commercelayerProduct = await getCommercelayerProduct(refItem.sku);
              _.merge(refItem, commercelayerProduct);
            }
          }
        }
      }
    } else if (blockEntryContent.__typename === CONTENTFUL_TYPENAMES.BLOCK_CONTENT_FILTER) {
      const preloadContent = await getFilteredContent({
        contentTypesFilter: blockEntryContent.contentTypesFilter ?? [],
        parentIds: blockEntryContent.parentsCollection?.items?.map((p) => p.sys.id) ?? [],
        availableFacets: blockEntryContent.availableFacets ?? [],
        fullTextSearch: blockEntryContent.fullTextSearch ?? '',
        pageResults: blockEntryContent.pageResults ?? 9,
      });
      _.merge(blockEntryContent, { preloadContent });
    }

    newBlocksCollection.items.push(blockEntryContent);
  };

  return newBlocksCollection;
};

export default getReferencesContent;
