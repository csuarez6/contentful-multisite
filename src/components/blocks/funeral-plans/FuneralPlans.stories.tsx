import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FuneralPlans from './FuneralPlans';
import { mockFuneralPlansProps } from './FuneralPlans.mocks';

export default {
  title: 'blocks/FuneralPlans',
  component: FuneralPlans,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof FuneralPlans>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FuneralPlans> = (args) => (
  <FuneralPlans {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFuneralPlansProps.data,
} as IPromoBlock;