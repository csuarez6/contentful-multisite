import { ComponentStory, ComponentMeta } from '@storybook/react';
import StepOne from './StepOne';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockStepOneProps } from './StepOne.mocks';

export default {
    title: 'organisms/PurchaseFlow/StepOne',
    component: StepOne,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof StepOne>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StepOne> = (args) => (
    <StepOne {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockStepOneProps.data,
} as IPromoContent;
