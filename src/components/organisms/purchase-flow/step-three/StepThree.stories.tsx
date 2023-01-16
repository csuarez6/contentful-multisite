import { ComponentStory, ComponentMeta } from '@storybook/react';
import StepThree from './StepThree';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockStepThreeProps } from './StepThree.mocks';

export default {
    title: 'organisms/PurchaseFlow/StepThree',
    component: StepThree,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof StepThree>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StepThree> = (args) => (
    <StepThree {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockStepThreeProps.data,
} as IPromoContent;
