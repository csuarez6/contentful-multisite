import { ComponentStory, ComponentMeta } from "@storybook/react";
import Accordion from "./Accordion";
// import { IAccordion } from "@/lib/interfaces/accordion-cf.interface";
import { featuredContents } from "./Accordion.mocks";

export default {
  title: "organisms/Accordion",
  component: Accordion,
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
} as ComponentMeta<typeof Accordion>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  featuredContents,
} as any;
