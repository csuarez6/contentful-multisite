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
import ViewServicesTabs from "../views/services-tabs.gql";
import ViewFeaturedTabs from "../views/featured-tabs.gql";
import ViewListedTabs from "../views/listed-tabs.gql";
import ViewServicesCard from "../views/services-card.gql";
import AuxCustomContent from "../aux/custom-content.gql";
import PageQuery from "../page.gql";

const BlockPromoContentQuery = `
  ${DefaultQuery}
  name
  title
  subtitle
  description {
    ${RichtextQuery}
  }
  ctaCollection {
    items {
      ${AuxCustomContent}
    }
  }
  ctaLabel
  featuredContentsCollection {
    items {
      ...on Page {
        ${PageQuery}
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
  }
`;

export default BlockPromoContentQuery;
