import { AuxCustomContentMinimalQuery } from "./aux/custom-content.gql";
import { AuxNavigationMinimalQuery } from "./aux/navigation.gql";
import { ProductMinimalQuery } from "./product.gql";
import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "./shared/default.gql";

export const PageMinimalQuery = `
  ${DefaultQuery}
  name
  promoTitle
  urlPaths
  parent {
    ${DefaultQuery}
  }
`;

const PageQuery = `
  ${DefaultQuery}
  name
  slug
  content {
    ${RichtextQuery}
  }
  parent {
    ${DefaultQuery}
  }
  blocksCollection {
    items {
      ...on BlockPromoContent {
        ${DefaultQuery}
      }
      ...on BlockContentFilter {
        ${DefaultQuery}
      }
      ...on BlockForm{
        ${DefaultQuery}
      }
    }
  }
  promoTitle
  subtitle
  promoImage {
    ${AssetImageQuery}
  }
  promoDescription {
    ${RichtextQuery}
  }
  promoIcon
  urlPaths
  mainNavCollection {
    items {
      ...on Page {
        ${PageMinimalQuery}
      }
      ...on AuxNavigation {
        ${AuxNavigationMinimalQuery}
      }
      ...on AuxCustomContent {
        ${AuxCustomContentMinimalQuery}
      }
      ...on Product {
        ${ProductMinimalQuery}
      }
    }
  }
  showHeader
  enableHeaderPrecedence
  relatedContentCollection {
    items {
      ...on Page {
        ${PageMinimalQuery}
      }
      ...on AuxNavigation {
        ${AuxNavigationMinimalQuery}
      }
      ...on AuxCustomContent {
        ${AuxCustomContentMinimalQuery}
      }
      ...on Product {
        ${ProductMinimalQuery}
      }
    }
  }
`;

export default PageQuery;
