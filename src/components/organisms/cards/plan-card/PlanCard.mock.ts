import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const card: IPromoContent = {
    tags: [
        {
            label: 'Vanti listo',
        },
        {
            label: 'Factura de gas',
        }
    ],
    description: 'Reparamos defectos menores: cierres de punto, fugas menores, ajuste de racores o conexiones de gasodomésticos, ajustes de ventilación) derivados de la visita técnica de RPO y/o emergencias.',
    subtitle: 'Plan 0',
    title: '$50.000',
    image: {
        url: 'https://via.placeholder.com/1024',
        title: 'Plan card'
    }
};

const cardReverse: IPromoContent = {
    tags: [
        {
            label: 'Vanti listo',
        },
        {
            label: 'Factura de gas',
        }
    ],
    description: 'Reparamos defectos menores: cierres de punto,dd fugas menores, ajuste de racores o conexiones de gasodomésticos, ajustes de ventilación) derivados de la visita técnica de RPO y/o emergencias.',
    subtitle: 'Plan 0',
    title: '$50.000',
    image: {
        url: 'https://via.placeholder.com/1024',
        title: 'Plan card'
    },
    isReverse: true
};

export const cardPropMocks = {
    card,
    cardReverse
};