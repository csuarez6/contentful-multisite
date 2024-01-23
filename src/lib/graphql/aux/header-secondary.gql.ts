import AuxNavigationMainFragment from "../fragments/aux-navigation-main.fragment";
import DefaultQuery, { RichtextQuery, internalLink } from "../shared/default.gql";
import AuxCustomContentMinimalFragment from "../fragments/aux-custom-content-minimal.fragment";
import PageMinimalFragment from "../fragments/page-minimal.fragment";

export const HeaderSecondaryFragments = `
  ${AuxNavigationMainFragment}
  ${AuxCustomContentMinimalFragment}
  ${PageMinimalFragment}
`;

export const HeaderSecondaryQuery = `
  ${DefaultQuery}
  name
  promoTitle
  mainNavCollection(limit: 5) {
    items {
      ...AuxNavigationMainFragment
    }
  }
  secondaryNavCollection(limit: 5){
    items {
      ... on AuxNavigation {
        ${DefaultQuery}
        name
        promoTitle
        mainNavCollection(limit: 5) {
          items {
            ...AuxNavigationMainFragment
          }
        }
        utilityNavCollection(limit: 5) {
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
        ${internalLink}
      }
    }
  }
  utilityNavCollection(limit: 5) {
    items {
      ...PageMinimalFragment
      ...AuxCustomContentMinimalFragment
    }
  }
  backgroundColor
  ${internalLink}
`;
