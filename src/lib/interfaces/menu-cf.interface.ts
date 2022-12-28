import { IImageAsset } from "./assets-cf.interface";
import { IPromoContent } from "./promo-content-cf.interface";
import { IRichText } from "./richtext-cf.interface";

export interface ILink {
  name: string,
  href: string,
  icon?: string,
  isExternal?: boolean,
  buttonType?: string
}

export interface IListItems {
  name?: string,
  list?: ILink[]
};

export interface INavigation {
  name?: string;
  promoTitle?: string;
  secondaryText?: IRichText;
  promoImage?: IImageAsset;
  mainNavCollection?: {
    items?: Array<any>;
  };
  secondaryNavCollection?: {
    items?: IPromoContent[];
  };
  utilityNavCollection?: {
    items?: IPromoContent[];
  };
};
