import AuxNavigationMainFragment from "../fragments/aux-navigation-main.fragment";
import DefaultQuery, { RichtextQuery, internalLink } from "../shared/default.gql";

export const HeaderSecondaryFragments = `
  ${AuxNavigationMainFragment}
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
  backgroundColor
  ${internalLink}
`;
