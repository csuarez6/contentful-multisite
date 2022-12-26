import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea .',
  image: {
    url: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    title: 'featuredView'
  },
  cta: {
    name: 'buttons',
    list: [
      {
        name: 'button',
        href: '#'
      },
      {
        name: 'button external',
        href: '#',
        isExternal: true
      }
    ]
  },
  listedContent: [
    {
      icon: 'chat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      bgIconRounded: 'bg-blue-dark',
      iconColor: 'text-white',
      iconSize: 'small',
    },
    {
      icon: 'chat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      bgIconRounded: 'bg-blue-dark',
      iconColor: 'text-white',
      iconSize: 'small',
    },
    {
      icon: 'chat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      bgIconRounded: 'bg-blue-dark',
      iconColor: 'text-white',
      iconSize: 'small',
    }
  ]
};

const dataImageRight: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea .',
  alignImage: 'right',
  image: {
    url: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    title: 'featuredView'
  },
  cta: {
    name: 'buttons',
    list: [
      {
        name: 'button',
        href: '#'
      }
    ]
  },
  listedContent: [
    {
      icon: 'chat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'left',
      bgIconRounded: 'bg-blue-dark',
      iconColor: 'text-white',
      iconSize: 'small',
    },
    {
      icon: 'chat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'left',
      bgIconRounded: 'bg-blue-dark',
      iconColor: 'text-white',
      iconSize: 'small',
    },
    {
      icon: 'chat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      iconPosition: 'left',
      bgIconRounded: 'bg-blue-dark',
      iconColor: 'text-white',
      iconSize: 'small',
    }
  ]
};

const dataListedColumns: IPromoBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea .',
  alignImage: 'right',
  image: {
    url: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    title: 'featuredView'
  },
  cta: {
    name: 'buttons',
    list: [
      {
        name: 'button',
        href: '#'
      }
    ]
  },
  columnsNumber: 3,
  listedContent: [
    {
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'left',
      iconSize: 'small',
    },
    {
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'left',
      iconSize: 'small',
    },
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      iconPosition: 'left',
      iconSize: 'small',
    },
    {
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'left',
      iconSize: 'small',
    },
    {
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      iconPosition: 'left',
      iconSize: 'small',
    },
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      iconPosition: 'left',
      iconSize: 'small',
    }
  ]
};

export const mockFeaturedBlockProps = {
  data,
  dataImageRight,
  dataListedColumns
};