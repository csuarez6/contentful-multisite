import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "../shared/default.gql";

const PageMinimalQuery = `
  ${DefaultQuery}
  name
  promoTitle
  urlPaths
  promoIcon
  parent {
    ${DefaultQuery}
  }
  content {
    ${RichtextQuery}
  }
  promoDescription {
    ${RichtextQuery}
  }
  promoImage {
    ${AssetImageQuery}
  }
`;

export default PageMinimalQuery;
