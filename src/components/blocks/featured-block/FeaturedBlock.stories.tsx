import { ComponentStory, ComponentMeta } from '@storybook/react';
import FeaturedBlock from './FeaturedBlock';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockFeaturedBlockProps } from './FeaturedBlock.mocks';

export default {
  title: 'blocks/FeaturedBlock',
  component: FeaturedBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof FeaturedBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeaturedBlock> = (args) => (
  <FeaturedBlock {...args} />
);

export const Base = Template.bind({});
export const ImageRight = Template.bind({});
export const ColumnsSize = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFeaturedBlockProps.data,
} as IPromoBlock;

ImageRight.args = {
  ...mockFeaturedBlockProps.dataImageRight,
} as IPromoBlock;

ColumnsSize.args = {
  ...mockFeaturedBlockProps.dataListedColumns,
} as IPromoBlock;