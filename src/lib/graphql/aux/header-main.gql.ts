import AuxCustomContentMinimalFragment from "../fragments/aux-custom-content-minimal.fragment";
import AuxNavigationMinimalFragment from "../fragments/aux-navigation-minimal.fragment";
import PageMinimalFragment from "../fragments/page-minimal.fragment";
import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery, internalLink } from "../shared/default.gql";

export const HeaderMainFragments = `
  ${PageMinimalFragment}
  ${AuxCustomContentMinimalFragment}
  ${AuxNavigationMinimalFragment}
`;

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
      ...AuxCustomContentMinimalFragment
      ...AuxNavigationMinimalFragment
    }
  }
  utilityNavCollection(limit: 10) {
    items {
      ...PageMinimalFragment
      ...AuxCustomContentMinimalFragment
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