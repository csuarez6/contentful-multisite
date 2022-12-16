import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  content: {
    title: 'Título',
    subtitle: 'Subtítulo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
    image: {
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
