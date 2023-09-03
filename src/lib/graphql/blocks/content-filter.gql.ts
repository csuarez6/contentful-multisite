import DefaultQuery, { RichtextQuery } from "../shared/default.gql";
import PageMinimalQuery from "../views/page-minimal.gql";

const BlockContentFilterQuery = `
  ${DefaultQuery}
  name
  title
  description {
    ${RichtextQuery}
  }
  parentsCollection {
    items {
      ...on Page {
        ${PageMinimalQuery}
      }
    }
  }
  contentTypesFilter
  availableFacets
  mainFacet
  orderingOptions
  pageResults
  blockId
`;

export default BlockContentFilterQuery;
