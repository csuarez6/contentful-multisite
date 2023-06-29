import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spinner, { ISpinner } from './Spinner';
import {  mockSpinnerProps } from './Spinner.mocks';

export default {
  title: 'atoms/Spinner',
  component: Spinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof Spinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Spinner> = (args) => (
    <Spinner {...args} />
);

export const Base = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSpinnerProps.data,
} as ISpinner;

Large.args = {
  ...mockSpinnerProps.large,
} as ISpinner;

Medium.args = {
  ...mockSpinnerProps.medium,
} as ISpinner;