import DefaultQuery from "../shared/default.gql";

export const BlockFormQuery = `
  ${DefaultQuery}
  name
  title
  subtitle
  description{
    json
  }
  simpleView
`;
