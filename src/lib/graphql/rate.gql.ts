import { AssetImageQuery, AssetQuery  } from "./shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "./shared/default.gql";

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
    ctaLabel
    externalLink
    internalLink {
    ...on Page{
        ${DefaultQuery}
        slug
        promoTitle
    }
    ...on Product {
        ${DefaultQuery}
        slug
        urlPaths
        promoTitle
    }
    }
    mediaInternalLink{
        ${AssetQuery}
    }
`;

export default RateQuery;
