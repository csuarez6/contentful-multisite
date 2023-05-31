import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery from "./shared/default.gql";
import RichtextQuery from "./shared/richtext.qql";

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
`;

export const ProductMinimalQuery = `
  name
  promoTitle
  urlPaths
`;

export default ProductQuery;
