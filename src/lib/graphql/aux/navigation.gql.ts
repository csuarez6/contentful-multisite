import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery from "../shared/default.gql";
import RichtextQuery from "../shared/richtext.qql";
import AuxCustomContent from "./custom-content.gql";

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
      urlPath
      promoTitle
    }
    ...on Product {
      ${DefaultQuery}
      slug
      urlPath
      promoTitle
    }
  }
`;

export default AuxNavigationQuery;
