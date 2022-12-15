import { ITabBlock } from "@/lib/interfaces/tabs-cf-interface";

const dataTab: ITabBlock = {
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
