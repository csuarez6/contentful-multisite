import { IPromoCard } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoCard = {
  title: 'Título',
  subtitle: 'Subtítulo',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  url: '#',
  image: {
    url: 'https://via.placeholder.com/1280x1050.png'
  }
};

export const mockLeftFeaturedProps = {
  data,
};
