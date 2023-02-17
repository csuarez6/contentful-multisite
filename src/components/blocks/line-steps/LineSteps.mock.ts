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
                promoTitle: 'Title 1',
                promoImage: { 
                    url: "https://placehold.co/600x645?text=Title+1",
                    width: 600,
                    height: 645
                }
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title 2',
                promoImage: { 
                    url: "https://placehold.co/600x645?text=Title+2",
                    width: 600,
                    height: 645
                }
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title 3',
                promoImage: { 
                    url: "https://placehold.co/600x645?text=Title+3",
                    width: 600,
                    height: 645
                }
            },
            {
                promoDescription: RICHTEXT_SHORT_SIMPLE,
                promoTitle: 'Title 4',
                promoImage: { 
                    url: "https://placehold.co/600x645?text=Title+4",
                    width: 600,
                    height: 645
                }
            },
        ]
    }
};


export {
    data
};
