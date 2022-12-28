import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  image: {
    url: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    title: 'featuredView'
  },
  cta: {
    name: 'buttons',
    list: [
      {
        name: 'button',
        href: '#'
      },
      {
        name: 'button external',
        href: '#',
        isExternal: true
      }
    ]
  },
  featuredContentsCollection:
  {
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
  alignImage: 'right',
  image: {
    url: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    title: 'featuredView'
  },
  cta: {
    name: 'buttons',
    list: [
      {
        name: 'button',
        href: '#'
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
  alignImage: 'right',
  image: {
    url: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    title: 'featuredView'
  },
  cta: {
    name: 'buttons',
    list: [
      {
        name: 'button',
        href: '#'
      }
    ]
  },
  columnsSize: 3,
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