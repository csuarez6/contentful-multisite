import { ComponentStory, ComponentMeta } from '@storybook/react';
import PlanCard from './PlanCard';

import { cardPropMocks } from './PlanCard.mock';
import { IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';

export default {
    title: 'organisms/cards/PlanCard',
    component: PlanCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof PlanCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlanCard> = (args) => (
    <PlanCard {...args} />
);

export const Base = Template.bind({});
export const Reverse = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...cardPropMocks.card
} as IPromoContent;

Reverse.args = {
    ...cardPropMocks.cardReverse
} as IPromoContent;