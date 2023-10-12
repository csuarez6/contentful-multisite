import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import PageLayout from "./PageLayout";
import { mockPageLayoutProps } from "./PageLayout.mocks";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const { data } = mockPageLayoutProps;

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const useSessionMock = () => ({
  data: null,
  status: "loading"
});

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// jest.mock("@/lib/richtext/default.formatter", () => ({
//   defaultFormatOptions: jest.fn(() => ({})),
// }));

// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));

describe("PageLayout", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
    useSession.mockImplementation(useSessionMock);
  });

  test("renders", async () => {
    render(<PageLayout {...data} />);
  });
});
