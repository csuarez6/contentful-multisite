import { ComponentStory, ComponentMeta } from '@storybook/react';
import VerticalCardGrill from './VerticalCardGrill';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockVerticalCardGrillProps } from './VerticalCardGrill.mocks';

export default {
    title: 'blocks/VerticalCardGrill',
    component: VerticalCardGrill,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof VerticalCardGrill>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VerticalCardGrill> = (args) => (
    <VerticalCardGrill {...args} />
);

export const OneItems = Template.bind({});
export const TwoItems = Template.bind({});
export const ThreeItems = Template.bind({});
export const FourItems = Template.bind({});
export const FiveItems = Template.bind({});
export const SixItems = Template.bind({});
export const SevenItems = Template.bind({});
export const EightItems = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

OneItems.args = {
    ...mockVerticalCardGrillProps.oneItems,
} as IPromoBlock;
TwoItems.args = {
    ...mockVerticalCardGrillProps.twoItems,
} as IPromoBlock;
ThreeItems.args = {
    ...mockVerticalCardGrillProps.threeItems,
} as IPromoBlock;
FourItems.args = {
    ...mockVerticalCardGrillProps.fourItems,
} as IPromoBlock;
FiveItems.args = {
    ...mockVerticalCardGrillProps.fiveItems,
} as IPromoBlock;
SixItems.args = {
    ...mockVerticalCardGrillProps.sixItems,
} as IPromoBlock;
SevenItems.args = {
    ...mockVerticalCardGrillProps.sevenItems,
} as IPromoBlock;
EightItems.args = {
    ...mockVerticalCardGrillProps.eightItems,
} as IPromoBlock;
