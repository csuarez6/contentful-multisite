import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductCard from './ProductSmallCard';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockProductCardProps } from './ProductSmallCard.mocks';

export default {
  title: 'organisms/cards/ProductSmallCard',
  component: ProductCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ProductCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductCard> = (args) => (
    <ProductCard {...args} />
);

export const Base = Template.bind({});
export const Portrait = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockProductCardProps.data,
} as IPromoContent;

Portrait.args = {
  ...mockProductCardProps.dataPortrait,
} as IPromoContent;
