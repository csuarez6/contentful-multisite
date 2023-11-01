import { render } from "@testing-library/react";
import {
  AuthData,
  ContactText,
  DataPolicyText,
} from "./terms-n-conditions-text";
import "@testing-library/jest-dom";

describe("AuthData", () => {
  it("renders", async () => {
    render(<AuthData />);
  });
});

describe("ContactText", () => {
  it("renders", async () => {
    render(<ContactText />);
  });
});

describe("DataPolicyText", () => {
  it("renders", async () => {
    render(<DataPolicyText />);
  });
});
