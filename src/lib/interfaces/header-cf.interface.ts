import { IListLinks } from "@/lib/interfaces/menu-cf.interface";

export interface IHeader {
  logo?: string,
  menu?: IListLinks[],
  utility?: IListLinks[]
};
