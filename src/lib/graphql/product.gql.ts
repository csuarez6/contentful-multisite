import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "./shared/default.gql";

const ProductQuery = `
  ${DefaultQuery}
  name
  sku
  marketId
  slug
  urlPaths
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
    clWarrantyReference
    clInstallationReference
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
  isNew
  discount
`;

export const ProductMinimalQuery = `
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
  size
  capacity
  isNew
  discount
`;

export default ProductQuery;
