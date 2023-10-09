import React from "react";
import { render } from "@testing-library/react";
import ListWithIcons from "./ListWithIcons";
import { mockListWithIconsProps } from "./ListWithIcons.mocks";

const {
  data,
  dataLeft
} = mockListWithIconsProps;

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));
jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));
// jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("ListWithIcons data", () => {
  test("renders", () => {
    render(<ListWithIcons {...data} />);
  });
});

describe("ListWithIcons dataLeft", () => {
  test("renders", () => {
    render(<ListWithIcons {...dataLeft} />);
  });
});
