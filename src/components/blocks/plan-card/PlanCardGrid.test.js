import React from "react";
import { render } from "@testing-library/react";
import PlanCardGrid from "./PlanCardGrid";
import { mockPlanCardGridProps } from "./PlanCardGrid.mock";

const { data1Column, data2Column } = mockPlanCardGridProps;

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));

jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("PlanCardGridBlock", () => {
  test("renders", () => {
    render(<PlanCardGrid {...data1Column} />);
  });
});

describe("PlanCardGridBlock", () => {
  test("renders", () => {
    render(<PlanCardGrid {...data2Column} />);
  });
});
