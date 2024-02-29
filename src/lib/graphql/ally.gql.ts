import { AssetImageQuery  } from "./shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "./shared/default.gql";

const AllyQuery = `
    ${DefaultQuery}
    name
    phone
    address
    city
    promoTitle
    promoDescription {
        ${RichtextQuery}
    }
    promoImage {
        ${AssetImageQuery}
    }
    promoIcon
`;

export default AllyQuery;
