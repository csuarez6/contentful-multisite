import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockInfoCardProps } from "./InfoCard.mocks";
import InfoCard from "./InfoCard";

const { data } = mockInfoCardProps;
jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));
jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));
jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("InfoCard data", () => {
  test("renders", async () => {
    render(<InfoCard {...data} />);
  });
});
