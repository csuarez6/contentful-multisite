import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery, internalLink } from "../shared/default.gql";

const HeaderMainQuery = `
  ${DefaultQuery}
  name
  promoTitle
  promoImage {
    ${AssetImageQuery}
  }
  promoIcon
  mainNavCollection(limit: 10) {
    items {
      ... on AuxNavigation {
        ${DefaultQuery}
      }
    }
  }
  secondaryNavCollection(limit: 10) {
    items {
      ... on AuxCustomContent {
        ${DefaultQuery}
      }
      ... on AuxNavigation {
        ${DefaultQuery}
      }
    }
  }
  mainText {
    ${RichtextQuery}
  }
  secondaryText {
    ${RichtextQuery}
  }
  backgroundColor
  ${internalLink}
`;

export default HeaderMainQuery;