import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    columnsSize: 2,
    isReverse: false
  },
  listedContentsCollection: {
    items: [
      {
        promoTitle: 'Lámparas de gas 1',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 2',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 3',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 4',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 5',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 6',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      }
    ]
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Lámparas de gas 1 ft',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 2 ft',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      }
    ]
  }
};

const dataListedContents: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    columnsSize: 3,
    isReverse: false,
    backgroundColor: 'Azul Degradado Oscuro'
  },
  listedContentsCollection: {
    items: [
      {
        promoTitle: 'Lámparas de gas 1',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 2',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 3',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 4',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 5',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      },
      {
        promoTitle: 'Lámparas de gas 6',
        externalLink: '#',
        ctaLabel: 'Ver más',
        promoImage: {
          url: 'https://via.placeholder.com/1220x972.png',
          title: ''
        },
      }
    ]
  }
};

export const mockProductGrillProps = {
  data,
  dataListedContents
};
