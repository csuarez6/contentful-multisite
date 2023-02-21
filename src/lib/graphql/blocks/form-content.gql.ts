import DefaultQuery from "../shared/default.gql";
import RichtextQuery from "../shared/richtext.qql";

export const BlockFormQuery = `
    name
    title
    subtitle
    description{
      ${RichtextQuery}
    }
    simpleView
    view{
      ${DefaultQuery}
    }
`;