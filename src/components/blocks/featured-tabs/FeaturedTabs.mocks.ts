import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: any = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        title: 'Tab1',
        featuredContentsCollection:{
          items:[
            {
              promoTitle: 'lorem ipsum 1 ft',
              promoDescription: RICHTEXT_SHORT_SIMPLE,
              promoIcon: 'invoice-filled',
            },
            {
              promoTitle: 'lorem ipsum 2 ft',
              promoDescription: RICHTEXT_SHORT_SIMPLE,
              promoIcon: 'invoice-filled',
            },
            {
              promoTitle: 'lorem ipsum 3 ft',
              promoDescription: RICHTEXT_SHORT_SIMPLE,
              promoIcon: 'invoice-filled',
            }
          ]
        },
        __typename: 'AuxCustomContent'
      },
      {
        title: 'Tab2',
        featuredContentsCollection:{
          items:[
            {
              promoTitle: 'lorem ipsum 1',
              promoDescription: RICHTEXT_SHORT_SIMPLE,
              promoIcon: 'invoice-filled',
            },
            {
              promoTitle: 'lorem ipsum 2',
              promoDescription: RICHTEXT_SHORT_SIMPLE,
              promoIcon: 'invoice-filled',
            },
            {
              promoTitle: 'lorem ipsum 3',
              promoDescription: RICHTEXT_SHORT_SIMPLE,
              promoIcon: 'invoice-filled',
            }
          ]
        },
        __typename: 'AuxCustomContent'
      }
    ]
  }
};

export const mockFeaturedTabsProps = {
  data,
};
