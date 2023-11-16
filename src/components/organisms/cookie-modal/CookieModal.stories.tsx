import { ComponentStory, ComponentMeta } from '@storybook/react';
import CookieModal, { } from './CookieModal';
import { mocksCookieModalProps } from './CookieModal.mocks';
import { IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';

export default {
    title: 'organisms/CookieModal',
    component: CookieModal,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)',
            },
        },
    },
} as ComponentMeta<typeof CookieModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CookieModal> = (args) => (
    <CookieModal {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mocksCookieModalProps.data,
} as IPromoContent;
