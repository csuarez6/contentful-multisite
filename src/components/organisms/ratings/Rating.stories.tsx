import { ComponentStory, ComponentMeta } from '@storybook/react';
import Rating, { IRatings } from './Rating';
import { data, moreStar } from './rating.mock';

export default {
    title: 'organisms/Rating',
    component: Rating,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof Rating>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Rating> = (args) => (
    <Rating {...args} />
);

export const Base = Template.bind({});
export const WithThreeStar = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...data,
} as IRatings;

WithThreeStar.args = {
    ...moreStar,
} as IRatings;
