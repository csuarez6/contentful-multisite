import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view:{
    iconPosition: 'Arriba',
    columnsSize: 3,
    buttonType: 'Primario'
  },
  ctaCollection: {
    items: [
      {
        externalLink: '#',
        name: 'button'
      },
      {
        externalLink: '#',
        name: 'button'
      }
    ]
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      }
    ]
  }
};

const dataLeft: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view:{
    iconPosition: 'Izquierda',
    columnsSize: 3,
    buttonType: 'Contorno'
  },
  ctaCollection: {
    items: [
      {
        externalLink: 'www.google.com',
        name: 'button'
      },
      {
        externalLink: '#',
        name: 'button'
      }
    ]
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      }
    ]
  }
};

export const mockListWithIconsProps = {
  data,
  dataLeft
};
