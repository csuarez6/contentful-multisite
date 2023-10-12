import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MegaMenuMobile from "./MegaMenuMobile";
import { mockMegaMenuProps } from "../mega-menu/MegaMenu.mocks";

const { data } = mockMegaMenuProps;

import { useRouter } from "next/router";

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

describe("MegaMenuMobile", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<MegaMenuMobile items={data.mainNavCollection.items} />);
  });
});
