import { IPage } from '@/lib/interfaces/page-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignUpTemplate from './SignUp';
import { mockSigUpTemplateProps } from './SignUp.mocks';

export default {
    title: 'templates/SignUp',
    component: SignUpTemplate,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an ProductOverview template component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof SignUpTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignUpTemplate> = (args) => (
    <SignUpTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockSigUpTemplateProps.data,
} as IPage;
