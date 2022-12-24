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
      title: 'Título 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      title: 'Título 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      title: 'Título 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      title: 'Título 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      title: 'Título 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
      cta: {
        href: "#",
        name: "conocelós"
      }
    },
    {
      title: 'Título 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
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
      title: 'Título 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Título 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
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
      title: 'Título',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
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
