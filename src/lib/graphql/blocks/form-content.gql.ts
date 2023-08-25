import DefaultQuery, { RichtextQuery } from "../shared/default.gql";

const BlockFormQuery = `
  ${DefaultQuery}
  name
  title
  subtitle
  description{
    ${RichtextQuery}
  }
  simpleView
`;
