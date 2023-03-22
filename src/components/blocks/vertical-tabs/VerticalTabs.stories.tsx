import { ComponentStory, ComponentMeta } from '@storybook/react';
import VerticalTabs from './VerticalTabs';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockVerticalTabsProps } from './VerticalTabs.mocks';

export default {
  title: 'blocks/VerticalTabs',
  component: VerticalTabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof VerticalTabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VerticalTabs> = (args) => (
  <VerticalTabs {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockVerticalTabsProps.data,
} as IPromoBlock;
