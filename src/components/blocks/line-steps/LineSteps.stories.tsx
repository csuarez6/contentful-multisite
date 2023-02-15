import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineSteps from './LineSteps';
import { data } from './LineSteps.mock';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';

export default {
    title: 'blocks/LineSteps',
    component: LineSteps,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        }
    }
} as ComponentMeta<typeof LineSteps>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LineSteps> = (args) => (
    <LineSteps {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...data,
} as IPromoBlock;
