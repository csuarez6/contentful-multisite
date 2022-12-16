import { ComponentStory, ComponentMeta } from '@storybook/react';
import Infocard from './InfoCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockInfoCardProps } from './InfoCard.mocks';

export default {
  title: 'blocks/InfoCard',
  component: Infocard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof Infocard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Infocard> = (args) => (
    <Infocard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInfoCardProps.data,
} as IPromoBlock;
