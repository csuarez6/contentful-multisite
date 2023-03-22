import { AssetImageQuery, AssetQuery  } from "./shared/asset.gql";
import RichtextQuery from "./shared/richtext.qql";

const RateQuery = `
    name
    zone
    company
    year
    month
    promoTitle
    promoDescription {
        ${RichtextQuery}
    }
    promoImage {
        ${AssetImageQuery}
    }
    promoIcon
    linkText
    externalLink
    internalLink{
        ${AssetQuery}
    }
`;

export default RateQuery;
