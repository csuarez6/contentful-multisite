import { IImageAsset } from './image-asset-cf.interface';
import { IListLinks } from "./menu-cf.interface";

export interface IHeader {
  logo?: IImageAsset;
  menu: IListLinks[];
  utility: IListLinks[];
};
