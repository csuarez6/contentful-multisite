import AuxCustomContentMinimalFragment from "../fragments/aux-custom-content-minimal.fragment";
import AuxNavigationMinimalFragment from "../fragments/aux-navigation-minimal.fragment";
import PageMinimalFragment from "../fragments/page-minimal.fragment";
import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery, internalLink } from "../shared/default.gql";

export const NavigationFragments = `
    ${AuxCustomContentMinimalFragment}
    ${AuxNavigationMinimalFragment}
    ${PageMinimalFragment}
`;

const NavigationQuery = `
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
                name
                promoTitle
                promoIcon
                mainNavCollection(limit: 10) {
                    items {
                        ...AuxCustomContentMinimalFragment
                        ...AuxNavigationMinimalFragment
                        ...PageMinimalFragment
                    }
                }
                ${internalLink}
            }
            ... on AuxCustomContent {
                ${DefaultQuery}
                name
                promoTitle
                promoIcon
                mainNavCollection(limit: 10) {
                    items {
                        ...AuxCustomContentMinimalFragment
                        ...AuxNavigationMinimalFragment
                        ...PageMinimalFragment
                    }
                }
                ${internalLink}
                externalLink
            }
        }
    }
    secondaryNavCollection(limit: 10) {
        items {
            ...AuxCustomContentMinimalFragment
            ...AuxNavigationMinimalFragment
            ...PageMinimalFragment
        }
    }
    mainText {
        ${RichtextQuery}
    }
    secondaryText {
        ${RichtextQuery}
    }
    backgroundColor
`;

export default NavigationQuery;
