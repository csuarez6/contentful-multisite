import { ComponentStory, ComponentMeta } from '@storybook/react';
import HomeTemplate, { IHomeTemplate } from './HomeTemplate';
import { mockHomeTemplateProps } from './HomeTemplate.mocks';

export default {
  title: 'templates/HomeTemplate',
  component: HomeTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an home template component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof HomeTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HomeTemplate> = (args) => (
    <HomeTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHomeTemplateProps.data,
} as IHomeTemplate;
