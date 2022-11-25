import { IListLinks, IListItems } from "@/lib/interfaces/menu-cf.interface";

export interface IFooter {
  title?: string,
  footerText?: string,
  menu?: IListItems[],
  social?: IListLinks[]
};
