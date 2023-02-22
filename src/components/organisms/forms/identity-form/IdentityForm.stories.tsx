import { ComponentStory, ComponentMeta } from '@storybook/react';
import IdentityForm from './IdentityForm'; 
import { IFormBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockIdentityFormProps } from './IdentityForm.mocks';

export default {
  title: 'organisms/forms/IdentityForm',
  component: IdentityForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof IdentityForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IdentityForm> = (args) => (
    <IdentityForm {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockIdentityFormProps.data,
} as IFormBlock;
