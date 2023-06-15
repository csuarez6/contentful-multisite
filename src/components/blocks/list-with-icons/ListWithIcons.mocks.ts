import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: '¿Necesitas Ayuda?',
  view:{
    iconPosition: 'Arriba',
    columnsSize: 5,
    buttonType: '',
    headerAlignment: 'Centrado'
  },
  featuredContentsCollection: {
    items: [
      {
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Whatsapp',
        promoIcon: 'whatsapp',
        iconPosition: 'left',
        iconSize: 'small',
        iconBackgroundColor: 'Azul Claro',
        internalLink:{
          urlPaths: ['#',]
        },
        ctaLabel: 'Consultar'
      },
      {
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Linea de atencion',
        promoIcon: 'phone',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPaths: ["#"]
        },
        iconBackgroundColor: 'Azul Claro',
      },
      {
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Preguntas frecuentes',
        promoIcon: 'linkedin',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPaths: ["#"]
        },
        iconBackgroundColor: 'Azul Claro',
      },
      {
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Centro de ayuda',
        promoIcon: 'whatsapp',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPaths: ["#"]
        },
        iconBackgroundColor: 'Azul Claro',
      },
      {
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Puntos de atencion',
        promoIcon: 'phone',
        ctaLabel: "Ver mas",
        internalLink: {
          urlPaths: ["#"]
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
    buttonType: 'Contorno',
    headerAlignment: 'Centrado'
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
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPaths: ["#"]
        }
      },
      {
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPaths: ["#"]
        }
      },
      {
        sys: {
          id: "4fcc63829ef04a7e8e1647"
        },
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPaths: ["#"]
        }
      }
    ]
  }
};

export const mockListWithIconsProps = {
  data,
  dataLeft
};
