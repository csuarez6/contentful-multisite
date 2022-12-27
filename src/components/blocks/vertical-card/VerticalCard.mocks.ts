import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  listedContent: [
    {
      title: 'Título 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      image: {
        url: 'https://via.placeholder.com/588x180.png',
        title: 'Card image'
      },
      cta: {
        href: "#",
        name: "Button"
      }
    },
    {
      title: 'Título 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      image: {
        url: 'https://via.placeholder.com/588x180.png',
        title: 'Card image'
      },
      cta: {
        href: "#",
        name: "Button",
        buttonType: "button-primary"
      }
    },
    {
      title: 'Título 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      image: {
        url: 'https://via.placeholder.com/588x180.png',
        title: 'Card image'
      },
      cta: {
        href: "#",
        name: "Button",
        buttonType: "button-secondary"
      }
    }
  ],
  columnsNumber: 3
};

export const mockVerticalCardProps = {
  data,
};
