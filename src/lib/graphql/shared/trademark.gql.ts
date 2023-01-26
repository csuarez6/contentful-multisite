import { AssetImageQuery } from "./asset.gql";
import DefaultQuery from "./default.gql";

const TrademarkQuery = `
  ${DefaultQuery}
  name
  image {
    ${AssetImageQuery}
  }
`;

export default TrademarkQuery;
