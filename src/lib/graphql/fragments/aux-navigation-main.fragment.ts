import { AssetImageQuery } from "../shared/asset.gql";
import DefaultQuery, { RichtextQuery } from "../shared/default.gql";
import AuxCustomContentMinimalFragment from "./aux-custom-content-minimal.fragment";
import AuxNavigationMinimalFragment from "./aux-navigation-minimal.fragment";
import PageMinimalFragment from "./page-minimal.fragment";
import ProductMinimalFragment from "./product-minimal.fragment";

const AuxNavigationMainFragment = `
    ${PageMinimalFragment}
    ${AuxCustomContentMinimalFragment}
    ${AuxNavigationMinimalFragment}
    ${ProductMinimalFragment}
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
        secondaryNavCollection(limit: 5) {
            items {
                ...PageMinimalFragment
                ...AuxCustomContentMinimalFragment
                ...ProductMinimalFragment
                ... on AuxNavigation {
                    ${DefaultQuery}
                    name
                    promoTitle
                    mainNavCollection(limit: 5) {
                        items {
                            ...AuxCustomContentMinimalFragment
                        }
                    }
                }
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

export default AuxNavigationMainFragment;
