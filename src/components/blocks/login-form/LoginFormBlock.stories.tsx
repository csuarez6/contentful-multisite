import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginFormBlock from './LoginFormBlock';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockLoginFormBlockProps } from './LoginFormBlock.mocks';

export default {
    title: 'blocks/LoginFormBlock',
    component: LoginFormBlock,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof LoginFormBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginFormBlock> = (args) => (
    <LoginFormBlock {...args} />
);

export const Base = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockLoginFormBlockProps.data,
} as IPromoBlock;
