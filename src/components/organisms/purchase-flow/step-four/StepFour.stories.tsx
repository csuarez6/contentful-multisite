import { ComponentStory, ComponentMeta } from '@storybook/react';
import StepFour from './StepFour';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockStepFourProps } from './StepFour.mocks';

export default {
    title: 'organisms/PurchaseFlow/StepFour',
    component: StepFour,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof StepFour>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StepFour> = (args) => (
    <StepFour {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockStepFourProps.data,
} as IPromoContent;
