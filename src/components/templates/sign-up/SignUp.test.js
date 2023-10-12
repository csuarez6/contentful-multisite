import React from "react";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";
import { mockSigUpTemplateProps } from "./SignUp.mocks";
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
  status: "loading",
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

describe("SignUp", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
    useSession.mockImplementation(useSessionMock);
  });

  test("renders", () => {
    render(<SignUp {...mockSigUpTemplateProps.data} />);
  });
});
