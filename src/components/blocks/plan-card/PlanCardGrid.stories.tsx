import { ComponentStory, ComponentMeta } from '@storybook/react';
import PlanCardGrid from './PlanCardGrid';
import { mockPlanCardGridProps } from './PlanCardGrid.mock';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';

export default {
    title: 'blocks/PlanCardGrid',
    component: PlanCardGrid,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        }
    }
} as ComponentMeta<typeof PlanCardGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlanCardGrid> = (args) => (
    <PlanCardGrid {...args} />
);

export const Base = Template.bind({});
export const Column2 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockPlanCardGridProps.data1Column,
} as IPromoBlock;

Column2.args = {
    ...mockPlanCardGridProps.data2Column,
} as IPromoBlock;
