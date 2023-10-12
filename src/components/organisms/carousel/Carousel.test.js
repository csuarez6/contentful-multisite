import "@testing-library/jest-dom";
import Carousel from "./Carousel";
import { render } from "@testing-library/react";
import { data } from "./carousel.mock";

// jest.mock("@/lib/richtext/default.formatter", () => ({
//   defaultFormatOptions: jest.fn(() => ({})),
// }));

// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));

// jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("Carousel", () => {
  it("renders", async () => {
    render(<Carousel {...data} />);
  });
});