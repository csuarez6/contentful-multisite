import { ComponentStory, ComponentMeta } from '@storybook/react';
import RichText from './Richtext';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockRichTextProps } from './RichText.mocks';

export default {
  title: 'organisms/RichText',
  component: RichText,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof RichText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RichText> = (args) => (
  <RichText {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockRichTextProps.data,
} as IPromoContent;

