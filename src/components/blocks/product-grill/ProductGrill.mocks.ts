import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  columnsNumber: 2,
  listedContent: [
    {
      title: 'Lámparas de gas 1',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      title: 'Lámparas de gas 2',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      title: 'Lámparas de gas 3',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      title: 'Lámparas de gas 4',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      title: 'Lámparas de gas 5',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      title: 'Lámparas de gas 6',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    }
  ],
  featuredContent: [
    {
      title: 'Lámparas de gas 1 ft',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      title: 'Lámparas de gas 2 ft',
      url: '#',
      ctaLabel: 'Ver más',
      image: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    }
  ],
  isReverse: false
};

export const mockProductGrillProps = {
  data
};
