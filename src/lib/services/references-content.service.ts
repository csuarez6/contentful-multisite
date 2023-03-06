import _ from "lodash";

import getEntryContent from "./entry-content.service";

import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";

const REFERENCES = {
  [CONTENTFUL_TYPENAMES.PAGE]: [
    'blocksCollection',
    'mainNavCollection',
    'parent'
  ],
  [CONTENTFUL_TYPENAMES.PAGE_MINIMAL]: [
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

export default getReferencesContent;
