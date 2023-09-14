import AssetQuery, { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery, internalLink } from "../shared/default.gql";

const AuxCustomContent = `
  ${DefaultQuery}
  name
  ${internalLink}
  externalLink
  linkParameters
  ctaLabel
  pretitle
  promoTitle
  subtitle
  promoImage {
    ${AssetImageQuery}
  }
  content {
    ${RichtextQuery}
  }
  promoDescription {
    ${RichtextQuery}
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
  mediaInternalLink {
    ${AssetQuery}
  }
  iframeHeight
`;

export default AuxCustomContent;
