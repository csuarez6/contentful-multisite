import { IPromoBlock } from "./promo-content-cf.interface";

export interface IAccordionList  {
    title?: string,
    content?: string
}
export interface IAccordion {
    items: IAccordionList[]
}

export interface IAccordionBlock extends IPromoBlock {
    title?: string,
    description?: any;
    featuredContentsCollection?: any;
}
