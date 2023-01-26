import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignUpFormBlock from './SignUpFormBlock';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockSignUpFormBlockProps } from './SignUpFormBlock.mocks';

export default {
  title: 'blocks/SignUpFormBlock',
  component: SignUpFormBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof SignUpFormBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignUpFormBlock> = (args) => (
  <SignUpFormBlock {...args} />
);

export const Base = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSignUpFormBlockProps.data,
} as IPromoBlock;
