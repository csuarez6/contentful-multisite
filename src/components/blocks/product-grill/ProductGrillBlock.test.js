import React from "react";
import { render } from "@testing-library/react";
import ProductGrill from "./ProductGrill";
import { mockProductGrillProps } from "./ProductGrill.mocks";

describe("ProductGrillBlock", () => {
  test("renders", () => {
    render(<ProductGrill {...mockProductGrillProps.data} />);
  });
});

describe("ProductGrillBlock dataListedContents", () => {
  test("renders", () => {
    render(<ProductGrill {...mockProductGrillProps.dataListedContents} />);
  });
});
