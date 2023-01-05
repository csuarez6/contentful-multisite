import { ComponentStory, ComponentMeta } from '@storybook/react';
import ServicesTabs from './ServicesTabs';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockServicesTabsProps } from './ServicesTabs.mocks';

export default {
  title: 'blocks/ServicesTabs',
  component: ServicesTabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ServicesTabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ServicesTabs> = (args) => (
    <ServicesTabs {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockServicesTabsProps.data,
} as IPromoBlock;
