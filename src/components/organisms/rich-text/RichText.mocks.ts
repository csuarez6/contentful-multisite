import { RICHTEXT_WITH_IMAGE } from "@/constants/mocks.constants";
import { IPromoContent, IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: (IPromoContent & IPromoBlock) = {
  promoTitle: 'lorem ipsum Promo Title',
  subtitle: 'lorem ipsum subtitle',
  promoDescription: RICHTEXT_WITH_IMAGE,
  view: { textAlign: "center", buttonType: "button" },
  
};

export const mockRichTextProps = {
  data
};