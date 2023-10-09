import React from "react";
import { render } from "@testing-library/react";
import LeftFeatured from "./LeftFeatured";
import { mockLeftFeaturedProps } from "./LeftFeatured.mocks";

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));
jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("LeftFeaturedBlock", () => {
  test("renders", () => {
    render(<LeftFeatured {...mockLeftFeaturedProps.data} />);
  });
});
describe("LeftFeaturedBlock dataRounded", () => {
  test("renders", () => {
    render(<LeftFeatured {...mockLeftFeaturedProps.dataRounded} />);
  });
});

describe("LeftFeaturedBlock dataRoundedReverse", () => {
  test("renders", () => {
    render(<LeftFeatured {...mockLeftFeaturedProps.dataRoundedReverse} />);
  });
});
