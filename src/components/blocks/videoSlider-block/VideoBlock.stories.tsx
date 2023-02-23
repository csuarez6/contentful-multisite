import { ComponentStory, ComponentMeta } from '@storybook/react';
import VideoBlock from './VideoBlock';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { mockVideoBlockProps } from './VideoBlock.mocks';

export default {
    title: 'blocks/VideoSliderBlock',
    component: VideoBlock,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof VideoBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VideoBlock> = (args) => (
    <VideoBlock {...args} />
);

export const Base = Template.bind({});
export const MoreVideos = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockVideoBlockProps.data,
} as IPromoBlock;

MoreVideos.args = {
    ...mockVideoBlockProps.twoVideos,
} as IPromoBlock;
