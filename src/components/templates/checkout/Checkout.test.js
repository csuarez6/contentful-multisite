import React from "react";
import { render } from "@testing-library/react";
import Layout from "./Layout";
import LayoutDummy from "./LayoutDummy";
import { useRouter } from "next/router";
import { useContext } from "react";

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
  query: "",
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// jest.mock("@/lib/richtext/default.formatter", () => ({
//   defaultFormatOptions: jest.fn(() => ({})),
// }));

// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));


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

  test("LayoutDummy renders", () => {
    render(
      <LayoutDummy>
        {" "}
        <h1>this is a test</h1>
      </LayoutDummy>
    );
  });
});
