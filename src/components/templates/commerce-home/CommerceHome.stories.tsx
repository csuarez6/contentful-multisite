import { IPage } from '@/lib/interfaces/page-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommerceHomeTemplate from './CommerceHome';
import { mockCommerceHomeTemplateProps } from './CommerceHome.mocks';

export default {
  title: 'templates/CommerceHome',
  component: CommerceHomeTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an CommerceHome template component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof CommerceHomeTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CommerceHomeTemplate> = (args) => (
    <CommerceHomeTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCommerceHomeTemplateProps.data,
} as IPage;
