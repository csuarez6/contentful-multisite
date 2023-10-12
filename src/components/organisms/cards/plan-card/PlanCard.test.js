import "@testing-library/jest-dom";
import PlanCard from "./PlanCard.tsx";
import { render } from "@testing-library/react";
import { cardPropMocks } from "./PlanCard.mock";
const {
  card,
  cardReverse,
  cardModal
} = cardPropMocks;

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));
// jest.mock("@/lib/services/render-blocks.service", () => ({
//   attachLinksToRichtextContent: jest.fn(),
// }));
jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("PlanCard card", () => {
  it("renders", async () => {
    render(<PlanCard {...card} />);
  });
});

describe("PlanCard cardReverse", () => {
  it("renders", async () => {
    render(<PlanCard {...cardReverse} />);
  });
});

describe("PlanCard cardModal", () => {
  it("renders", async () => {
    render(<PlanCard {...cardModal} />);
  });
});
