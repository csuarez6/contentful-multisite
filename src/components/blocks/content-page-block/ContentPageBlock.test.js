import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockContentPageBlockProps } from "./ContentPageBlock.mocks";
import ContentPageBlock from "./ContentPageBlock";
import { useRouter } from "next/router";

const { data } = mockContentPageBlockProps;

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/richtext/default.formatter", () => {
  return {
    defaultFormatOptions: jest.fn(() => ({}))
  }
})
jest.mock("@/lib/services/render-blocks.service", () => {
  return {
    attachLinksToRichtextContent: jest.fn()
  }
})

describe("ContentPageBlock data", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<ContentPageBlock {...data} />);
  });
});