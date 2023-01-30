import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomModal, { IModal} from './CustomModal';
import { MocksModalProps } from './CustomModal.mocks';

export default {
    title: 'organisms/CustomModal',
    component: CustomModal,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof CustomModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomModal> = (args) => (
    <CustomModal {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...MocksModalProps.data,
} as IModal;
