import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExampleComponent, { IExampleComponent } from './ExampleComponent';
import { mockExampleComponentProps } from './ExampleComponent.mocks';

export default {
  title: 'examples/ExampleComponent',
  component: ExampleComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ExampleComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ExampleComponent> = (args) => (
    <ExampleComponent {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockExampleComponentProps.data,
} as IExampleComponent;
