import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "../shared/default.gql";
import ViewAccordionQuery from "../views/accordion.gql";
import ViewBannerImage from "../views/banner-image.gql";
import ViewFeatured from "../views/featured.gql";
import ViewProductFinancing from "../views/product-financing.gql";
import ViewInformationGrid from "../views/information-grid.gql";
import ViewListWithIcons from "../views/list-with-icons.gql";
import ViewProductGrill from "../views/product-grill.gql";
import ViewProductGrid from "../views/product-grid.gql";
import ViewServicesTabs from "../views/services-tabs.gql";
import ViewFeaturedTabs from "../views/featured-tabs.gql";
import ViewServicesCard from "../views/services-card.gql";
import ViewInformationCards from "../views/info-card.gql";
import ViewCarouselCategories from "../views/carousel-categories.gql";
import ViewFeaturedProducts from "../views/featured-products.gql";
import ViewVideoSlider from "../views/videoSlider.gql";
import ViewSecondaryBanner from "../views/secondaryBanner.gql";
import ViewRichText from "../views/richText.gql";
import { PageMinimalQuery } from "../page.gql";
import { ProductMinimalQuery } from "../product.gql";
import { AuxCustomContentMinimalQuery } from "../aux/custom-content.gql";

const BlockPromoContentQuery = `
  ${DefaultQuery}
  name
  title
  pretitle
  subtitle
  description {
    ${RichtextQuery}
  }
  ctaCollection {
    items {
      ...on Page {
        ${PageMinimalQuery}
      }
      ...on Product {
        ${ProductMinimalQuery}
      }
      ...on AuxCustomContent {
        ${AuxCustomContentMinimalQuery}
      }
    }
  }
  featuredContentsCollection {
    items {
      ...on Page {
        ${PageMinimalQuery}
      }
      ...on Product {
        ${ProductMinimalQuery}
      }
      ...on AuxCustomContent {
        ${AuxCustomContentMinimalQuery}
      }
      ...on BlockPromoContent{
        ${DefaultQuery}
      } 
    }
  }
  listedContentsCollection {
    items {
      ...on Page {
        ${PageMinimalQuery}
      }
      ...on Product {
        ${ProductMinimalQuery}
      }
      ...on AuxCustomContent {
        ${AuxCustomContentMinimalQuery}
      }
    }
  }
  image {
    ${AssetImageQuery}
  }
  simpleView
  view {
    ...on ViewAccordion {
      ${ViewAccordionQuery}
    }
    ...on ViewBannerImage { 
      ${ViewBannerImage}
    }
    ...on ViewFeatured {
      ${ViewFeatured}
    }
    ...on ViewProductFinancing { 
      ${ViewProductFinancing}
    }
    ...on ViewInformationGrid {
      ${ViewInformationGrid}
    }
    ...on ViewListWithIcons {
      ${ViewListWithIcons}
    }
    ...on ViewProductGrill {
      ${ViewProductGrill}
    }
    ...on ViewProductGrid {
      ${ViewProductGrid}
    }
    ...on ViewServicesTabs {
      ${ViewServicesTabs}
    }
    ...on ViewFeaturedTabs {
      ${ViewFeaturedTabs}
    }
    ...on ViewServicesCard {
      ${ViewServicesCard}
    }
    ...on ViewInformationCards{
      ${ViewInformationCards}
    }
    ...on ViewCarousel{ 
      ${ViewCarouselCategories}
    }
    ...on ViewFeaturedProducts{
      ${ViewFeaturedProducts}
    }
    ...on ViewVideoSlider{
      ${ViewVideoSlider}
    }
    ...on ViewSecondaryBanner{
      ${ViewSecondaryBanner}
    }
    ...on ViewRichText{
      ${ViewRichText}
    }
  }
  blockId
  promoIcon
  footerText {
    ${RichtextQuery}
  }
`;

export default BlockPromoContentQuery;
