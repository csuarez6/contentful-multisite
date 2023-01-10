import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view:{
    iconPosition: 'top'
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Title',
        promoIcon: 'invoice-filled',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Button",
        internalLink: {
          urlPath: "#"
        }
      }
    ]
  }
};

export const mockListWithIconsProps = {
  data,
};
