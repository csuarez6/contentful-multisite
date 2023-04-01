import { Session } from "next-auth";
import { IImageAsset } from "./assets-cf.interface";
import { INavigation } from "./menu-cf.interface";
import { IPromoBlock, IPromoContent } from "./promo-content-cf.interface";
import { IRichText } from "./richtext-cf.interface";

export interface ILayout {
    name?: string;
    headerInfo?: INavigation;
    footerInfo?: INavigation;
    menuNavkey?: string;
    helpButton?: INavigation;
    preview?: boolean;
}

export interface IPage {
    session?: Session;
    __typename?: string;
    sys?: {
        __typename?: string;
        id?: string;
    }
    name?: string;
    slug?: string;
    parent?: any; // @TODO: por definir
    content?: IRichText;
    blocksCollection?: {
        items?: Array<IPromoBlock>
    }
    promoTitle?: string;
    promoImage?: IImageAsset;
    promoDescription?: IRichText;
    promoIcon?: string;
    layout?: ILayout;
    children?: React.ReactNode;
    urlPath?: string;
    showHeader?: boolean;
    mainNavCollection?: {
        items?: Array<IPage & INavigation & IPromoContent>;
    };
    relatedContentCollection?: {
        items?: Array<IPage & INavigation & IPromoContent>;
    };
}
