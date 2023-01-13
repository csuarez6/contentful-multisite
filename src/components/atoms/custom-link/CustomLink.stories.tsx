import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomLink, { ICustomLink } from './CustomLink';
import { mockCustomLinkProps } from './CustomLink.mocks';

export default {
  title: 'atoms/CustomLink',
  component: CustomLink,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof CustomLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomLink> = (args) => (
    <CustomLink {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCustomLinkProps.data,
} as ICustomLink;
