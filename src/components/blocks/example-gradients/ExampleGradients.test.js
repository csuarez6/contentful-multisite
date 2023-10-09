import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockExampleGradientsProps } from "./ExampleGradients.mocks";
import ExampleGradients from "./ExampleGradients";

const { data } = mockExampleGradientsProps;

describe("ExampleGradients data", () => {
  test("renders", async () => {
    render(<ExampleGradients {...data}/>);
  });
});