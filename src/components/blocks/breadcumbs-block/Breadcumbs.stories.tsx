import { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcumbs from './Breadcumbs';
import { mocksBreadcumbsProps } from './Breadcumbs.mocks';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';

export default {
    title: 'blocks/Breadcumbs-block',
    component: Breadcumbs,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        }
    },
} as ComponentMeta<typeof Breadcumbs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Breadcumbs> = (args) => (
    <Breadcumbs {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mocksBreadcumbsProps.data
} as IPromoBlock;