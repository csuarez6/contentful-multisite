import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery from "./shared/default.gql";
import RichtextQuery from "./shared/richtext.qql";

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
  promoImage {
    ${AssetImageQuery}
  }
  promoDescription {
    ${RichtextQuery}
  }
  promoIcon
  urlPath
  mainNavCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on AuxNavigation {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
      ...on Product {
        ${DefaultQuery}
      }
    }
  }
`;

export const PageMinimalQuery = `
  ${DefaultQuery}
  name
  promoTitle
  urlPath
  parent {
    ${DefaultQuery}
  }
`;

export default PageQuery;
