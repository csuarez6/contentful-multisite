import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Título',
  subtitle: 'Subtítulo',
  promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  promoImage: {
    url: 'https://via.placeholder.com/1280x1050.png'
  },
  cta: {
    href: "#",
    name: "Button"
  }
};

export const mockLeftFeaturedProps = {
  data,
};
