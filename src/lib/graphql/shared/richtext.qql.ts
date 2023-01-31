import { AssetImageQuery } from "./asset.gql";

export const RichtextLinksQuery = `
links {
  assets {
    block {
      sys {
        id
      }
      fileName
      contentType
      ${AssetImageQuery}
    }
  }
}
`;

const RichtextQuery = `
  json
`;

export default RichtextQuery;
