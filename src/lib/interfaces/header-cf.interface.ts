import { IImageAsset } from './image-asset-cf.interface';
import { ILink } from "./menu-cf.interface";

export interface IHeader {
  logo?: IImageAsset;
  menu: ILink[];
  utility: ILink[];
};
