import React from "react";
import { render } from "@testing-library/react";
import VerticalCard from "./VerticalCard";
import { mockVerticalCardProps } from "./VerticalCard.mocks";
import { useRouter } from "next/router";

const { data, dataPortrait } = mockVerticalCardProps;

// const useRouterMock = () => ({
//   asPath: "/",
//   push: jest.fn(),
// });

// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));

jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));

jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("VerticalCard", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCard {...data} />);
  });
});

describe("VerticalCard dataPortrait", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCard {...dataPortrait} />);
  });
});
