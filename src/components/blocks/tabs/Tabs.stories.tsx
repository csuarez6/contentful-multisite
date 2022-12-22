import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ITabBlock } from "@/lib/interfaces/tabs-cf.interface";
import Tabs from './Tabs';
import { mockTabsProps } from './Tabs.mocks';

export default {
  title: 'blocks/Tabs',
  component: Tabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof Tabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args} />
);

export const Base = Template.bind({});
export const TabSecondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTabsProps.dataTab,
} as ITabBlock;

TabSecondary.args = {
  ...mockTabsProps.dataTabSecondary,
} as ITabBlock;
