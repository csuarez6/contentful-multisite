import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListWithIcons from './ListWithIcons';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockListWithIconsProps } from './ListWithIcons.mocks';

export default {
  title: 'organisms/ListWithIcons',
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
export const LeftIcon = Template.bind({});
export const LeftIconRounded = Template.bind({});
export const LeftIconNoTitle = Template.bind({});
export const LeftIconNoDescription = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockListWithIconsProps.data,
} as IPromoContent;

LeftIcon.args = {
  ...mockListWithIconsProps.iconLeft,
} as IPromoContent;

LeftIconRounded.args = {
  ...mockListWithIconsProps.iconLeftRounded,
} as IPromoContent;

LeftIconNoTitle.args = {
  ...mockListWithIconsProps.iconLeftNoTitle,
} as IPromoContent;

LeftIconNoDescription.args = {
  ...mockListWithIconsProps.iconLeftNoDescription,
} as IPromoContent;