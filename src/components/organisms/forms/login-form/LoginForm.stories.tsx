import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginForm from './LoginForm';
import { IForm, mockLoginFormProps } from './LoginForm.mocks';

export default {
    title: 'organisms/forms/LoginForm',
    component: LoginForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof LoginForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockLoginFormProps.data,
} as IForm;
