import { ComponentStory, ComponentMeta } from '@storybook/react';
import StepFive from './StepFive';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockStepFiveProps } from './StepFive.mocks';

export default {
    title: 'organisms/PurchaseFlow/StepFive',
    component: StepFive,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof StepFive>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StepFive> = (args) => (
    <StepFive {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockStepFiveProps.data,
} as IPromoContent;
