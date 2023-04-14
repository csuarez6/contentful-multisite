import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery from "./shared/default.gql";
import RichtextQuery from "./shared/richtext.qql";

const ProductQuery = `
  ${DefaultQuery}
  name
  sku
  marketId
  slug
  urlPath
  parent {
    ${DefaultQuery}
  }
  promoTitle
  promoDescription {
    ${RichtextQuery}
  }
  promoImage {
    ${AssetImageQuery}
  }
  imagesCollection {
    items {
      ${AssetImageQuery}
    }
  }
  content {
    ${RichtextQuery}
  }
  category {
    name
    image {
      ${AssetImageQuery}
    }
  }
  features {
    ${RichtextQuery}
  }
  productFeatures {
    ${RichtextQuery}
  }
  trademark {
    name
    image{
      ${AssetImageQuery}
    }
  }
  size
  capacity
  warranty {
    name
    description {
      ${RichtextQuery}
    }
  }
`;

export const ProductMinimalQuery = `
  name
  promoTitle
  urlPath
`;

export default ProductQuery;
