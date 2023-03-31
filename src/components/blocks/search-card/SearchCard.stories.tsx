import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchCard from './SearchCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockSearchCardProps } from './SearchCard.mocks';

export default {
  title: 'blocks/SearchCard',
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
export const LeftTitle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSearchCardProps.data,
} as IPromoBlock;

LeftTitle.args = {
  ...mockSearchCardProps.left,
} as IPromoBlock;
