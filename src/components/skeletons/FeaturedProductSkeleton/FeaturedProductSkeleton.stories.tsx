import { ComponentStory, ComponentMeta } from '@storybook/react';
import FeaturedProductBlockSkeleton from './FeaturedProductSkeleton';

export default {
  title: 'skeletons/FeaturedProductSkeleton',
  component: FeaturedProductBlockSkeleton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an skeleton component for FeaturedProductBlock',
      },
    },
  },
} as ComponentMeta<typeof FeaturedProductBlockSkeleton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeaturedProductBlockSkeleton> = () => (
    <FeaturedProductBlockSkeleton />
);

export const Base = Template.bind({});
