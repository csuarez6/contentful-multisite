import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExampleIcons, { IExampleIcons } from './ExampleIcons';
import { mockExampleIconsProps } from './ExampleIcons.mocks';

export default {
  title: 'examples/Icons',
  component: ExampleIcons,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ExampleIcons>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ExampleIcons> = (args) => (
    <ExampleIcons {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockExampleIconsProps.data,
} as IExampleIcons;
