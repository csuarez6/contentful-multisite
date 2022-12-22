import { IImageAsset } from './assets-cf.interface';
import { ILink } from "./menu-cf.interface";

export interface IHeader {
  logo?: IImageAsset;
  menu: ILink[];
  utility: ILink[];
};
