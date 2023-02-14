import { ComponentStory, ComponentMeta } from "@storybook/react";
import HelpButton from "./HelpButton";
// import { IAccordion } from "@/lib/interfaces/accordion-cf.interface";
import { MocksHelpButtonProps } from "./HelpButton.mocks";

export default {
  title: "organisms/HelpButton",
  component: HelpButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "This is an example component to guide for create new components, remember update **this** description (_markdown_ is supported)",
      },
    },
  },
} as ComponentMeta<typeof HelpButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HelpButton> = (args) => (
  <HelpButton {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...MocksHelpButtonProps.data
} as any;
