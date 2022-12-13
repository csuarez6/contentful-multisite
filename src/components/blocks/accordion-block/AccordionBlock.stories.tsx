import { ComponentStory, ComponentMeta } from '@storybook/react';
import AccordionBlock from './AccordionBlock';
import { IAccordionBlock } from "@/lib/interfaces/accordion-cf.interface";
import { data } from './AccordionBlock.mock';

export default {
    title: 'blocks/AccordionBlock',
    component: AccordionBlock,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        }
    },
} as ComponentMeta<typeof AccordionBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccordionBlock> = (args) => (
    <AccordionBlock {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...data
} as IAccordionBlock;
