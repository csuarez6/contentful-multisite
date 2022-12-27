import { IImageAsset } from './assets-cf.interface';
import { ILink, IListItems } from "@/lib/interfaces/menu-cf.interface";
import { IRpoForm } from "./IForm-cf";

interface IBlockProps {
    isFirst?: boolean;
    isLast?: boolean;
    key?: string;
    asBlock?: boolean;
}

export interface IPromoContent {
    promoTitle?: string;
    subtitle?: string;
    promoDescription?: string;
    cta?: ILink;
    promoImage?: IImageAsset;
    alt?: string;
    promoIcon?: string;
    iconPosition?: string;
    iconSize?: string;
    iconColor?: string;
    bgIconRounded?: string;
    isReverse?: boolean;
    tags?: ITag[];
}

export interface IPromoBlock extends IBlockProps {
    title?: string;
    description?: string;
    content?: IPromoContent;
    listedContent?: IPromoContent[];
    featuredContent?: IPromoContent[];
    backgroundColor?: string;
    columnsNumber?: number;
    alignImage?: string;
    iconColor?: string;
    buttonColor?: string;
    views?: string;
    isReverse?: boolean;
    cta?: IListItems;
    image?: IImageAsset;
    listedForm?: IRpoForm;
}

export interface ITag {
    label: string;
    bacKgroundColor?: string;
}
