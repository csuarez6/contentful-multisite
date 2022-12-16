import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  image: {
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
