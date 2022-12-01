import { IImageAsset } from './image-asset-cf.interface';

export interface IPromoCard {
    title?: string;
    subtitle?: string;
    description?: string;
    url?: string;
    image?: IImageAsset;
    alt?: string;
    icon?: string;
}

export interface IPromoContent {
    title?: string;
    description?: string;
    card?: IPromoCard;
};
