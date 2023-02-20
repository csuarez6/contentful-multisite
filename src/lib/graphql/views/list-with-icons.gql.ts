import DefaultQuery from "../shared/default.gql";

const ViewListWithIcons = `
  ${DefaultQuery}
  name
  backgroundColor
  columnsSize
  buttonType
  iconPosition
  iconSize
  iconBackgroundColor
  headerAlignment
`;

export default ViewListWithIcons;