import { ProductMinimalQuery } from "../product.gql";

const ProductMinimalFragment = `
    fragment ProductMinimalFragment on Product {
        ${ProductMinimalQuery}
    }
`;

export default ProductMinimalFragment;
