import "@testing-library/jest-dom";
import CartModal from "./CartModal";
import { render } from "@testing-library/react";
import { MocksModalProps } from "./CartModal.mocks";

const {data} = MocksModalProps;
// jest.mock("@/lib/richtext/default.formatter", () => ({
//   defaultFormatOptions: jest.fn(() => ({})),
// }));

// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));

// jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("CartModal", () => {
  it("renders", async () => {
    render(<CartModal {...data} />);
  });
});