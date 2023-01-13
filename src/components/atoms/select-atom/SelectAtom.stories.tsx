import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectAtom, { ISelect } from './SelectAtom';
import { dataSelect } from './SelectAtom.mocks';

export default {
    title: 'atoms/Select',
    component: SelectAtom,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof SelectAtom>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectAtom> = (args) => (
    <SelectAtom {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...dataSelect,
} as ISelect;

