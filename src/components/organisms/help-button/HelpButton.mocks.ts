import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: INavigation = {
    promoTitle: 'Ayuda al usuario',
    mainText: RICHTEXT_SHORT_SIMPLE,
    secondaryText: RICHTEXT_SHORT_SIMPLE,
    mainNavCollection: {
        items: [
            {
                name: 'Whatsapp',
                promoIcon: 'whatsapp',
                externalLink: '#',
                ctaLabel: 'Consultar'
            },
            {
                name: 'Lineas de atención',
                promoTitle: 'Lineas de atención',
                promoIcon: 'cellphone',
                internalLink: {
                    urlPath: "#"
                },
                ctaLabel: 'Consultar'
            },
            {
                name: 'Puntos de atención',
                promoTitle: 'Puntos de atención',
                promoIcon: 'place',
                internalLink: {
                    urlPath: "#"
                },
                ctaLabel: 'Consultar'
            },
            {
                name: 'LLamada',
                promoTitle: 'Llamada',
                promoIcon: 'callback',
                externalLink: '#',
                ctaLabel: 'Consultar'
            },
        ]
    },

};
export const MocksHelpButtonProps = {
    data
};