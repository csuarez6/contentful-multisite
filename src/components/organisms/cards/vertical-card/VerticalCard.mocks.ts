import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoContent = {
  promoTitle: 'Título',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  promoImage: {
    url: 'https://via.placeholder.com/1280x392.png',
    title: '',
    height: 120,
    width: 380,
  },
  cta: {
    href: "#",
    name: "Button"
  }
};

const dataWithButtons: IPromoContent = {
  promoTitle: 'Título',
  promoDescription: RICHTEXT_SHORT_SIMPLE,
  promoImage: {
    url: 'https://via.placeholder.com/1280x392.png',
    title: '',
    height: 120,
    width: 380,
  },
  cta: {
    href: "#",
    name: "Button"
  },
  ctaLabel: "Button",
  internalLink: {
    urlPaths: ["#"]
  }
};

export const mockVerticalCardProps = {
  data,
  dataWithButtons
};
