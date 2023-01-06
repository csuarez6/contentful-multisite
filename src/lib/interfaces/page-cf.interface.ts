import { IImageAsset } from "./assets-cf.interface";
import { INavigation } from "./menu-cf.interface";
import { IPromoBlock, IPromoContent } from "./promo-content-cf.interface";
import { IRichText } from "./richtext-cf.interface";

export interface ILayout {
    name?: string;
    headerInfo?: INavigation;
    footerInfo?: INavigation;
}

export interface IPage {
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
    mainNavCollection?: {
        items?: Array<IPage & INavigation & IPromoContent>;
    };
}
