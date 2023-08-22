import { IAsset, IImageAsset } from './assets-cf.interface';
import { ILink, IListItems } from "@/lib/interfaces/menu-cf.interface";
import { IInquiryForm } from "./IForm-cf";
import { IRichText } from './richtext-cf.interface';
import { IPage } from './page-cf.interface';
import { IProductOverviewDetails } from './product-cf.interface';
import { IProductCategory } from './content-filter-cf.interface';

interface IBlockProps {
    isFirst?: boolean;
    isLast?: boolean;
    key?: string;
    asBlock?: boolean;
    sysId?: string;
    blockId?: string;
}

export interface IPromoContent {
    __typename?: string;
    objectID?: string;
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
    alignButton?: string;
    iconBackgroundColor?: string;
    bannerWidth?: string
    bgIconRounded?: string;
    isReverse?: boolean;
    tags?: ITag[];
    externalLink?: string;
    internalLink?: IPage;
    linkParameters?: string;
    ctaLabel?: string;
    slug?: string;
    isActive?: boolean;
    children?: React.ReactNode;
    linkView?: string;
    backgroundColor?: string;
    showButton?: boolean;
    content?: IRichText;
    mediaInternalLink?: IAsset;
    urlPaths?: string[];
    simpleView?: string;
    iframeHeight?: number;
    isClosable?: boolean;
}

export interface IPromoBlock extends IBlockProps {
    __typename?: string;
    title?: string;
    pretitle?: string;
    subtitle?: string;
    description?: IRichText;
    promoIcon?: string;
    listedContentsCollection?: {
        items?: IPromoContent[] | IProductOverviewDetails[]
    };
    featuredContentsCollection?: {
        items?: IPromoContent[] | IProductCategory[]
    };
    simpleView?: string;
    view?: IView;
    cta?: IListItems;
    image?: IImageAsset;
    listedForm?: IInquiryForm;
    ctaCollection?: {
        items?: IPromoContent[]
    };
    links?: ILink[];
    footerText?: IRichText;
}

export interface IFormBlock extends IBlockProps {
    __typename?: string;
    title?: string;
    subtitle?: string;
    description?: IRichText;
    simpleView?: string;
    view?: IView;
}

export interface ITag {
    label: string;
    backgroundColor?: string;
}

export interface IView {
    __typename?: string;
    name?: string;
    textAlign?: string;
    backgroundColor?: string;
    bannerHeight?: string;
    bannerWidth?: string;
    buttonType?: string;
    columnsSize?: number;
    imageAlign?: string;
    iconBackgroundColor?: string;
    iconPosition?: string;
    iconSize?: string;
    displayIcon?: boolean;
    imageOrientation?: string;
    isReverse?: boolean;
    alignTitle?: string;
    isSlider?: boolean;
    alignButton?: string;
    roundedImage?: boolean;
    showButton?: boolean;
    tabDisplay?: string;
    isBlock?: boolean;
    headerAlignment?: string;
}