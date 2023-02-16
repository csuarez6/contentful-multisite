import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TabsWithFeaturedImage from './TabsWithFeaturedImage';
import { mockTabsWithFeaturedImageProps } from './TabsWithFeaturedImage.mocks';

export default {
    title: 'blocks/TabsWithFeaturedImage',
    component: TabsWithFeaturedImage,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof TabsWithFeaturedImage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TabsWithFeaturedImage> = (args) => (
    <TabsWithFeaturedImage {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockTabsWithFeaturedImageProps.data,
} as IPromoBlock;