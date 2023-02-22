import { ComponentStory, ComponentMeta } from '@storybook/react';
import InquiryForm from './InquiryForm';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockInquiryFormsProps } from './InquiryForm.mocks';

export default {
  title: 'blocks/InquiryForm',
  component: InquiryForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof InquiryForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InquiryForm> = (args) => (
    <InquiryForm {...args} />
);

export const RPO = Template.bind({});
export const Vantilisto = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

RPO.args = {
  ...mockInquiryFormsProps.dataRPO,
} as IPromoBlock;

Vantilisto.args = {
  ...mockInquiryFormsProps.dataVantilisto,
} as IPromoBlock;
