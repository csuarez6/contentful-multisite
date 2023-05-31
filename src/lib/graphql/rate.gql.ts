import { AssetImageQuery, AssetQuery  } from "./shared/asset.gql";
import DefaultQuery from "./shared/default.gql";
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
    ctaLabel
    externalLink
    internalLink {
    ...on Page{
        ${DefaultQuery}
        slug
        s
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
