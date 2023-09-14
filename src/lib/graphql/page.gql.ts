import AuxCustomContentMinimalFragment from "./fragments/aux-custom-content-minimal.fragment";
import AuxNavigationMinimalFragment from "./fragments/aux-navigation-minimal.fragment";
import PageMinimalFragment from "./fragments/page-minimal.fragment";
import ParentFieldsFragment from "./fragments/parent-fields.fragment";
import ProductMinimalFragment from "./fragments/product-minimal.fragment";
import { AssetImageQuery } from "./shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "./shared/default.gql";

export const PageFragments = `
  ${ParentFieldsFragment}
  ${PageMinimalFragment}
  ${AuxNavigationMinimalFragment}
  ${AuxCustomContentMinimalFragment}
  ${ProductMinimalFragment}
`;

const PageQuery = `
  ${DefaultQuery}
  name
  slug
  parent {
    ...ParentFields
    parent {
      ...ParentFields
      parent {
        ...ParentFields
        parent {
          ...ParentFields
          parent {
            ...ParentFields
          }
        }
      }
    }
  }
  blocksCollection {
    items {
      ...on BlockPromoContent {
        ${DefaultQuery}
      }
      ...on BlockContentFilter {
        ${DefaultQuery}
      }
      ...on BlockForm {
        ${DefaultQuery}
      }
    }
  }
  content {
    ${RichtextQuery}
  }
  promoTitle
  subtitle
  promoImage {
    ${AssetImageQuery}
  }
  promoDescription {
    ${RichtextQuery}
  }
  promoIcon
  urlPaths
  mainNavCollection {
    items {
      ...PageMinimalFragment
      ...AuxNavigationMinimalFragment
      ...AuxCustomContentMinimalFragment
      ...ProductMinimalFragment
    }
  }
  showHeader
  enableHeaderPrecedence
  relatedContentCollection {
    items {
      ...PageMinimalFragment
      ...AuxNavigationMinimalFragment
      ...AuxCustomContentMinimalFragment
      ...ProductMinimalFragment
    }
  }
`;

export default PageQuery;
