import { ComponentStory, ComponentMeta } from '@storybook/react';
import CarouselCategories from './CarouselCategories';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockCarouselCategoriesProps } from './CarouselCategories.mocks';

export default {
  title: 'organisms/CarouselCategories',
  component: CarouselCategories,
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

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCarouselCategoriesProps.data,
} as IPromoContent;
