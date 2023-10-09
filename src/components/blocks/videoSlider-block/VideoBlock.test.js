import React from "react";
import { fireEvent, render } from "@testing-library/react";
import VideoBlock from "./VideoBlock";
import { mockVideoBlockProps } from "./VideoBlock.mocks";

const { data, twoVideos } = mockVideoBlockProps;

// jest.mock("@/lib/richtext/default.formatter", () => ({
//   defaultFormatOptions: jest.fn(() => ({})),
// }));

// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));

// jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("VideoBlockBlock data", () => {
  test("renders", () => {
    render(
      <VideoBlock {...data} />
    );
  });
});
describe("VideoBlockBlock twoVideos", () => {
  test("renders", () => {
    render(
      <VideoBlock {...twoVideos} />
    );
  });
});
