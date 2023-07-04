import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductDetailsLayoutSkeleton from './ProductDetailsLayoutSkeleton';

export default {
  title: 'skeletons/FeaturedProductSkeleton',
  component: ProductDetailsLayoutSkeleton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an skeleton component for FeaturedProductBlock',
      },
    },
  },
} as ComponentMeta<typeof ProductDetailsLayoutSkeleton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductDetailsLayoutSkeleton> = () => (
    <ProductDetailsLayoutSkeleton />
);

export const Base = Template.bind({});
