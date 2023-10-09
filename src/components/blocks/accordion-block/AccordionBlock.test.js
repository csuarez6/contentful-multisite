import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AccordionBlock from "./AccordionBlock";
import { data } from "./AccordionBlock.mock";

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));

jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));

describe("AccordionBlock", () => {
  test("renders", async () => {
    render(<AccordionBlock {...data} />);
  });
});
