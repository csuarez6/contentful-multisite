import { AssetImageQuery  } from "./shared/asset.gql";
import { RichtextQuery } from "./shared/default.gql";

const AllyQuery = `
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
