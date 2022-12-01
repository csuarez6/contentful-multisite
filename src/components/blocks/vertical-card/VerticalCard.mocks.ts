import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  card: {
    title: 'Título',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
    url: '#',
    image: {
      url: 'https://via.placeholder.com/588x180.png',
      title: 'Card image'
    }
  }
};

export const mockVerticalCardProps = {
  data,
};
