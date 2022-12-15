import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedContent: [
    {
      title: 'Title',
      icon: 'invoice-filled',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'top',
      url: '#',
      ctaLabel: 'button'
    },
    {
      title: 'Title',
      icon: 'invoice-filled',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'top',
      url: '#',
      ctaLabel: 'button'
    },
    {
      title: 'Title',
      icon: 'invoice-filled',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'top',
      url: '#',
      ctaLabel: 'button'
    }
  ]
};

export const mockListWithIconsProps = {
  data,
};
