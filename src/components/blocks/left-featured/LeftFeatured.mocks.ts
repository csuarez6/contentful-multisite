import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";

const data: IPromoBlock = {
  title: 'Título',
  pretitle: 'Pretítulo',
  subtitle: 'Subtítulo',
  description: RICHTEXT_SHORT_SIMPLE,
  image: {
    url: 'https://via.placeholder.com/1280x1050.png',
    title: "PromoImage",
    width: 1280,
    height: 1050
  },
  ctaCollection: {
    items: [
      {
        name: "CtaButton1",
        externalLink: '#',
        ctaLabel: 'Button'
      },
      {
        name: "CtaButton2",
        externalLink: '#',
        ctaLabel: 'Button'
      }
    ]
  }
};

const dataRounded: IPromoBlock = {
  title: 'Título',
  pretitle: 'Pretítulo',
  subtitle: 'Subtítulo',
  description: RICHTEXT_SHORT_SIMPLE,
  image: {
    url: 'https://via.placeholder.com/1280x1050.png',
    title: "PromoImage",
    width: 1280,
    height: 1050
  },
  ctaCollection: {
    items: [
      {
        name: "CtaButton1",
        externalLink: '#',
        ctaLabel: 'Button'
      },
      {
        name: "CtaButton2",
        externalLink: '#',
        ctaLabel: 'Button'
      }
    ]
  },
  view: {
    roundedImage: true
  }
};

const dataRoundedReverse: IPromoBlock = {
  title: 'Título',
  pretitle: 'Pretítulo',
  subtitle: 'Subtítulo',
  description: RICHTEXT_SHORT_SIMPLE,
  image: {
    url: 'https://via.placeholder.com/1280x1050.png',
    title: "PromoImage",
    width: 1280,
    height: 1050
  },
  ctaCollection: {
    items: [
      {
        name: "CtaButton1",
        externalLink: '#',
        ctaLabel: 'Button'
      },
      {
        name: "CtaButton2",
        externalLink: '#',
        ctaLabel: 'Button'
      }
    ]
  },
  view: {
    roundedImage: true,
    imageAlign: "Derecha"
  }
};

export const mockLeftFeaturedProps = {
  data,
  dataRounded,
  dataRoundedReverse
};
