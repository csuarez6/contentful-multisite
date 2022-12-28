import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
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
    promoDescription: RICHTEXT_SHORT_SIMPLE,
    subtitle: 'Plan 0',
    promoTitle: '$50.000',
    promoImage: {
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
    promoDescription: RICHTEXT_SHORT_SIMPLE,
    subtitle: 'Plan 0',
    promoTitle: '$50.000',
    promoImage: {
        url: 'https://via.placeholder.com/1024',
        title: 'Plan card'
    },
    isReverse: true
};

export const cardPropMocks = {
    card,
    cardReverse
};