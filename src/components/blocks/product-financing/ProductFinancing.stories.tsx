import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductFinancing from './ProductFinancing';
import { mockProductFinancingProps } from './ProductFinancing.mocks';

export default {
  title: 'blocks/ProductFinancing',
  component: ProductFinancing,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ProductFinancing>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductFinancing> = (args) => (
  <ProductFinancing {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockProductFinancingProps.data,
} as IPromoBlock;