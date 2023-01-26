import { AssetImageQuery } from "./asset.gql";
import DefaultQuery from "./default.gql";

const ProductCategoryQuery = `
  ${DefaultQuery}
  name
  image {
    ${AssetImageQuery}
  }
`;

export default ProductCategoryQuery;
