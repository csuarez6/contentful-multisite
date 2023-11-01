import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Slider from "./Slider";

const data = [
  {
    urlImage: "https://via.placeholder.com/1120x970",
    title: "Lorem ipsum",
    link: {
      href: "/",
      onClick: alert("alert1"),
      name: "Lorem"
    }
  },
  {
    urlImage: "https://via.placeholder.com/1120x970",
    title: "Lorem dolor",
    link: {
      href: "/",
      onClick: alert("alert2"),
      name: "dolor"
    }
  },
  {
    urlImage: "https://via.placeholder.com/1120x970",
    title: "Lorem dolor",
    link: {
      href: "/",
      onClick: alert("alert3"),
      name: "dolor"
    },
    isExternal: true
  },
]

describe("Slider", () => {
  test("renders", () => {
    render(<Slider data={data} />);
    const sliderPrev = screen.getByTestId("sliderPrev");
    const sliderNext = screen.getByTestId("sliderNext");

    fireEvent.click(sliderPrev);
    fireEvent.click(sliderNext);
  });
});