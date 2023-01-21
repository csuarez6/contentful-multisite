import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignInFormBlock from './SignInFormBlock';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockSignInFormBlockProps } from './SignInFormBlock.mocks';

export default {
  title: 'blocks/SignInFormBlock',
  component: SignInFormBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof SignInFormBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignInFormBlock> = (args) => (
    <SignInFormBlock {...args} />
);

export const Base = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSignInFormBlockProps.data,
} as IPromoBlock;
