import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: '¿Nesecitas Ayuda?',
  view:{
    iconPosition: 'Arriba',
    columnsSize: 5,
    buttonType: '',
    
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Whatsapp',
        promoIcon: 'whatsapp',
        iconPosition: 'left',
        iconSize: 'small',
        iconBackgroundColor: 'Azul Claro',
        internalLink:{
          urlPath: '#',
        },
        ctaLabel: 'Consultar'
      },
      {
        promoTitle: 'Line de atencion',
        promoIcon: 'phone',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPath: "#"
        },
        iconBackgroundColor: 'Azul Claro',
      },
      {
        promoTitle: 'Preguntas frecuentes',
        promoIcon: 'linkedin',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPath: "#"
        },
        iconBackgroundColor: 'Azul Claro',
      },
      {
        promoTitle: 'Centro de ayuda',
        promoIcon: 'whatsapp',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPath: "#"
        },
        iconBackgroundColor: 'Azul Claro',
      },
      {
        promoTitle: 'Puntos de atencion',
        promoIcon: 'phone',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPath: "#"
        },
        iconBackgroundColor: 'Azul Claro',
      },
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
