import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import MegaMenu from "./MegaMenu";
import { mockMegaMenuProps } from "./MegaMenu.mocks";

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

describe("MegaMenu", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<MegaMenu {...data} />);
    const uniqueId = `megamenu_${data.mainNavCollection.items?.[0].sys?.id}`;
    const megamenu = screen.getByTestId(uniqueId);
    fireEvent.click(megamenu);
  });
});
