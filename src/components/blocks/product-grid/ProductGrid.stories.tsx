import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductGrid from './ProductGrid';
import { data1Column, data2Column } from './ProductGrid.mock';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';

export default {
    title: 'blocks/ProductGrid',
    component: ProductGrid,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        }
    }
} as ComponentMeta<typeof ProductGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductGrid> = (args) => (
    <ProductGrid {...args} />
);

export const Base = Template.bind({});
export const Column2 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...data1Column,
} as IPromoBlock;

Column2.args = {
    ...data2Column,
} as IPromoBlock;
