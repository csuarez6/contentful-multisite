import { ICardproduct } from "./card-product-cf.interface";

export interface IGrillprop {
    title?: string,
    subtitle?: string,
    content?: ICardproduct[],
    twoColumns?: boolean
};

