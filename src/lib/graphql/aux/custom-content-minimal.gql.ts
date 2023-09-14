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
  linkView
  mediaInternalLink{
    ${AssetQuery}
  }
  iframeHeight
`;

export default AuxCustomContentMinimalQuery;
