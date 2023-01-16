import { ComponentStory, ComponentMeta } from '@storybook/react';
import BannerSlider from './BannerSlider';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockBannerSliderProps } from './BannerSlider.mocks';

export default {
  title: 'blocks/BannerSlider',
  component: BannerSlider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof BannerSlider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BannerSlider> = (args) => (
    <BannerSlider {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBannerSliderProps.data,
} as IPromoBlock;
