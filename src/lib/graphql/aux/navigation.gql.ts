import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "../shared/default.gql";
import AuxCustomContent from "./custom-content.gql";

export const AuxNavigationMinimalQuery = `
  ${DefaultQuery}
  name
  promoTitle
  promoImage {
    ${AssetImageQuery}
  }
  promoIcon
  internalLink {
    ...on Page{
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
    ...on Product {
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
  }
`;

const AuxNavigationQuery = `
  ${DefaultQuery}
  name
  promoTitle
  promoImage {
    ${AssetImageQuery}
  }
  promoIcon
  mainNavCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on AuxNavigation {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${AuxCustomContent}
      }
    }
  }
  secondaryNavCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${AuxCustomContent}
      }
      ...on Product{
        ${DefaultQuery}
      }
      ...on AuxNavigation {
        ${DefaultQuery}
      }
    }
  }
  utilityNavCollection {
    items {
      ...on Page {
        ${DefaultQuery}
      }
      ...on AuxCustomContent {
        ${DefaultQuery}
      }
    }
  }
  mainText {
    ${RichtextQuery}
  }
  secondaryText {
    ${RichtextQuery}
  }
  backgroundColor
  internalLink {
    ...on Page{
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
    ...on Product {
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
  }
`;

export default AuxNavigationQuery;
