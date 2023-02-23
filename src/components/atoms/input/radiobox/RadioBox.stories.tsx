import { ComponentStory, ComponentMeta } from '@storybook/react';
import RadioBox from './RadioBox';
import { dataRadioBox, IRadioBox } from './RadioBox.mocks';

export default {
    title: 'atoms/input/RadioBox',
    component: RadioBox,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof RadioBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RadioBox> = (args) => (
    <RadioBox {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...dataRadioBox,
} as IRadioBox;
