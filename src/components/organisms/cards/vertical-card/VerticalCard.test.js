import { act, render, screen, fireEvent } from "@testing-library/react";
import { mockVerticalCardProps } from "./VerticalCard.mocks";
import VerticalCard from "./VerticalCard";
import "@testing-library/jest-dom";

jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));

describe("Vertical card data", () => {
  it("renders", async () => {
    render(<VerticalCard {...mockVerticalCardProps.data} />);
  });
});

describe("Vertical card data wiht buttons", () => {
  it("renders", async () => {
    render(<VerticalCard {...mockVerticalCardProps.dataWithButtons} />);
  });
});
