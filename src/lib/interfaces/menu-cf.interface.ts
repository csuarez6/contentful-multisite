import { IImageAsset } from "./assets-cf.interface";
import { IPage } from "./page-cf.interface";
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
    items?: Array<IPage & IPromoContent & INavigation>;
  };
  secondaryNavCollection?: {
    items?: Array<IPage & IPromoContent>;
  };
  utilityNavCollection?: {
    items?: IPromoContent[];
  };
  menuNavkey?: string;
  overrideNavCollection?: {
    items?: Array<IPage & IPromoContent & INavigation>;
  };
};
