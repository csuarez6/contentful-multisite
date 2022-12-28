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
    }
    ...on Product {
      ${DefaultQuery}
      slug
    }
  }
  externalLink
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
`;

export default AuxCustomContent;
