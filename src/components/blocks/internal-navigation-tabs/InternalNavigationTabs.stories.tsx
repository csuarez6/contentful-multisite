import { ComponentStory, ComponentMeta } from '@storybook/react';
import InternalNavigationTabs from './InternalNavigationTabs';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockInternalNavigationTabsProps } from './InternalNavigationTabs.mocks';

export default {
  title: 'blocks/InternalNavigationTabs',
  component: InternalNavigationTabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof InternalNavigationTabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InternalNavigationTabs> = (args) => (
  <InternalNavigationTabs {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInternalNavigationTabsProps.data,
} as IPromoBlock;
