import { ComponentStory, ComponentMeta } from '@storybook/react';
import CartModal from './CartModal';
import { MocksModalProps } from './CartModal.mocks';
import { IModal } from '../custom-modal/CustomModal';

export default {
    title: 'organisms/CartModal',
    component: CartModal,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof CartModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CartModal> = (args) => (
    <CartModal {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...MocksModalProps.data,
} as IModal;
