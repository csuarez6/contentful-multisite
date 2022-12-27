import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [{
      promoTitle: 'Título',
      subtitle: 'Subtítulo',
      promoDescription: RICHTEXT_SHORT_SIMPLE,
      promoImage: {
        url: 'https://via.placeholder.com/1280x1050.png'
      },
      cta: {
        href: "#",
        name: "Button"
      }
    }]
  }
};

export const mockLeftFeaturedProps = {
  data,
};
