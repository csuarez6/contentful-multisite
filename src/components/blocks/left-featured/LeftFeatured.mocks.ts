import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  content: {
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
  }
};

export const mockLeftFeaturedProps = {
  data,
};
