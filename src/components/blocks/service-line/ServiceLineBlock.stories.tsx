import { ComponentStory, ComponentMeta } from '@storybook/react';
import ServiceLineBlock from './ServiceLineBlock';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockServiceLineProps } from './ServiceLineBlock.mocks';

export default {
  title: 'blocks/ServiceLineBlock',
  component: ServiceLineBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ServiceLineBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ServiceLineBlock> = (args) => (
    <ServiceLineBlock {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockServiceLineProps.data,
} as IPromoBlock;
