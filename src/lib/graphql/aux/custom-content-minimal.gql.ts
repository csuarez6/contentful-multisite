import AssetQuery, { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery, internalLink } from "../shared/default.gql";

const AuxCustomContentMinimalQuery = `
  ${DefaultQuery}
  name
  ${internalLink}
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
  linkView
  content{
    ${RichtextQuery}
  }
  mediaInternalLink{
    ${AssetQuery}
  }
  iframeHeight
`;

export default AuxCustomContentMinimalQuery;
