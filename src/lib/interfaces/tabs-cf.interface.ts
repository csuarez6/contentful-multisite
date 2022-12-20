import { IPromoBlock } from "./promo-content-cf.interface";

export interface ITab {
    name: string,
    href?: string
};

export interface ITabBlock extends IPromoBlock {
    tabs?: ITab[],
    isSecondary?: boolean
};