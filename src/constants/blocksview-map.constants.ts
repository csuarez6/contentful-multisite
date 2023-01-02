import AccordionBlock from "@/components/blocks/accordion-block/AccordionBlock";
import LeftFeaturedBlock from "@/components/blocks/left-featured/LeftFeatured";
import VerticalCardBlock from "@/components/blocks/vertical-card/VerticalCard";
import InformativeGridBlock from "@/components/blocks/informative-grid/InformativeGrid";
import FeaturedBlock from "@/components/blocks/featured-block/FeaturedBlock";
import ListWithIconBlock from "@/components/blocks/list-with-icons/ListWithIcons";
import BannerCarouselBlock from "@/components/blocks/banner-carousel/BannerCarousel";
import ProductGrid from "@/components/blocks/product-grid/ProductGrid";
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
    [CONTENTFUL_TYPENAMES.VIEW_LEFT_FEATURED]: LeftFeaturedBlock,
    [CONTENTFUL_TYPENAMES.VIEW_SERVICES_CARD]: VerticalCardBlock,
    [CONTENTFUL_TYPENAMES.VIEW_INFORMATION_GRID]: InformativeGridBlock,
    [CONTENTFUL_TYPENAMES.VIEW_FEATURED]: FeaturedBlock,
    [CONTENTFUL_TYPENAMES.VIEW_LIST_WITH_ICONS]: ListWithIconBlock,
    [CONTENTFUL_TYPENAMES.VIEW_BANNER_CAROUSEL]: BannerCarouselBlock,
    [CONTENTFUL_TYPENAMES.VIEW_PRODUCT_GRID]: ProductGrid
  },
};

export const CHILDREN_KEYS_MAP = {};
