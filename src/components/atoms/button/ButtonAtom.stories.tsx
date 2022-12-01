import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonAtom, { IButtonAtom } from './ButtonAtom';
import { mockButtonAtomProps } from './ButtonAtom.mocks';

export default {
  title: 'atoms/ButtonAtom',
  component: ButtonAtom,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ButtonAtom>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonAtom> = (args) => (
    <ButtonAtom {...args} />
);

export const Base = Template.bind({});
export const Button = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockButtonAtomProps.dataLink,
} as IButtonAtom;

Button.args = {
  ...mockButtonAtomProps.dataButton,
} as IButtonAtom;
