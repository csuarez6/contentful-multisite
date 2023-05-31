import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  pretitle: 'Pretítulo',
  subtitle: 'Subtítulo',
  description: RICHTEXT_SHORT_SIMPLE,
  image: {
    url: 'https://via.placeholder.com/1120x1042.png',
    title: 'featuredView'
  },
  ctaCollection: {
    items: [
      {
        ctaLabel: 'internalLink',
        internalLink: {
          urlPaths: ['/mantenimiento']
        }
      },
      {
        ctaLabel: 'externalLink',
        externalLink: 'https://www.grupovanti.com'
      }
    ]
  },
  featuredContentsCollection: {
    items: [
      {
        promoIcon: 'chat',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        bgIconRounded: 'bg-blue-dark',
        iconColor: 'text-white',
        iconSize: 'small',
      },
      {
        promoIcon: 'chat',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        bgIconRounded: 'bg-blue-dark',
        iconColor: 'text-white',
        iconSize: 'small',
      },
      {
        promoIcon: 'chat',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        bgIconRounded: 'bg-blue-dark',
        iconColor: 'text-white',
        iconSize: 'small',
      }
    ]
  }
};

const dataImageRight: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    imageAlign: 'Derecha'
  },
  image: {
    url: 'https://via.placeholder.com/1120x1042.png',
    title: 'featuredView'
  },
  ctaCollection: {
    items: [
      {
        ctaLabel: 'button',
        externalLink: '#'
      }
    ]
  },
  featuredContentsCollection: {
    items: [
      {
        promoIcon: 'chat',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        bgIconRounded: 'bg-blue-dark',
        iconColor: 'text-white',
        iconSize: 'small',
      },
      {
        promoIcon: 'chat',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        bgIconRounded: 'bg-blue-dark',
        iconColor: 'text-white',
        iconSize: 'small',
      },
      {
        promoIcon: 'chat',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        bgIconRounded: 'bg-blue-dark',
        iconColor: 'text-white',
        iconSize: 'small',
      }
    ]
  }
};

const dataListedColumns: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    imageAlign: 'Derecha',
    columnsSize: 3,
  },
  image: {
    url: 'https://via.placeholder.com/1120x1820.png',
    title: 'featuredView'
  },
  ctaCollection: {
    items: [
      {
        ctaLabel: 'button',
        externalLink: '#'
      }
    ]
  },  
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Title',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        iconSize: 'small',
      },
      {
        promoTitle: 'Title',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        iconSize: 'small',
      },
      {
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        iconSize: 'small',
      },
      {
        promoTitle: 'Title',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        iconSize: 'small',
      },
      {
        promoTitle: 'Title',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        iconSize: 'small',
      },
      {
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'left',
        iconSize: 'small',
      }
    ]
  }
};

export const mockFeaturedBlockProps = {
  data,
  dataImageRight,
  dataListedColumns
};