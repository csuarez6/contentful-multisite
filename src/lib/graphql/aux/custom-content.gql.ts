import AssetQuery, { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery from "../shared/default.gql";
import RichtextQuery from "../shared/richtext.qql";

const AuxCustomContent = `
  ${DefaultQuery}
  name
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
  content{
    ${RichtextQuery}
  }
  mediaInternalLink{
    ${AssetQuery}
  }
  iframeHeight
`;

export const AuxCustomContentMinimalQuery = `
  ${DefaultQuery}
  promoTitle
  name
  internalLink {
    ... on Page {
      slug
      urlPaths
      promoTitle
    }
    ... on Product {
      slug
      urlPaths
      promoTitle
    }
  }
  externalLink
`;

export default AuxCustomContent;
