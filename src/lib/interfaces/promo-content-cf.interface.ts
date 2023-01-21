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
    /**
     * @deprecated
     */
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
    linkParameters?: string;
    ctaLabel?: string;
    slug?: string;
    isActive?: boolean;
}

export interface IPromoBlock extends IBlockProps {
    title?: string;
    pretitle?: string;
    subtitle?: string;
    description?: IRichText;
    /**
     * @deprecated
     */
    content?: IPromoContent;
    listedContentsCollection?: {
        items?: IPromoContent[]
    };
    featuredContentsCollection?: {
        items?: IPromoContent[]
    };
    /**
     * @deprecated
     */
    backgroundColor?: string;
    /**
     * @deprecated
     */
    columnsSize?: number;
    /**
     * @deprecated
     */
    alignImage?: string;
    /**
     * @deprecated
     */
    iconColor?: string;
    /**
     * @deprecated
     */
    buttonColor?: string;
    view?: IView;
    /**
     * @deprecated
     */
    isReverse?: boolean;
    /**
     * @deprecated
     */
    cta?: IListItems;
    image?: IImageAsset;
    listedForm?: IRpoForm;
    /**
     * @deprecated
     */
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
    alignTitle?: string;
}