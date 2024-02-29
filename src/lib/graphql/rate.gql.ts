import { AssetImageQuery, AssetQuery  } from "./shared/asset.gql";
import DefaultQuery, { RichtextQuery, internalLink } from "./shared/default.gql";

const RateQuery = `
    ${DefaultQuery}
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
    ctaLabel
    externalLink
    ${internalLink}
    mediaInternalLink{
        ${AssetQuery}
    }
`;

export default RateQuery;
