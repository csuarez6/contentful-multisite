import ProductMinimalQuery from "../product-minimal.gql";

const ProductMinimalFragment = `
    fragment ProductMinimalFragment on Product {
        ${ProductMinimalQuery}
    }
`;

export default ProductMinimalFragment;
