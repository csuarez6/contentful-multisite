import { ComponentStory, ComponentMeta } from '@storybook/react';
import BannerImage from './BannerImage';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockBannerImageProps } from './BannerImage.mock';

export default {
    title: 'blocks/BannerImage',
    component: BannerImage,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof BannerImage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BannerImage> = (args) => (
    <BannerImage {...args} />
);

export const Base = Template.bind({});
export const BannerMedium = Template.bind({});
export const BannerSmall = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockBannerImageProps.data,
} as IPromoBlock;

BannerMedium.args = {
    ...mockBannerImageProps.bannerMedium,
} as IPromoBlock;

BannerSmall.args = {
    ...mockBannerImageProps.bannerSmall,
} as IPromoBlock;
