import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mocksErrorBlockprops } from "./ErrorBlock.mock";
import ErrorBlock from "./ErrorBlock";

const { data } = mocksErrorBlockprops;

describe("ErrorBlock data", () => {
  test("renders", async () => {
    render(<ErrorBlock {...data}/>);
  });
});