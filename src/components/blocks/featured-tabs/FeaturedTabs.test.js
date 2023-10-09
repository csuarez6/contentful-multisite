import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockFeaturedTabsProps } from "./FeaturedTabs.mocks";
import FeaturedTabs from "./FeaturedTabs";
import { useRouter } from "next/router";

const { data } = mockFeaturedTabsProps;

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// jest.mock("@/lib/richtext/default.formatter", () => {
//   return {
//     defaultFormatOptions: jest.fn(() => ({}))
//   }
// })
jest.mock("@/lib/services/render-blocks.service", () => {
  return {
    attachLinksToRichtextContent: jest.fn()
  }
})
jest.mock("@/lib/services/render-cards.service", () => jest.fn())

describe("FeaturedTabs data", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<FeaturedTabs {...data} />);
  });
});