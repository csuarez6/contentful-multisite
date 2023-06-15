import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
  view: {
    columnsSize: 3
  },
  ctaCollection: {
    items: [
      {
        promoTitle: "internalLink",
        internalLink: {
          urlPaths: ["#"]
        }
      }
    ]
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Conocelós",
        internalLink: {
          urlPaths: ["#"]
        }
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Conocelós",
        externalLink: "#"
      },
      {
        promoTitle: 'Título 3',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Conocelós",
        internalLink: {
          urlPaths: ["#"]
        }
      },
      {
        promoTitle: 'Título 4',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Conocelós",
        internalLink: {
          urlPaths: ["#"]
        }
      },
      {
        promoTitle: 'Título 5',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Conocelós",
        externalLink: "#"
      },
      {
        promoTitle: 'Título 6',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Conocelós",
        internalLink: {
          urlPaths: ["#"]
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
        ctaLabel: "Conocelós",
        externalLink: "#"
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
  ctaCollection: {
    items: [
      {
        promoTitle: "Conocelós",
        externalLink: "#"
      }
    ]
  },
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        ctaLabel: "Conocelós",
        externalLink: "#"
      }
    ]
  }
};

export const mockInformativeGridProps = {
  data,
  dataSecondary,
  dataTetiary
};
