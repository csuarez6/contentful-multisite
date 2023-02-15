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
        promoIcon: 'dialogs'
      },
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'experience'
      },
      {
        promoTitle: 'Título 2',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'assists'
      },
    ]
  },
  view: {
    buttonType: "",
    backgroundColor: ""
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
          urlPath: "#"
        }
      },
      {
        promoTitle: 'Título 1',
        promoDescription: RICHTEXT_SHORT_SIMPLE,
        promoIcon: 'experience',
        ctaLabel: "Card 2",
        internalLink: {
          urlPath: "#"
        }
      }
    ]
  },
  view: {
    alignTitle: "left",
    backgroundColor: "Azul Claro",
    showButton: true
  }
};

export const mockInfoCardProps = {
  data,
  left
};