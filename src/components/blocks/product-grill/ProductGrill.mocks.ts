import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  columnsNumber: 2,
  listedContent: [
    {
      promoTitle: 'Lámparas de gas 1',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      promoTitle: 'Lámparas de gas 2',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      promoTitle: 'Lámparas de gas 3',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      promoTitle: 'Lámparas de gas 4',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      promoTitle: 'Lámparas de gas 5',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      promoTitle: 'Lámparas de gas 6',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    }
  ],
  featuredContent: [
    {
      promoTitle: 'Lámparas de gas 1 ft',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
        url: 'https://via.placeholder.com/1220x972.png',
        title: ''
      },
    },
    {
      promoTitle: 'Lámparas de gas 2 ft',
      cta: {
        href:'#',
        name: 'Ver más'
      },
      promoImage: {
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
