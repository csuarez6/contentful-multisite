import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Título',
  subtitle: 'Subtítulo',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  promoImage: {
    url: 'https://via.placeholder.com/1280x1050.png',
    width: 1280,
    height: 1050
  },
  cta: {
    href: "#",
    name: "Button"
  },
};

export const mockLeftFeaturedProps = {
  data,
};
