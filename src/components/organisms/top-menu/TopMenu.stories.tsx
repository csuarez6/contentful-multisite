import { ComponentStory, ComponentMeta } from '@storybook/react';
import TopMenu from './TopMenu';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockTopMenuProps } from './TopMenu.mocks';

export default {
    title: 'organisms/TopMenu',
    component: TopMenu,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof TopMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopMenu> = (args) => (
    <TopMenu {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockTopMenuProps.data,
} as IPromoContent;
