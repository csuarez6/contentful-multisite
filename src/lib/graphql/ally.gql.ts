import { AssetImageQuery  } from "./shared/asset.gql";
import RichtextQuery from "./shared/richtext.qql";

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
