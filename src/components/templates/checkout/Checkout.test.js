import React from "react";
import { render } from "@testing-library/react";
import Layout from "./Layout";
import { useRouter } from "next/router";

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
  query: "",
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Checkout", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });

  test("Layout renders", () => {
    render(
      <Layout>
        <h1>this is a test</h1>
      </Layout>
    );
  });
});
