import React from "react";
import { render } from "@testing-library/react";
import HomeTemplate from "./HomeTemplate";
import { mockHomeTemplateProps } from "./HomeTemplate.mocks";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// beforeAll(() => {
//   Object.defineProperty(window, "matchMedia", {
//     writable: true,
//     value: jest.fn().mockImplementation((query) => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(), // Deprecated
//       removeListener: jest.fn(), // Deprecated
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn(),
//     })),
//   });
// });

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

describe("HomeTemplate", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
    useSession.mockImplementation(useSessionMock);
  });

  test("renders", () => {
    render(<HomeTemplate {...mockHomeTemplateProps.data} />);
  });
});
