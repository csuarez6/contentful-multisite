import { CONTENTFUL_TYPENAMES } from "./contentful-typenames.constants";

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
import CarouselCategoriesBlock from "@/components/blocks/carousel-categories/CarouselCategories";
import FeaturedTabsBlock from "@/components/blocks/featured-tabs/FeaturedTabs";
import ContentFilter from "@/components/blocks/content-filter/ContentFilter";
import FeaturedProductBlock from "@/components/blocks/product-featured/FeaturedProductBlock";
import RpoFormBlock from "@/components/blocks/rpo-form/RpoForm";
import VideoBlock from "@/components/blocks/videoSlider-block/VideoBlock";
import VerticalCard from "@/components/organisms/cards/vertical-card/VerticalCard";
import FeaturedProduct from "@/components/organisms/cards/featured-product/FeaturedProduct";
import ServiceLineBlock from "@/components/blocks/service-line/ServiceLineBlock";
import RichText from "@/components/organisms/rich-text/Richtext";

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
    [CONTENTFUL_TYPENAMES.VIEW_FUNERAL_PLANS]: FuneralPlansBlock,
    [CONTENTFUL_TYPENAMES.VIEW_CAROUSEL]: CarouselCategoriesBlock,
    [CONTENTFUL_TYPENAMES.VIEW_FEATURED_TABS]: FeaturedTabsBlock,
    [CONTENTFUL_TYPENAMES.VIEW_FEATURED_PRODUCTS]: FeaturedProductBlock,
    [CONTENTFUL_TYPENAMES.VIEW_QUERY_FORM]: RpoFormBlock,
    [CONTENTFUL_TYPENAMES.VIEW_VIDEO_SLIDER]: VideoBlock,
    [CONTENTFUL_TYPENAMES.VIEW_RICH_TEXT]: RichText,
  },
  [CONTENTFUL_TYPENAMES.BLOCK_CONTENT_FILTER]: ContentFilter,
  [CONTENTFUL_TYPENAMES.PRODUCT]: FeaturedProduct,
  [CONTENTFUL_TYPENAMES.PAGE]:  VerticalCard,
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]:  VerticalCard,
  [CONTENTFUL_TYPENAMES.AUX_NAVIGATION]: ServiceLineBlock
};

export const CHILDREN_KEYS_MAP = {};
