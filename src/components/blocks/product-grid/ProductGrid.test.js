import React from "react";
import { render } from "@testing-library/react";
import ProductGrid from "./ProductGrid";
import { mockProductGridProps } from "./ProductGrid.mock";
const {
  data1Column,
  data2Column
} = mockProductGridProps;

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));

jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));

jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("ProductGrid data1Column", () => {
  test("renders", () => {
    render(<ProductGrid {...data1Column} />);
  });
});

describe("ProductGrid data2Column", () => {
  test("renders", () => {
    render(<ProductGrid {...data2Column} />);
  });
});
