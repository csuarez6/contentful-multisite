import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  listedContentsCollection: {
    items: [
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
  featuredContentsCollection: {
    items: [
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
  }
};

export const mockFeaturedTabsProps = {
  data,
};
