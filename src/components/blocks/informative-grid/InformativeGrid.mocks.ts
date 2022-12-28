import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    columnsSize: 3
  },
  cta: {
    name: 'button',
    list: [{
      href: '#',
      name: 'Button'
    }]
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: "#",
          name: "conocelós"
        }
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: "#",
          name: "conocelós"
        }
      },
      {
        promoTitle: 'Título 3',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: "#",
          name: "conocelós"
        }
      },
      {
        promoTitle: 'Título 4',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: "#",
          name: "conocelós"
        }
      },
      {
        promoTitle: 'Título 5',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: "#",
          name: "conocelós"
        }
      },
      {
        promoTitle: 'Título 6',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: "#",
          name: "conocelós"
        }
      }
    ]
  }
};

const dataSecondary: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    columnsSize: 2
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: '#',
          name: 'Conocelós'
        }
      }
    ]
  }
};

const dataTetiary: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    columnsSize: 1
  },
  cta: {
    name: 'Button',
    list: [{
      href: '#',
      name: 'Conocelós'
    }]
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        cta: {
          href: "#",
          name: "conocelós"
        }
      }
    ]
  }
};

export const mockInformativeGridProps = {
  data,
  dataSecondary,
  dataTetiary
};
