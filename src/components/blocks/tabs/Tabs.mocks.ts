import { ITabBlock } from "@/lib/interfaces/tabs-cf-interface";

const dataTab: ITabBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  tabs: [
    {
      name: 'Tab 0',
      href: '#'
    },
    {
      name: 'Tab 1',
      href: '#'
    },
    {
      name: 'Tab 2',
      href: '#'
    },
    {
      name: 'Tab 3',
      href: '#'
    }
  ]
};

const dataTabSecondary: ITabBlock = {
  title: 'Título',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  isSecondary: true,
  tabs: [
    {
      name: 'Tab 0',
      href: '#'
    },
    {
      name: 'Tab 1',
      href: '#'
    },
    {
      name: 'Tab 2',
      href: '#'
    },
    {
      name: 'Tab3',
      href: '#'
    }
  ]
};

export const mockTabsProps = {
  dataTab,
  dataTabSecondary
};
