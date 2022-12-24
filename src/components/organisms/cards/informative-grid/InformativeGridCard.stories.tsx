import { ComponentStory, ComponentMeta } from '@storybook/react';
import InformativeGridCard from './InformativeGridCard';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockInformativeGridCardProps } from './InformativeGridCard.mocks';

export default {
  title: 'organisms/cards/InformativeGridCard',
  component: InformativeGridCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof InformativeGridCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InformativeGridCard> = (args) => (
    <InformativeGridCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInformativeGridCardProps.data,
} as IPromoContent;
