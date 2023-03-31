import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Título',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  promoIcon: 'body'
};

const dataWithButton: IPromoContent = {
  promoTitle: 'Título',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  promoIcon: 'body',
  showButton: true,
  externalLink: "#",
  ctaLabel: "ctaLabel"
};

export const mockSearchCardProps = {
  data,
  dataWithButton
};
