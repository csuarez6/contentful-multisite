import { IPage } from '@/lib/interfaces/page-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductOverviewTemplate from './ProductOverview';
import { mockProductOverviewTemplateProps } from './ProductOverview.mocks';

export default {
  title: 'templates/ProductOverview',
  component: ProductOverviewTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an ProductOverview template component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof ProductOverviewTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductOverviewTemplate> = (args) => (
    <ProductOverviewTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockProductOverviewTemplateProps.data,
} as IPage;
