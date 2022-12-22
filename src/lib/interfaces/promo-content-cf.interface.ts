import { IImageAsset } from './assets-cf.interface';
import { ILink, IListItems } from "@/lib/interfaces/menu-cf.interface";

interface IBlockProps {
    isFirst?: boolean;
    isLast?: boolean;
    key?: string;
    asBlock?: boolean;
}

export interface IPromoContent {
    title?: string;
    subtitle?: string;
    description?: string;
    cta?: ILink;
    url?: string;
    image?: IImageAsset;
    alt?: string;
    icon?: string;
    ctaLabel?: string;
    blockFoot?: string;
    iconPosition?: string;
    iconSize?: string;
    bgIconRounded?: string;
}

export interface IPromoBlock extends IBlockProps {
    title?: string;
    description?: string;
    content?: IPromoContent;
    listedContent?: IPromoContent[];
    featuredContent?: IPromoContent[];
    backgroundColor?: string;
    columnsNumber?: string;
    alignImage?: string;
    iconColor?: string;
    buttonColor?: string;
    views?: string;
    cta?: IListItems;
};
