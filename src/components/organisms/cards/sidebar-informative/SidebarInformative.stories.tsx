import { ComponentStory, ComponentMeta } from '@storybook/react';
import SidebarInformative from './SidebarInformative';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockSidebarInformativeProps } from './SidebarInformative.mock';

export default {
    title: 'organisms/cards/SidebarInformative',
    component: SidebarInformative,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof SidebarInformative>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidebarInformative> = (args) => (
    <SidebarInformative {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockSidebarInformativeProps.data,
} as IPromoBlock;
