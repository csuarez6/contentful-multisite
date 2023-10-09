import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mockExampleComponentProps } from "./ExampleComponent.mocks";
import ExampleComponent from "./ExampleComponent";

const { data } = mockExampleComponentProps;

describe("ExampleComponent data", () => {
  test("renders", async () => {
    render(<ExampleComponent {...data}/>);
  });
});