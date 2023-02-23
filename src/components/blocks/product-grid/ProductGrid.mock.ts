import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data1Column: IPromoBlock = {
  description: RICHTEXT_SHORT_SIMPLE,
  title: 'Lorem Ipsum Dolor',
  view:{
    isReverse: true,
    columnsSize: 1
  },
  featuredContentsCollection: {
    items: [
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
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
  view:{
    isReverse: false,
    columnsSize: 2
  },
  featuredContentsCollection: {
    items: [
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          },
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      },
      {
        tags: [
          {
            label: 'Vanti Listo',
          },
          {
            label: 'Factura de gas',
          }
        ],
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        subtitle: 'Plan 40.000',
        promoTitle: 'Lorem Ipsum',
        promoImage: {
          url: 'https://via.placeholder.com/1024',
          title: 'Plan card'
        }
      }
    ]
  }
};

export const mockProductGridProps = {
  data1Column,
  data2Column
};
