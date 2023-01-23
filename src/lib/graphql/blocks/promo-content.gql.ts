import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery from "../shared/default.gql";
import RichtextQuery from "../shared/richtext.qql";
import ViewAccordionQuery from "../views/accordion.gql";
import ViewBannerCarousel from "../views/banner-carousel.gql";
import ViewBannerImage from "../views/banner-image.gql";
import ViewFeatured from "../views/featured.gql";
import ViewProductFinancing from "../views/product-financing.gql";
import ViewInformationGrid from "../views/information-grid.gql";
import ViewListWithIcons from "../views/list-with-icons.gql";
import ViewProductGrill from "../views/product-grill.gql";
import ViewProductGrid from "../views/product-grid.gql";
import ViewServicesTabs from "../views/services-tabs.gql";
import ViewFeaturedTabs from "../views/featured-tabs.gql";
import ViewListedTabs from "../views/listed-tabs.gql";
import ViewServicesCard from "../views/services-card.gql";
import ViewLineOfSteps from "../views/lineOfSteps.gql";
import ViewInformationCards from "../views/info-card.gql";
import ViewCarouselCategories from "../views/carousel-categories.gql";

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
        ${DefaultQuery}
      }
      ...on Product {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
    }
  }
  featuredContentsCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on Product {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
    }
  }
  listedContentsCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on Product {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
    }
  }
  image {
    ${AssetImageQuery}
  }
  view {
    ...on ViewAccordion {
      ${ViewAccordionQuery}
    }
    ...on ViewBannerCarousel {
      ${ViewBannerCarousel}
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
    ...on ViewListedTabs {
      ${ViewListedTabs}
    }
    ...on ViewServicesCard {
      ${ViewServicesCard}
    }
    ...on ViewLineOfSteps{
      ${ViewLineOfSteps}
    }
    ...on ViewInformationCards{
      ${ViewInformationCards}
    }
    ...on ViewCarousel{ 
      ${ViewCarouselCategories}
    }
  }
  blockId
`;

export default BlockPromoContentQuery;
