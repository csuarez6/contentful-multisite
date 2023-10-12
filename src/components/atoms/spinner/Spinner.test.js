import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  test("renders", async () => {
    render(<Spinner />);
  });
});
