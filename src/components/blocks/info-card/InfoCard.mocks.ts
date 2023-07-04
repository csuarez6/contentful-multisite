import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Lorem ipsum dolor',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'dialogs',
        sys: {
          id: '70947823727800'
        }
      },
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'experience',
        sys: {
          id: '70937823727804'
        }
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'assists',
        sys: {
          id: '70947823997804'
        }
      },
    ]
  },
  view: {
    alignTitle: "Centrado",
  }
};

const fourColums: IPromoBlock = {
  title: 'Lorem ipsum dolor',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'dialogs',
        sys: {
          id: '70947823727800'
        }
      },
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'experience',
        sys: {
          id: '70937823727804'
        }
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'assists',
        sys: {
          id: '70947823997804'
        }
      },
      {
        promoTitle: 'Título 3',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'dialogs',
        sys: {
          id: '70947823727800'
        }
      },
      {
        promoTitle: 'Título 4',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'experience',
        sys: {
          id: '70937823727804'
        }
      },
      {
        promoTitle: 'Título 5',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'assists',
        sys: {
          id: '70947823997804'
        }
      },
    ]
  },
  view: {
    alignTitle: "Centrado",
    columnsSize: 4
  }
};

const left: IPromoBlock = {
  title: 'Lorem ipsum dolor',
  description: RICHTEXT_SHORT_SIMPLE,
  featuredContentsCollection: {
    items: [
      {
        promoTitle: 'Título',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'dialogs',
        ctaLabel: "Card 1",
        internalLink: {
          urlPaths: ["#"]
        },
        sys: {
          id: '70947823727834'
        }
      },
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'experience',
        ctaLabel: "Card 2",
        internalLink: {
          urlPaths: ["#"]
        },
        sys: {
          id: '70947823727804'
        }
      }
    ]
  },
  view: {
    alignTitle: "Izquierda",
    backgroundColor: "Azul Claro",
    showButton: true
  }
};

export const mockInfoCardProps = {
  data,
  fourColums,
  left
};