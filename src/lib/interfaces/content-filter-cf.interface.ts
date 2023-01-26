import { IImageAsset } from "./assets-cf.interface";
import { IPage } from "./page-cf.interface";
import { IRichText } from "./richtext-cf.interface";

export interface IProductCategory {
  sys?: {
    id?: string;
  }
  name: string;
  image?: IImageAsset;
}

export interface ITrademark {
  sys?: {
    id?: string;
  }
  name: string;
  image?: IImageAsset;
}

export interface IContentFilter {
  sys?: {
    id?: string;
  }
  name?: string;
  title?: string;
  description?: IRichText;
  parentsCollection?: {
    items?: Array<IPage>;
  };
  contentTypesFilter?: string[];
  availableFacets?: string[];
  orderingOptions?: string[];
  pageResults?: number;
  blockId?: string;
}
