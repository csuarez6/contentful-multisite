import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Lorem ipsum dolor',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedContent: [
    {
      promoTitle: 'Título',
      promoDescription: 'Lorem ipsum dolor sit amet.',
      promoIcon: 'dialogs'
    },
    {
      promoTitle: 'Título 1',
      promoDescription: 'Lorem ipsum dolor sit amet.',
      promoIcon: 'experience'
    },
    {
      promoTitle: 'Título 2',
      promoDescription: 'Lorem ipsum dolor sit amet.',
      promoIcon: 'assists'
    },
  ]
};

export const mockInfoCardProps = {
  data,
};