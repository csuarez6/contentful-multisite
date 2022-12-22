import { IPageLayout } from "@/components/layouts/page-layout/PageLayout";
import { IImageAsset } from "./assets-cf.interface";
import { IPromoBlock } from "./promo-content-cf.interface";
import { IRichText } from "./richtext-cf.interface";

export interface IPage {
    name?: string;
    slug?: string;
    parent?: any; // @TODO: por definir
    content?: IRichText;
    blocksCollection?: {
        items?: Array<IPromoBlock>
    }
    promoTitle?: string;
    promoImage?: IImageAsset;
    promoDescription?: IRichText;
    promoIcon?: string;
    layout?: IPageLayout;
}
