import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery from "./shared/default.gql";
import RichtextQuery from "./shared/richtext.qql";

const ProductQuery = `
  ${DefaultQuery}
  name
  sku
  slug
  urlPath
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
  trademark
  size
  capacity
  warranty
`;

export default ProductQuery;
