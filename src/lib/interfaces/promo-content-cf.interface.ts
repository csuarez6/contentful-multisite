import { IImageAsset } from './image-asset-cf.interface';

export interface IPromoContent {
    title?: string;
    subtitle?: string;
    description?: string;
    url?: string;
    image?: IImageAsset;
    alt?: string;
    icon?: string;
}

export interface IPromoBlock {
    title?: string;
    description?: string;
    content?: IPromoContent;
};
