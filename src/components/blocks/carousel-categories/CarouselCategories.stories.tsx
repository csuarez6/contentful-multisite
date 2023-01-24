import { ComponentStory, ComponentMeta } from '@storybook/react';
import CarouselCategories from './CarouselCategories';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockCarouselCategoriesProps } from './CarouselCategories.mocks';

export default {
  title: 'blocks/CarouselCategories',
  component: CarouselCategories,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof CarouselCategories>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CarouselCategories> = (args) => (
    <CarouselCategories {...args} />
);

export const Left = Template.bind({});
export const Top = Template.bind({});
export const Static = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Left.args = {
  ...mockCarouselCategoriesProps.data,
} as IPromoBlock;

Top.args = {
  ...mockCarouselCategoriesProps.dataTop,
} as IPromoBlock;

Static.args = {
  ...mockCarouselCategoriesProps.dataStatic,
} as IPromoBlock;
