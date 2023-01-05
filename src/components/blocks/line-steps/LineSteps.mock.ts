import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
    description: RICHTEXT_SHORT_SIMPLE,
    title: 'How it works',
    subtitle:'Its insanely easy to get started',
    ctaCollection: {
        items:[
            {
                externalLink:'#',
                ctaLabel:'Button'
            }
        ]
    },
    featuredContentsCollection: {
        items: [
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title1'
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title2'
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title3'
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title4'
            },
        ]
    }
};


export {
    data
};
