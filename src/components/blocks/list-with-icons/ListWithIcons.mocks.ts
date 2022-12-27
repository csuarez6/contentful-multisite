import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedContent: [
    {
      promoTitle: 'Title',
      promoIcon: 'invoice-filled',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'top',
      cta: {
        href: '#',
        name: 'button'
      }
    },
    {
      promoTitle: 'Title',
      promoIcon: 'invoice-filled',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'top',
      cta: {
        href: '#',
        name: 'button'
      }
    },
    {
      promoTitle: 'Title',
      promoIcon: 'invoice-filled',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'top',
      cta: {
        href: '#',
        name: 'button'
      }
    }
  ]
};

export const mockListWithIconsProps = {
  data,
};
