import { PageMinimalQuery } from "../page.gql";
import DefaultQuery, { RichtextQuery } from "../shared/default.gql";

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
