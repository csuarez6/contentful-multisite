import { ComponentStory, ComponentMeta } from '@storybook/react';
import LeftFeatured from './LeftFeatured';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockLeftFeaturedProps } from './LeftFeatured.mocks';

export default {
  title: 'blocks/LeftFeatured',
  component: LeftFeatured,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof LeftFeatured>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LeftFeatured> = (args) => (
    <LeftFeatured {...args} />
);

export const Base = Template.bind({});
export const RoundedImage = Template.bind({});
export const RoundedImageReverse = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockLeftFeaturedProps.data,
} as IPromoBlock;

RoundedImage.args = {
  ...mockLeftFeaturedProps.dataRounded,
} as IPromoBlock;

RoundedImageReverse.args = {
  ...mockLeftFeaturedProps.dataRoundedReverse,
} as IPromoBlock;
