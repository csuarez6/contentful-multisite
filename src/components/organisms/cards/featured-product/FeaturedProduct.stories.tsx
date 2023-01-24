import { ComponentStory, ComponentMeta } from "@storybook/react";
import FeaturedProduct from "./FeaturedProduct";
import { mockFeaturedProductProps } from "./FeaturedProduct.mock";
import { IProductDetails } from "@/lib/interfaces/product-cf.interface";

export default {
  title: "organisms/cards/FeaturedProduct",
  component: FeaturedProduct,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)",
      },
    },
    mockData: mockFeaturedProductProps.fetchs,
  },
} as ComponentMeta<typeof FeaturedProduct>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeaturedProduct> = (args) => (
  <FeaturedProduct {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFeaturedProductProps.data,
} as IProductDetails;
