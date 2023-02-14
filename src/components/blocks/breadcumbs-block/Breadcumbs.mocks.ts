import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
    ctaCollection: {
        items: [
            {
                ctaLabel: 'Lorem',
                internalLink: {
                    urlPath: '#'
                }
            },
            {
                ctaLabel: 'Ipsum',
                internalLink: {
                    urlPath: '#'
                }
            },
            {
                ctaLabel: 'Dolor',
                internalLink: {
                    urlPath: '#'
                }
            }
        ]
    }
};
export const mocksBreadcumbsProps = {
    data
};