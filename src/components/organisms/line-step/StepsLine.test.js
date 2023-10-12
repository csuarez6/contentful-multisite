import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import StepsLine from "./StepsLine";
import { mockStepsLineProps } from "./StepsLine.mocks";
import { useRouter } from "next/router";

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("StepsLine", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<StepsLine {...mockStepsLineProps.data} />);
  });
});
