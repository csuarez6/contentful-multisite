import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1280x392.png',
          title: 'Card image'
        },
        cta: {
          href: "#",
          name: "Button"
        }
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1280x392.png',
          title: 'Card image'
        },
        cta: {
          href: "#",
          name: "Button",
          buttonType: "button-primary"
        }
      },
      {
        promoTitle: 'Título 3',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1280x392.png',
          title: 'Card image'
        },
        cta: {
          href: "#",
          name: "Button",
          buttonType: "button-secondary"
        }
      }
    ]
  },
  view: {
    columnsSize: 3
  }
};
const dataPortrait: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection:
  {
    items: [
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1220x2030.png',
          title: 'Card image'
        },
        cta: {
          href: "#",
          name: "Button"
        }
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1220x2030.png',
          title: 'Card image'
        },
        cta: {
          href: "#",
          name: "Button",
          buttonType: "button-primary"
        }
      },
      {
        promoTitle: 'Título 3',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1220x2030.png',
          title: 'Card image'
        },
        cta: {
          href: "#",
          name: "Button",
          buttonType: "button-secondary"
        }
      }
    ]
  },
  view: {
    imageOrientation: 'Portrait',
    columnsSize: 3
  }
};

export const mockVerticalCardProps = {
  data,
  dataPortrait
};
