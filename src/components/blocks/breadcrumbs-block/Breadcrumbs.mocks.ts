import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
    ctaCollection: {
        items: [
            {
                promoTitle: 'Hogares',
                internalLink: {
                    urlPaths: ['#']
                }
            },
            {
                promoTitle: 'Solicitar Servicio',
                internalLink: {
                    urlPaths: ['#']
                }
            },
            {
                promoTitle: 'Nuevo Punto de Gas',
                internalLink: {
                    urlPaths: ['#']
                }
            },
            {
                promoTitle: 'Paso a paso instalación',
                internalLink: {
                    urlPaths: ['#']
                }
            },
            {
                promoTitle: 'Firmas Instaladoras',
                internalLink: {
                    urlPaths: ['#']
                }
            }
        ]
    }
};
export const mocksBreadcrumbsProps = {
    data
};