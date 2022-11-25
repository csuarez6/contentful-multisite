import { IHeader } from '@/lib/interfaces/header-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HeaderBlock from './HeaderBlock';
import { mockHeaderBlockProps } from './HeaderBlock.mocks';

export default {
  title: 'blocks/HeaderBlock',
  component: HeaderBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof HeaderBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderBlock> = (args) => (
    <HeaderBlock {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHeaderBlockProps.data,
} as IHeader;
