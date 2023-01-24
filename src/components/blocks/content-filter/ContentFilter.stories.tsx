import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContentFilter from "./ContentFilter";
import { mockContentFilterProps } from "./ContentFilter.mocks";

export default {
  title: "blocks/ContentFilter",
  component: ContentFilter,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "Block for manage custom content filters.",
      },
    },
    mockData: mockContentFilterProps.fetchs,
  },
} as ComponentMeta<typeof ContentFilter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentFilter> = (args) => (
  <ContentFilter {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockContentFilterProps.data,
} as IContentFilter;
