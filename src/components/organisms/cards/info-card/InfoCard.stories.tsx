import { ComponentStory, ComponentMeta } from '@storybook/react';
import InfoCard from './InfoCard';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockInfoCardProps } from './InfoCard.mocks';

export default {
  title: 'organisms/cards/InfoCard',
  component: InfoCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof InfoCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InfoCard> = (args) => (
    <InfoCard {...args} />
);

export const Base = Template.bind({});
export const WithButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInfoCardProps.data,
} as IPromoContent;

WithButton.args = {
  ...mockInfoCardProps.dataWithButton,
} as IPromoContent;
