import { ComponentStory, ComponentMeta } from '@storybook/react';
import MegaMenu from './MegaMenu';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockMegaMenuProps } from './MegaMenu.mocks';

export default {
    title: 'organisms/MegaMenu',
    component: MegaMenu,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof MegaMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MegaMenu> = (args) => (
    <MegaMenu {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockMegaMenuProps.data,
} as IPromoContent;
