import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'top',
        cta: {
          href: '#',
          name: 'button'
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'top',
        cta: {
          href: '#',
          name: 'button'
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        iconPosition: 'top',
        cta: {
          href: '#',
          name: 'button'
        }
      }
    ]
  }
};

export const mockListWithIconsProps = {
  data,
};
