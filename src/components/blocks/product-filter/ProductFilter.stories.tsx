import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductFilter from './ProductFilter';
import { IProductDetails } from '@/lib/interfaces/product-cf.interface';
import { mockProductFilterProps } from './ProductFilter.mocks';

export default {
  title: 'blocks/ProductFilter',
  component: ProductFilter,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ProductFilter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductFilter> = (args) => (
    <ProductFilter {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockProductFilterProps.data,
} as IProductDetails;

