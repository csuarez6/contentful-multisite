import { RICHTEXT_WITH_IMAGE } from "@/constants/mocks.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'lorem ipsum Promo Title',
  subtitle: 'lorem ipsum subtitle',
  promoDescription: RICHTEXT_WITH_IMAGE,
};

export const mockRichTextProps = {
  data
};