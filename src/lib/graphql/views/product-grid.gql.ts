import DefaultQuery from "../shared/default.gql";

const ViewProductGrid = `
  ${DefaultQuery}
  name
  columnsSize
  isReverse
  buttonType
`;

export default ViewProductGrid;