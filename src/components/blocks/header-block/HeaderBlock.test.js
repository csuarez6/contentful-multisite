import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockHeaderBlockProps } from "./HeaderBlock.mocks";
import HeaderBlock from "./HeaderBlock";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const { data } = mockHeaderBlockProps;

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

describe("HeaderBlock data", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
    useSession.mockImplementation(useSessionMock);
  });
  test("renders", async () => {
    render(<HeaderBlock {...data} />);
  });
});