import { ComponentStory, ComponentMeta } from '@storybook/react';
import FeaturedProductBlock, { IFeaturedProductBlock } from './FeaturedProductBlock';
import { data } from './FeaturedProductBlock.mock';

export default {
    title: 'blocks/FeaturedProductBlock',
    component: FeaturedProductBlock,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof FeaturedProductBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeaturedProductBlock> = (args) => (
    <FeaturedProductBlock {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...data,
} as IFeaturedProductBlock;
