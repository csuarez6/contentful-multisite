import React from "react";
import { render } from "@testing-library/react";
import ProductOverview from "./ProductOverview";
import { mockProductOverviewProps } from "./ProductOverview.mocks";

const { data } = mockProductOverviewProps;

describe("ProductOverview", () => {
  test("renders", () => {
    render(<ProductOverview {...data} />);
  });
});
