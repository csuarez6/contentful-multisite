import { PageMinimalQuery } from "../page.gql";
import { ProductMinimalQuery } from "../product.gql";
import AssetQuery, { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "../shared/default.gql";
import { AuxCustomContentMinimalQuery } from "./custom-content.gql";

export const AuxNavigationMinimalQuery = `
  ${DefaultQuery}
  name
  promoTitle
  promoImage {
    ${AssetImageQuery}
  }
  promoIcon
  internalLink {
    ...on Page {
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

export const AuxNavigationFragments = `
  fragment PageMinimalFragment on Page {
    ${DefaultQuery}
    name
    promoTitle
    urlPaths
    promoIcon
  }
  fragment AuxNavigationMinimalFragment on AuxNavigation {
    ${AuxNavigationMinimalQuery}
  }
  fragment AuxCustomContentMinimalFragment on AuxCustomContent {
    ${AuxCustomContentMinimalQuery}
  }
`;

export const AuxNavigationReferenceFragments = `
  fragment PageMinimalFragment on Page {
    ${DefaultQuery}
    name
    promoTitle
    urlPaths
    promoIcon
    content {
      ${RichtextQuery}
    }
    promoDescription {
      ${RichtextQuery}
    }
    promoImage {
      ${AssetImageQuery}
    }
  }

  fragment AuxCustomContentMinimalFragment on AuxCustomContent {
    ${AuxCustomContentMinimalQuery}
  }

  fragment ProductMinimalFragment on Product {
    ${ProductMinimalQuery}
  }

  fragment AuxNavigationMinimalFragment on AuxNavigation {
    ${AuxNavigationMinimalQuery}
  }

  fragment AuxCustomContentFragment on AuxCustomContent {
    ${DefaultQuery}
    name
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
    externalLink
    linkParameters
    ctaLabel
    pretitle
    promoTitle
    subtitle
    promoDescription {
      ${RichtextQuery}
    }
    promoImage {
      ${AssetImageQuery}
    }
    promoIcon
    mainNavCollection {
      items {
        ...on Page {
          ${DefaultQuery}
        }
        ...on AuxNavigation {
          ${AuxNavigationMinimalQuery}
        }
        ...on AuxCustomContent {
          ${AuxCustomContentMinimalQuery}
        }
      }
    }
    linkView
    content{
      ${RichtextQuery}
    }
    mediaInternalLink{
      ${AssetQuery}
    }
    iframeHeight
  }

  fragment AuxNavigationMainFragment on AuxNavigation {
    ${DefaultQuery}
    name
    promoTitle
    promoImage {
      ${AssetImageQuery}
    }
    promoIcon
    mainNavCollection(limit: 5) {
      items {
        ... on Page {
          ${DefaultQuery}
          name
          promoTitle
          mainNavCollection(limit: 10) {
            items {
              ...PageMinimalFragment
              ...AuxNavigationMinimalFragment
              ...AuxCustomContentMinimalFragment
              ...ProductMinimalFragment
            }
          }
        }
        ... on AuxNavigation {
          ${DefaultQuery}
          name
          promoTitle
          mainNavCollection(limit: 10) {
            items {
              ...PageMinimalFragment
              ...AuxNavigationMinimalFragment
              ...AuxCustomContentMinimalFragment
            }
          }
        }
        ... on AuxCustomContent {
          ${DefaultQuery}
          name
          promoTitle
          mainNavCollection(limit: 10) {
            items {
              ...PageMinimalFragment
              ...AuxNavigationMinimalFragment
              ...AuxCustomContentMinimalFragment
              ...ProductMinimalFragment
            }
          }
        }
      }
    }
    secondaryNavCollection {
      items {
        ...PageMinimalFragment
        ...AuxCustomContentMinimalFragment
        ...ProductMinimalFragment
        ...AuxNavigationMinimalFragment
      }
    }
    mainText {
      ${RichtextQuery}
    }
    secondaryText {
      ${RichtextQuery}
    }
  }
`;

export const AuxNavigationReferenceQuery = `
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
      }
    }
  }
  backgroundColor
`;

const AuxNavigationQuery = `
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
      ... AuxCustomContentFragment
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

export default AuxNavigationQuery;
