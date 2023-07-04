import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContentPageBlock from './ContentPageBlock';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockContentPageBlockProps } from './ContentPageBlock.mocks';

export default {
  title: 'blocks/ContentPageBlock',
  component: ContentPageBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ContentPageBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentPageBlock> = (args) => (
  <ContentPageBlock {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockContentPageBlockProps.data,
} as IPromoBlock;