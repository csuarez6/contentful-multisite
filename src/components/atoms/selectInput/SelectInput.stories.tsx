import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectInput, { ISelectInput } from './SelectInput';
import { mocksSelectInputProps } from './SelectInput.mocks';

export default {
    title: 'atoms/SelectInput',
    component: SelectInput,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof SelectInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectInput> = (args) => (
    <SelectInput {...args} />
);

export const Base = Template.bind({});
export const WithError = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mocksSelectInputProps.data,
} as ISelectInput;

WithError.args = {
    ...mocksSelectInputProps.dataError,
} as ISelectInput;

