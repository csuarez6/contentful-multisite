import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoContent = {
  promoTitle: 'Título',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  promoImage: {
    url: 'https://via.placeholder.com/1280x392.png',
    title: ''
  },
  cta: {
    href: "#",
    name: "Button"
  }
};

export const mockVerticalCardProps = {
  data,
};
