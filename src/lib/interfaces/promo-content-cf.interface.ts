import { IImageAsset } from './assets-cf.interface';
import { ILink, IListItems } from "@/lib/interfaces/menu-cf.interface";
import { IRpoForm } from "./IForm-cf";
import { IRichText } from './richtext-cf.interface';
import { IPage } from './page-cf.interface';

interface IBlockProps {
    isFirst?: boolean;
    isLast?: boolean;
    key?: string;
    asBlock?: boolean;
}

export interface IPromoContent {
    __typename?: string;
    sys?: {
        id?: string;
    };
    name?: string;
    promoTitle?: string;
    subtitle?: string;
    promoDescription?: IRichText;
    cta?: ILink;
    promoImage?: IImageAsset;
    alt?: string;
    promoIcon?: string;
    iconPosition?: string;
    iconSize?: string;
    iconColor?: string;
    buttonType?: string;
    iconBackgroundColor?: string;
    bgIconRounded?: string;
    isReverse?: boolean;
    tags?: ITag[];
    externalLink?: string;
    internalLink?: IPage;
    ctaLabel?: string;
    slug?: string;
}

export interface IPromoBlock extends IBlockProps {
    title?: string;
    pretitle?: string;
    subtitle?: string;
    description?: IRichText;
    content?: IPromoContent;
    listedContentsCollection?: {
        items?: IPromoContent[]
    };
    featuredContentsCollection?: {
        items?: IPromoContent[]
    };
    backgroundColor?: string;
    columnsSize?: number;
    alignImage?: string;
    iconColor?: string;
    buttonColor?: string;
    view?: IView;
    isReverse?: boolean;
    cta?: IListItems;
    image?: IImageAsset;
    listedForm?: IRpoForm;
    imageOrientation?: string;
    ctaCollection?: {
        items?: IPromoContent[]
    }
}

export interface ITag {
    label: string;
    backgroundColor?: string;
}

export interface IView {
    name?: string;
    backgroundColor?: string;
    bannerHeight?: string;
    bannerWidth?: string;
    buttonType?: string;
    columnsSize?: number;
    imageAlign?: string;
    iconBackgroundColor?: string;
    iconPosition?: string;
    iconSize?: string;
    imageOrientation?: string;
    isReverse?: boolean;
    titleAlign?: string;
}