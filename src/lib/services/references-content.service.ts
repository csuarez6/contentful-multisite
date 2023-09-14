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

  return { responseData: blockEntryContent, type };
};

export const getPageBlocks = async ({ content, preview = false }) => {
  const newBlocksCollection: any = { items: [] }; 

  if(!(content?.sys?.id) || !(content?.blocksCollection?.items?.length > 0)) return newBlocksCollection;

  for (const blockInfo of content.blocksCollection.items) {    
    const blockEntryContent = await getBlockInfo(blockInfo, preview);
    newBlocksCollection.items.push(blockEntryContent);
  };

  return newBlocksCollection;
};

export const viewIsSupported = ({actualView, ref}) => {
  return (
    ([
      CONTENTFUL_TYPENAMES.VIEW_LIST_WITH_ICONS,
      CONTENTFUL_TYPENAMES.VIEW_INFORMATION_GRID,
      CONTENTFUL_TYPENAMES.VIEW_INFORMATION_CARDS,
      CONTENTFUL_TYPENAMES.VIEW_LINE_OF_STEPS,
      CONTENTFUL_TYPENAMES.VIEW_ACCORDION,
      CONTENTFUL_TYPENAMES.VIEW_TABS_WITH_FEATURED_IMAGE,
      CONTENTFUL_TYPENAMES.VIEW_FEATURED_TABS,
      CONTENTFUL_TYPENAMES.VIEW_FEATURED,
      CONTENTFUL_TYPENAMES.VIEW_PRODUCT_GRID,
      CONTENTFUL_TYPENAMES.VIEW_SERVICES_CARD,
      CONTENTFUL_TYPENAMES.VIEW_SERVICES_TABS
    ].includes(actualView) && ref === "featuredContentsCollection") ||
    ([
      CONTENTFUL_TYPENAMES.VIEW_LIST_WITH_ICONS,
      CONTENTFUL_TYPENAMES.VIEW_PRODUCT_GRID
    ].includes(actualView) && ref === "ctaCollection")
  );
};

export const getBlockInfo = async (blockInfo: any, preview: boolean, levelBlock = 1) => {
  const { responseData: blockEntryContent, responseError: responseError = "", type: type = "" } = await getBlockEntry(blockInfo, preview);

    if (responseError) {
      console.error(`Error on entry query 3 (${type}) => `, responseError.message, blockInfo);
      return blockInfo;
    }

    if (blockEntryContent.__typename === CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT) {
      
      // Recorrer todas las relaciones del bloque ContenidosPromo
      for (const ref of REFERENCES[blockEntryContent.__typename]) {
        if (blockEntryContent?.[ref]?.items?.length) {
          for (let i = 0; i < blockEntryContent[ref].items.length; i++) {
            const refItem = blockEntryContent[ref].items[i];

            // Si hay un bloque dentro de otro bloque
            if(refItem?.__typename === CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT){
              if(ref === "featuredContentsCollection" && levelBlock < 3){
                const subBlock = await getBlockInfo(refItem, preview, levelBlock + 1);
                _.merge(refItem, subBlock);
              }
            } else {
              // Obtener el RichText de los destacados principales que no sean un bloque
              if(viewIsSupported({ actualView: blockEntryContent?.view?.__typename ?? blockEntryContent?.simpleView, ref })){
                const richtextItemReferences = await getReferencesRichtextContent({ content: refItem, preview });
                if (richtextItemReferences && typeof richtextItemReferences === 'object' && Object.keys(richtextItemReferences).length > 0) {
                  _.merge(refItem, richtextItemReferences);
                }
              }
            }

            // Obtener la información del producto si aplica
            if(refItem.__typename === CONTENTFUL_TYPENAMES.PRODUCT && refItem?.sku) {
              const commercelayerProduct = await getCommercelayerProduct(refItem.sku);
              _.merge(refItem, commercelayerProduct);
            }
          }
        }
      }

      // Obtener las referencias de RichText para el bloque ContenidosPromo
      const richtextReferences = await getReferencesRichtextContent({ content: blockEntryContent, preview });
      if (richtextReferences && typeof richtextReferences === 'object' && Object.keys(richtextReferences).length > 0) {
        _.merge(blockEntryContent, richtextReferences);
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

    return blockEntryContent;
};

export default getReferencesContent;
