import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExampleGradients, { IExampleGradients } from './ExampleGradients';
import { mockExampleGradientsProps } from './ExampleGradients.mocks';

export default {
  title: 'examples/ExampleGradients',
  component: ExampleGradients,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ExampleGradients>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ExampleGradients> = (args) => (
    <ExampleGradients {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockExampleGradientsProps.data,
} as IExampleGradients;
