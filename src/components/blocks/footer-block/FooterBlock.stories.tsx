import { INavigation } from '@/lib/interfaces/menu-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FooterBlock from './FooterBlock';
import { mockFooterBlockProps } from './FooterBlock.mocks';

export default {
  title: 'blocks/FooterBlock',
  component: FooterBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof FooterBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FooterBlock> = (args) => (
    <FooterBlock {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFooterBlockProps.data,
} as INavigation;
