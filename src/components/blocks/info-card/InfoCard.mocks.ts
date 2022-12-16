import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Lorem ipsum dolor',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedContent: [
    {
      title: 'Título',
      description: 'Lorem ipsum dolor sit amet.',
      icon: 'dialogs'
    },
    {
      title: 'Título 1',
      description: 'Lorem ipsum dolor sit amet.',
      icon: 'experience'
    },
    {
      title: 'Título 2',
      description: 'Lorem ipsum dolor sit amet.',
      icon: 'assists'
    },
  ]
};

export const mockInfoCardProps = {
  data,
};