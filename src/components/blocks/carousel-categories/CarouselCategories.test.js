import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CarouselCategories from "./CarouselCategories";
import { mockCarouselCategoriesProps } from "./CarouselCategories.mocks";
import { useRouter } from "next/router";

const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const { data, dataTop, dataStatic } = mockCarouselCategoriesProps;

describe("CarouselCategories data", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<CarouselCategories {...data} />);
  });
});
describe("CarouselCategories dataTop", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<CarouselCategories {...dataTop} />);
  });
});
describe("CarouselCategories dataStatic", () => {
  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  test("renders", async () => {
    render(<CarouselCategories {...dataStatic} />);
  });
});
