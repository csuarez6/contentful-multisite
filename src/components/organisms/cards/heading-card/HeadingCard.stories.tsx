import { ComponentStory, ComponentMeta } from '@storybook/react';
import HeadingCard from './HeadingCard';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockHeadingCardProps } from './HeadingCard.mocks';

export default {
  title: 'organisms/cards/HeadingCard',
  component: HeadingCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof HeadingCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeadingCard> = (args) => (
  <HeadingCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHeadingCardProps.data,
} as IPromoContent;
