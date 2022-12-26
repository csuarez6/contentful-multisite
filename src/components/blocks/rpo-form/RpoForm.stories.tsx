import { ComponentStory, ComponentMeta } from '@storybook/react';
import RpoForm from './RpoForm';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockRpoFormProps } from './RpoForm.mocks';

export default {
  title: 'blocks/RpoForm',
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
  ...mockRpoFormProps.data,
} as IPromoBlock;
