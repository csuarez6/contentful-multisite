import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery from "../shared/default.gql";
import RichtextQuery from "../shared/richtext.qql";

const AuxCustomContent = `
  ${DefaultQuery}
  name
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
  externalLink
  linkParameters
  ctaLabel
  pretitle
  promoTitle
  subtitle
  promoDescription {
    ${RichtextQuery}
  }
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
        ${DefaultQuery}
      }
    }
  }
  linkView
`;

export default AuxCustomContent;
