import { RICHTEXT_SHORT_SIMPLE } from "@/constants/mocks.constants";
import { ITabBlock } from "@/lib/interfaces/tabs-cf.interface";

const dataTab: ITabBlock = {
  title: 'Título',
  description: RICHTEXT_SHORT_SIMPLE,
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
  description: RICHTEXT_SHORT_SIMPLE,
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
