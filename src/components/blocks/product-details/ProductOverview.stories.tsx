import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductOverview from './ProductOverview';
import { mockProductOverviewProps } from './ProductOverview.mocks';
import { IProductDetails } from '@/lib/interfaces/product-cf.interface';

export default {
  title: 'blocks/ProductOverview',
  component: ProductOverview,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ProductOverview>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductOverview> = (args) => (
    <ProductOverview {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockProductOverviewProps.data,
} as IProductDetails;
