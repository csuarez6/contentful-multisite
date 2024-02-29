import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomLink, { ICustomLink } from './CustomLink';
import { mockCustomLinkProps } from './CustomLink.mocks';

export default {
  title: 'atoms/CustomLink',
  component: CustomLink,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof CustomLink>;

const Template: ComponentStory<typeof CustomLink> = (args) => (
    <CustomLink {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCustomLinkProps.data,
} as ICustomLink;
