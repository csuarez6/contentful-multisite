import { IPromoCard } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoCard = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  url: '#',
  image: {
    url: 'https://via.placeholder.com/1280x392.png',
    title: ''
  }
};

export const mockVerticalCardProps = {
  data,
};
