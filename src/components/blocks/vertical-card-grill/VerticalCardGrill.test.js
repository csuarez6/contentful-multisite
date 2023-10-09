import React from "react";
import { render } from "@testing-library/react";
import VerticalCardGrill from "./VerticalCardGrill";
import { mockVerticalCardGrillProps } from "./VerticalCardGrill.mocks";
import { useRouter } from "next/router";

const {
  oneItems,
  twoItems,
  threeItems,
  fourItems,
  fiveItems,
  sixItems,
  sevenItems,
  eightItems,
} = mockVerticalCardGrillProps;

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

describe("VerticalCardGrill oneItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...oneItems} />);
  });
});

describe("VerticalCardGrill twoItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...twoItems} />);
  });
});

describe("VerticalCardGrill threeItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...threeItems} />);
  });
});

describe("VerticalCardGrill fourItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...fourItems} />);
  });
});

describe("VerticalCardGrill fiveItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...fiveItems} />);
  });
});

describe("VerticalCardGrill sixItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...sixItems} />);
  });
});

describe("VerticalCardGrill sevenItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...sevenItems} />);
  });
});

describe("VerticalCardGrill eightItems", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<VerticalCardGrill {...eightItems} />);
  });
});