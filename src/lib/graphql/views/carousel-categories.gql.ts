import DefaultQuery from "../shared/default.gql";

const ViewCarouselCategories = `
    ${DefaultQuery}
    name
    alignTitle
    columnsSize
    isSlider
    isLink
`;

export default ViewCarouselCategories;