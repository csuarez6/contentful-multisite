import { ComponentStory, ComponentMeta } from '@storybook/react';
import StepTwo from './StepTwo';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockStepTwoProps } from './StepTwo.mocks';

export default {
    title: 'organisms/PurchaseFlow/StepTwo',
    component: StepTwo,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof StepTwo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StepTwo> = (args) => (
    <StepTwo {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockStepTwoProps.data,
} as IPromoContent;
