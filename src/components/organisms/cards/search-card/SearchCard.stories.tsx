import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchCard from './SearchCard';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockSearchCardProps } from './SearchCard.mocks';

export default {
  title: 'organisms/cards/SearchCard',
  component: SearchCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof SearchCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchCard> = (args) => (
  <SearchCard {...args} />
);

export const Base = Template.bind({});
export const WithButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSearchCardProps.data,
} as IPromoContent;

WithButton.args = {
  ...mockSearchCardProps.dataWithButton,
} as IPromoContent;
