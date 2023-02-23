import { RICHTEXT_SHORT_SIMPLE, RICHTEXT_WITH_IMAGE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data1Column: IPromoBlock = {
  description: RICHTEXT_SHORT_SIMPLE,
  title: 'Lorem Ipsum Dolor',
  view: {
    isReverse: true,
    columnsSize: 1
  },
  featuredContentsCollection: {
    items: [
      {
        subtitle: 'Plan 0',
        promoTitle: '$20.000',
        promoDescription: RICHTEXT_WITH_IMAGE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 1',
        tags: [
          {
            label: 'Vanti listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoTitle: '$50.000',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        subtitle: 'Plan 2',
        promoTitle: '$25.000',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 3',
        promoTitle: '$50.000',
        promoDescription: RICHTEXT_WITH_IMAGE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 4',
        promoTitle: '$75.000',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 5',
        promoTitle: '$50.000',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        tags: [
          {
            label: 'Vanti listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      }
    ]
  }
};

const data2Column: IPromoBlock = {
  description: RICHTEXT_SHORT_SIMPLE,
  title: 'Lorem Ipsum Dolor',
  view: {
    isReverse: false,
    columnsSize: 2
  },
  featuredContentsCollection: {
    items: [
      {
        subtitle: 'Plan 0',
        promoTitle: '$20.000',
        promoDescription: RICHTEXT_WITH_IMAGE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 1',
        promoTitle: '$50.000',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 2',
        promoTitle: '$25.000',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 3',
        promoTitle: '$50.000',
        promoDescription: RICHTEXT_WITH_IMAGE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 4',
        promoTitle: '$75.000',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      },
      {
        subtitle: 'Plan 5',
        promoTitle: '$50.000',
        promoDescription: RICHTEXT_WITH_IMAGE,
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        },
        linkView: "Modal",
        ctaLabel: "Abrir modal"
      }
    ]
  }
};

export const mockPlanCardGridProps = {
  data1Column,
  data2Column
};