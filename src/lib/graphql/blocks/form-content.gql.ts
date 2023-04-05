import DefaultQuery from "../shared/default.gql";

export const BlockFormQuery = `
    name
    title
    subtitle
    description{
      json
    }
    simpleView
    view{
      ${DefaultQuery}
    }
`;