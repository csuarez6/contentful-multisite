import { ComponentStory, ComponentMeta } from '@storybook/react';
import Carousel, { ICarousel } from './Carousel';
import { data } from './carousel.mock';

export default {
    title: 'organisms/Carousel',
    component: Carousel,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof Carousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Carousel> = (args) => (
    <Carousel {...args} />
);

export const Base = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...data,
} as ICarousel;
