import { ComponentStory, ComponentMeta } from '@storybook/react';
import CheckBox, { ICheckBox } from './CheckBox';
import { dataCheckBox } from './CheckBox.mocks';

export default {
    title: 'atoms/input/CheckBox',
    component: CheckBox,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof CheckBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckBox> = (args) => (
    <CheckBox {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...dataCheckBox,
} as ICheckBox;

