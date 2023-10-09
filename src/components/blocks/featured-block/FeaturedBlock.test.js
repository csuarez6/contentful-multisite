import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockFeaturedBlockProps } from "./FeaturedBlock.mocks";
import FeaturedBlock from "./FeaturedBlock";

const { data, dataImageRight, dataListedColumns } = mockFeaturedBlockProps;

jest.mock("@/lib/services/render-blocks.service", () => {
  return {
    attachLinksToRichtextContent: jest.fn(() => null)
  }
})

describe("FeaturedBlock data", () => {
  test("renders", async () => {
    render(<FeaturedBlock {...data} />);
  });
});

describe("FeaturedBlock dataImageRight", () => {
  test("renders", async () => {
    render(<FeaturedBlock {...dataImageRight} />);
  });
});

describe("FeaturedBlock dataListedColumns", () => {
  test("renders", async () => {
    render(<FeaturedBlock {...dataListedColumns} />);
  });
});
