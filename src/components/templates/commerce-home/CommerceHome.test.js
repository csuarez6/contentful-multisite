import React from "react";
import { render } from "@testing-library/react";
import CommerceHome from "./CommerceHome";
import { mockCommerceHomeTemplateProps } from "./CommerceHome.mocks";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
  query: ""
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

// jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("CommerceHome", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
    useSession.mockImplementation(useSessionMock);
  });

  test("renders", () => {
    render(<CommerceHome {...mockCommerceHomeTemplateProps.data} />);
  });
});
