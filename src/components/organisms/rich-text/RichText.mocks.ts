import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'lorem ipsum Promo Title',
  subtitle: 'lorem ipsum subtitle',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
};


export const mockRichTextProps = {
  data
};