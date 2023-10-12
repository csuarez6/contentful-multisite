import React from "react";
import { render } from "@testing-library/react";
import FeaturedProductBlockSkeleton from "./FeaturedProductBlockSkeleton/FeaturedProductBlockSkeleton";
import FeaturedProductSkeleton from "./FeaturedProductSkeleton/FeaturedProductSkeleton";
import ProductDetailsLayoutSkeleton from "./ProductDetailsLayoutSkeleton/ProductDetailsLayoutSkeleton";
import RichtextPageSkeleton from "./RichtextPageSkeleton/RichtextPageSkeleton";

describe("FeaturedProductBlockSkeleton", () => {
  test("renders", () => {
    render(<FeaturedProductBlockSkeleton />);
  });
});
describe("FeaturedProductSkeleton", () => {
  test("renders", () => {
    render(<FeaturedProductSkeleton />);
  });
});
describe("ProductDetailsLayoutSkeleton", () => {
  test("renders", () => {
    render(<ProductDetailsLayoutSkeleton />);
  });
});
describe("RichtextPageSkeleton", () => {
  test("renders", () => {
    render(<RichtextPageSkeleton />);
  });
});
