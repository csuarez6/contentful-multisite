import { IPage } from '@/lib/interfaces/page-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FuneralPlansTemplate from './FuneralPlans';
import { mockFuneralPlansTemplateProps } from './FuneralPlans.mocks';

export default {
  title: 'templates/FuneralPlans',
  component: FuneralPlansTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an FuneralPlans template component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof FuneralPlansTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FuneralPlansTemplate> = (args) => (
    <FuneralPlansTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFuneralPlansTemplateProps.data,
} as IPage;
