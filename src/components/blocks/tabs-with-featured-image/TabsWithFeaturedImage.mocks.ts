import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  subtitle: 'SubTítulo',
  description: RICHTEXT_SHORT_SIMPLE,
  image: {
    url: 'https://via.placeholder.com/1220x1235.png',
    title: 'featuredView'
  },
  featuredContentsCollection: {
    items: [
      {
        subtitle: "Subtitle 1",
        promoTitle: 'KytchenSnyck Reparamos los defetos o fallas',
        promoIcon: 'pay',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      },
      {
        subtitle: "Subtitle 2",
        promoTitle: 'KytchenSnyck Reparamos los defetos o fallas',
        promoIcon: 'check',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      },
      {
        subtitle: "Subtitle 3",
        promoTitle: 'KytchenSnyck Reparamos los defetos o fallas',
        promoIcon: 'installation',
        promoDescription: RICHTEXT_SHORT_SIMPLE
      },
      {
        subtitle: "Subtitle 4",
        promoTitle: 'KytchenSnyck Reparamos los defetos o fallas',
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
