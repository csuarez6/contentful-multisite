import { ComponentStory, ComponentMeta } from '@storybook/react';
import OrderCard from './OrderCard';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockOrderCardProps } from './OrderCard.mocks';

export default {
  title: 'organisms/cards/OrderCard',
  component: OrderCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof OrderCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OrderCard> = (args) => (
  <OrderCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockOrderCardProps.data,
} as IPromoContent;
