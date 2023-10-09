import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockInformativeGridProps } from "./InformativeGrid.mocks";
import InformativeGrid from "./InformativeGrid"

const { data } = mockInformativeGridProps;

jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));
jest.mock("@/lib/services/render-cards.service", () => jest.fn())

describe("InformativeGrid data", () => {
  test("renders", async () => {
    render(<InformativeGrid {...data} />);
  });
});
