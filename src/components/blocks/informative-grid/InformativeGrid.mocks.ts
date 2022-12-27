import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  columnsNumber: 3,
  cta: {
    name: 'button',
    list: [{
      href: '#',
      name: 'Button'
    }]
  },
  listedContent: [
    {
      promoTitle: 'Título 1',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      promoTitle: 'Título 2',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      promoTitle: 'Título 3',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      promoTitle: 'Título 4',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      promoTitle: 'Título 5',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      promoTitle: 'Título 6',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    }
  ]
};

const dataSecondary: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  columnsNumber: 2,
  listedContent: [
    {
      promoTitle: 'Título 1',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      promoTitle: 'Título 2',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: '#',
        name: 'Conocelós'
      }
    }
  ]
};

const dataTetiary: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  columnsNumber: 1,
  cta: {
    name: 'Button',
    list: [{
      href: '#',
      name: 'Conocelós'
    }]
  },
  listedContent: [
    {
      promoTitle: 'Título',
      promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    }
  ]
};

export const mockInformativeGridProps = {
  data,
  dataSecondary,
  dataTetiary
};
