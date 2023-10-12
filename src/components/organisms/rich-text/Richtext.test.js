import React from "react";
import { render } from "@testing-library/react";
import Richtext from "./Richtext";
import { mockRichTextProps } from "./RichText.mocks";
// import { useRouter } from "next/router";

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

describe("Richtext", () => {
  // beforeEach(() => {
  //   useRouter.mockImplementation(useRouterMock);
  // });
  test("renders", () => {
    render(<Richtext {...mockRichTextProps.data}/>);
  });
});
