import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "./shared/default.gql";

const ProductMinimalQuery = `
  ${DefaultQuery}
  name
  sku
  marketId
  slug
  urlPaths
  promoTitle
  promoImage {
    ${AssetImageQuery}
  }
  promoDescription {
    ${RichtextQuery}
  }
  trademark {
    name
  }
  size
  capacity
  isNew
  discount
  campaign
`;

export default ProductMinimalQuery;
