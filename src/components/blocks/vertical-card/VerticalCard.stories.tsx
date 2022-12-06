import { ComponentStory, ComponentMeta } from '@storybook/react';
import VerticalCard from './VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockVerticalCardProps } from './VerticalCard.mocks';

export default {
  title: 'blocks/VerticalCard',
  component: VerticalCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof VerticalCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VerticalCard> = (args) => (
    <VerticalCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockVerticalCardProps.data,
} as IPromoBlock;
