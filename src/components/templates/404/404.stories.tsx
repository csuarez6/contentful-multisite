import { IPage } from '@/lib/interfaces/page-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ErrorPage from './404';
import { mockErrorPageProps } from './404.mocks';

export default {
    title: 'templates/Error-page',
    component: ErrorPage,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an home template component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof ErrorPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ErrorPage> = (args) => (
    <ErrorPage {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockErrorPageProps.data,
} as IPage;
