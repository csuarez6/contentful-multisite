import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignInForm from './SignInForm';
import { IForm, mockSignInFormsProps } from './SignIn.mocks';

export default {
    title: 'organisms/forms/SignInForm',
    component: SignInForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof SignInForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignInForm> = (args) => (
    <SignInForm {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockSignInFormsProps.data,
} as IForm;
