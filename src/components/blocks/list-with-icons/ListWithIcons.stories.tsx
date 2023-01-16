import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListWithIcons from './ListWithIcons';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockListWithIconsProps } from './ListWithIcons.mocks';

export default {
  title: 'blocks/ListWithIcon',
  component: ListWithIcons,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ListWithIcons>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListWithIcons> = (args) => (
  <ListWithIcons {...args} />
);

export const Base = Template.bind({});
export const Left = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockListWithIconsProps.data,
} as IPromoBlock;

Left.args = {
  ...mockListWithIconsProps.dataLeft,
} as IPromoBlock;
