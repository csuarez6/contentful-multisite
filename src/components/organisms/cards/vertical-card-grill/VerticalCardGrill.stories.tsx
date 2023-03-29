import { ComponentStory, ComponentMeta } from '@storybook/react';
import VerticalGridCard from './VerticalCardGrill';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { mockVerticalCardGrillProps } from './VerticalCardGrill.mocks';

export default {
    title: 'organisms/cards/VerticalGridCard',
    component: VerticalGridCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof VerticalGridCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VerticalGridCard> = (args) => (
    <VerticalGridCard {...args} />
);

export const Base = Template.bind({});
export const Portrait = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockVerticalCardGrillProps.data,
} as IPromoContent;

Portrait.args = {
    ...mockVerticalCardGrillProps.portrait,
} as IPromoContent;
