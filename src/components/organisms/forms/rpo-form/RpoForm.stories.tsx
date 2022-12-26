import { ComponentStory, ComponentMeta } from '@storybook/react';
import RpoForm from './RpoForm'; 
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockRpoFormsProps } from './RpoForm.mocks';

export default {
  title: 'organisms/forms/RpoForm',
  component: RpoForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof RpoForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RpoForm> = (args) => (
    <RpoForm {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockRpoFormsProps.data,
} as IPromoContent;
