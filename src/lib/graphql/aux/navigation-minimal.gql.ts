import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { internalLink } from "../shared/default.gql";

const AuxNavigationMinimalQuery = `
  ${DefaultQuery}
  name
  promoTitle
  promoImage {
    ${AssetImageQuery}
  }
  promoIcon
  ${internalLink}
`;

export default AuxNavigationMinimalQuery;
