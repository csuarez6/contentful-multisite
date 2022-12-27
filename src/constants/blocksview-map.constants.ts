import AccordionBlock from "@/components/blocks/accordion-block/AccordionBlock";
import LeftFeaturedBlock from "@/components/blocks/left-featured/LeftFeatured";
import { CONTENTFUL_TYPENAMES } from "./contentful-typenames.constants";

/**
 * Supports:
 * 
 * ContentType: React.Component,
 * ContentType: {
 *    ViewContentType: React.Component,
 * }
 */
export const BLOCKSVIEW_MAP = {
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: {
    [CONTENTFUL_TYPENAMES.VIEW_ACCORDION]: AccordionBlock,
    [CONTENTFUL_TYPENAMES.VIEW_LEFT_FEATURED]: LeftFeaturedBlock
  },
};

export const CHILDREN_KEYS_MAP = {};
