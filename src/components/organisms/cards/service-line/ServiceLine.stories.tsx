import { ComponentStory, ComponentMeta } from '@storybook/react';
import ServiceLine from './ServiceLine';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockServiceLineProps } from './ServiceLine.mocks';

export default {
  title: 'organisms/cards/ServiceLine',
  component: ServiceLine,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ServiceLine>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ServiceLine> = (args) => (
    <ServiceLine {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockServiceLineProps.data,
} as IPromoContent;
