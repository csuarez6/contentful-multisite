import { ComponentStory, ComponentMeta } from '@storybook/react';
import ErrorBlock from './ErrorBlock';
import { mocksErrorBlockprops } from './ErrorBlock.mock';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';

export default {
    title: 'blocks/ErrorBlock',
    component: ErrorBlock,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        }
    }
} as ComponentMeta<typeof ErrorBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ErrorBlock> = (args) => (
    <ErrorBlock {...args} />
);

export const Base = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mocksErrorBlockprops.data,
} as IPromoBlock;
