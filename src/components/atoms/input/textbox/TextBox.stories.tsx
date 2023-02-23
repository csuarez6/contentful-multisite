import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextBox from './TextBox';
import { dataTextBox, ITextBox } from './TextBox.mocks';

export default {
    title: 'atoms/input/TextBox',
    component: TextBox,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof TextBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextBox> = (args) => (
    <TextBox {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...dataTextBox,
} as ITextBox;
