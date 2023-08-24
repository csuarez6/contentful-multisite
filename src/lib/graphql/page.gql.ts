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

export const PageFragments = `
  fragment PageMinimalFragment on Page {
    ${PageMinimalQuery}
  }

  fragment AuxNavigationMinimalFragment on AuxNavigation {
    ${AuxNavigationMinimalQuery}
  }
  
  fragment AuxCustomContentMinimalFragment on AuxCustomContent {
    ${AuxCustomContentMinimalQuery}
  }

  fragment ProductMinimalFragment on Product {
    ${ProductMinimalQuery}
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
      ...on BlockForm {
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
      ...PageMinimalFragment
      ...AuxNavigationMinimalFragment
      ...AuxCustomContentMinimalFragment
      ...ProductMinimalFragment
    }
  }
  showHeader
  enableHeaderPrecedence
  relatedContentCollection {
    items {
      ...PageMinimalFragment
      ...AuxNavigationMinimalFragment
      ...AuxCustomContentMinimalFragment
      ...ProductMinimalFragment
    }
  }
`;

export default PageQuery;
