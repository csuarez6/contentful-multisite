import { ComponentStory, ComponentMeta } from '@storybook/react';
import InformativeGrid from './InformativeGrid';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockInformativeGridProps } from './InformativeGrid.mocks';

export default {
  title: 'blocks/InformativeGrid',
  component: InformativeGrid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
      },
    },
  },
} as ComponentMeta<typeof InformativeGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InformativeGrid> = (args) => (
    <InformativeGrid {...args} />
);

export const Base = Template.bind({});
export const Columns2 = Template.bind({});
export const Columns1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInformativeGridProps.data,
} as IPromoBlock;

Columns2.args = {
  ...mockInformativeGridProps.dataSecondary,
} as IPromoBlock;

Columns1.args = {
  ...mockInformativeGridProps.dataTetiary,
} as IPromoBlock;