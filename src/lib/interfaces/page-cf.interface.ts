import { IImageAsset } from "./assets-cf.interface";
import { INavigation } from "./menu-cf.interface";
import { IPromoBlock } from "./promo-content-cf.interface";
import { IRichText } from "./richtext-cf.interface";

export interface ILayout {
    name?: string;
    headerInfo?: INavigation;
    footerInfo?: INavigation;
}

export interface IPage {
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
}
