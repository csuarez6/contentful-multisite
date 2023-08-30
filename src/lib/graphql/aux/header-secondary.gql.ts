import AuxNavigationMainFragment from "../fragments/aux-navigation-main.fragment";
import DefaultQuery, { RichtextQuery } from "../shared/default.gql";

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
        internalLink {
          ...on Page{
            ${DefaultQuery}
            slug
            urlPaths
            promoTitle
          }
          ...on Product {
            ${DefaultQuery}
            slug
            urlPaths
            promoTitle
          }
        }
      }
    }
  }
  backgroundColor
  internalLink {
    ...on Page{
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
    ...on Product {
      ${DefaultQuery}
      slug
      urlPaths
      promoTitle
    }
  }
`;
