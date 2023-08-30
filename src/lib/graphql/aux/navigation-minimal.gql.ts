import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery from "../shared/default.gql";

const AuxNavigationMinimalQuery = `
  ${DefaultQuery}
  name
  promoTitle
  promoImage {
    ${AssetImageQuery}
  }
  promoIcon
  internalLink {
    ...on Page {
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

export default AuxNavigationMinimalQuery;
