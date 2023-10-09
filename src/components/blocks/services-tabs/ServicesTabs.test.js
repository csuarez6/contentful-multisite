import React from "react";
import { render } from "@testing-library/react";
import ServicesTabs from "./ServicesTabs";
import { mockServicesTabsProps } from "./ServicesTabs.mocks";
import { useRouter } from "next/router";

const { data } = mockServicesTabsProps;

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));

jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));

jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("ServicesTabs", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", () => {
    render(<ServicesTabs {...data} />);
  });
});
