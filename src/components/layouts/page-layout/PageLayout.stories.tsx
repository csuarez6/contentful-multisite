import { IPage } from '@/lib/interfaces/page-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PageLayout from './PageLayout';
import { mockPageLayoutProps } from './PageLayout.mocks';

export default {
  title: 'layouts/PageLayout',
  component: PageLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'General layout for pages that supports blocks.',
      },
    },
  },
} as ComponentMeta<typeof PageLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PageLayout> = (args) => (
    <PageLayout {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPageLayoutProps.data,
} as IPage;
