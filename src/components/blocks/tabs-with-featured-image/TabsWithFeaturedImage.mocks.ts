import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  image: {
    url: 'https://via.placeholder.com/1220x1235.png',
    title: 'featuredView'
  },
  featuredContentsCollection: {
    items: [
      {
        subtitle: "Subtitle 1",
        promoTitle: 'Tab 1',
        promoIcon: 'pay',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      },
      {
        subtitle: "Subtitle 2",
        promoTitle: 'Tab 2',
        promoIcon: 'check',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      },
      {
        subtitle: "Subtitle 3",
        promoTitle: 'Tab 3',
        promoIcon: 'installation',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      },
      {
        subtitle: "Subtitle 4",
        promoTitle: 'Tab 4',
        promoIcon: 'assists',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      },
      {
        subtitle: "Subtitle 5",
        promoTitle: 'Tab 5',
        promoIcon: 'maintenance',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      }
    ]
  }
};

export const mockTabsWithFeaturedImageProps = {
  data,
};

