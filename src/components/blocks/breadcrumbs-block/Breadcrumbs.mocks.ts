import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
    ctaCollection: {
        items: [
            {
                promoTitle: 'Hogares',
                internalLink: {
                    urlPath: '#'
                }
            },
            {
                promoTitle: 'Solicitar Servicio',
                internalLink: {
                    urlPath: '#'
                }
            },
            {
                promoTitle: 'Nuevo Punto de Gas',
                internalLink: {
                    urlPath: '#'
                }
            },
            {
                promoTitle: 'Paso a paso instalación',
                internalLink: {
                    urlPath: '#'
                }
            },
            {
                promoTitle: 'Firmas Instaladoras',
                internalLink: {
                    urlPath: '#'
                }
            }
        ]
    }
};
export const mocksBreadcrumbsProps = {
    data
};