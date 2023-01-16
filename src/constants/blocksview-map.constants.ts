import AccordionBlock from "@/components/blocks/accordion-block/AccordionBlock";
import LeftFeaturedBlock from "@/components/blocks/left-featured/LeftFeatured";
import VerticalCardBlock from "@/components/blocks/vertical-card/VerticalCard";
import InformativeGridBlock from "@/components/blocks/informative-grid/InformativeGrid";
import FeaturedBlock from "@/components/blocks/featured-block/FeaturedBlock";
import ListWithIconBlock from "@/components/blocks/list-with-icons/ListWithIcons";
import BannerSliderBlock from "@/components/blocks/banner-slider/BannerSlider";
import BannerImage from "@/components/blocks/banner-image/BannerImage";
import ProductGrid from "@/components/blocks/product-grid/ProductGrid";
import LineSteps from "@/components/blocks/line-steps/LineSteps";
import InfoCardBlock from "@/components/blocks/info-card/InfoCard";
import ProductGrillBlock from "@/components/blocks/product-grill/ProductGrill";
import ServicesTabsBlock from "@/components/blocks/services-tabs/ServicesTabs";
import ProductFinancingBlock from "@/components/blocks/product-financing/ProductFinancing";
import FuneralPlansBlock from "@/components/blocks/funeral-plans/FuneralPlans";

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
    [CONTENTFUL_TYPENAMES.VIEW_BANNER_CAROUSEL]: BannerSliderBlock,
    [CONTENTFUL_TYPENAMES.VIEW_PRODUCT_GRID]: ProductGrid,
    [CONTENTFUL_TYPENAMES.VIEW_LINE_OF_STEPS]: LineSteps,
    [CONTENTFUL_TYPENAMES.VIEW_BANNER_IMAGE]: BannerImage,
    [CONTENTFUL_TYPENAMES.VIEW_PRODUCT_GRID]: ProductGrid,
    [CONTENTFUL_TYPENAMES.VIEW_INFORMATION_CARDS]: InfoCardBlock,
    [CONTENTFUL_TYPENAMES.VIEW_PRODUCT_GRILL]: ProductGrillBlock,
    [CONTENTFUL_TYPENAMES.VIEW_SERVICES_TABS]: ServicesTabsBlock,
    [CONTENTFUL_TYPENAMES.VIEW_PRODUCT_FINANCING]: ProductFinancingBlock,
    [CONTENTFUL_TYPENAMES.VIEW_FUNERAL_PLANS]: FuneralPlansBlock
  },
};

export const CHILDREN_KEYS_MAP = {};
