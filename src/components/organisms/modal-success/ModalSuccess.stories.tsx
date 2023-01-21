import { IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModalSuccess from './ModalSuccess';
import { MocksModalSuccessProps } from './ModalSuccess.mocks';

export default {
    title: 'organisms/ModalSuccess',
    component: ModalSuccess,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof ModalSuccess>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalSuccess> = (args) => (
    <ModalSuccess {...args} />
);

export const Base = Template.bind({});
export const WithThreeStar = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...MocksModalSuccessProps.data,
} as IPromoContent;
