import { act, render, screen, fireEvent } from "@testing-library/react";
import { mocksCookieModalProps } from "./CookieModal.mocks";
import CookieModal from "./CookieModal";
import "@testing-library/jest-dom";

describe("CookieModal data", () => {
  it("renders", async () => {
    const { getByText } = render(
      <CookieModal {...mocksCookieModalProps.data} />
    );
    fireEvent.click(getByText("Aceptar"));
  });
});
