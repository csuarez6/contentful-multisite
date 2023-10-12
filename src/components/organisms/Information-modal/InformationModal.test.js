import "@testing-library/jest-dom";
import InformationModal from "./InformationModal";
import { render } from "@testing-library/react";
import { MocksModalProps } from "./InformationModal.mocks";

const { data, error } = MocksModalProps;
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
// jest.mock("@/lib/richtext/default.formatter", () => ({
//   defaultFormatOptions: jest.fn(() => ({})),
// }));

// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));

// jest.mock("@/lib/services/render-cards.service", () => jest.fn());


describe("InformationModal data", () => {
  it("renders", async () => {
    render(<InformationModal {...data} />);
  });
});

describe("InformationModal error", () => {
  it("renders", async () => {
    render(<InformationModal {...error} />);
  });
});
