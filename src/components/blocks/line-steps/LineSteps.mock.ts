import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
    description: RICHTEXT_SHORT_SIMPLE,
    title: 'How it works',
    subtitle: 'Its insanely easy to get started',
    image: {
        url: "https://placehold.co/1220x1312?text=ImageBlock+-+Img+size+1220x1312",
        width: 562,
        height: 604
    },
    ctaCollection: {
        items: [
            {
                externalLink: '#',
                ctaLabel: 'Button'
            }
        ]
    },
    featuredContentsCollection: {
        items: [
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title 1',
                promoImage: {
                    url: "https://placehold.co/1220x1312?text=Title+1+-+Img+size+1220x1312",
                    width: 562,
                    height: 604
                }
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title 2'
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title 3',
                promoImage: {
                    url: "https://placehold.co/1220x1312?text=Title+3+-+Img+size+1220x1312",
                    width: 562,
                    height: 604
                }
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title 4',
                promoImage: {
                    url: "https://placehold.co/1220x1312?text=Title+4+-+Img+size+1220x1312",
                    width: 562,
                    height: 604
                }
            },
        ]
    }
};

export {
    data
};
