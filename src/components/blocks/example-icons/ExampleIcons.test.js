import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockExampleIconsProps } from "./ExampleIcons.mocks";
import ExampleIcons from "./ExampleIcons";

const { data } = mockExampleIconsProps;

describe("ExampleIcons data", () => {
  test("renders", async () => {
    render(<ExampleIcons {...data}/>);
  });
});