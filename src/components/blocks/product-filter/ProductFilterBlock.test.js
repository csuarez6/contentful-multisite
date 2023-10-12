import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilterBlock from "./ProductFilter";
import { mockProductFilterProps } from "./ProductFilter.mocks";

jest.mock("@/lib/richtext/default.formatter", () => ({
  defaultFormatOptions: jest.fn(() => ({})),
}));
jest.mock("@/lib/services/render-blocks.service", () => ({
  attachLinksToRichtextContent: jest.fn(),
}));
jest.mock("@/lib/services/render-cards.service", () => jest.fn());

describe("ProductFilterBlock", () => {
  // Definimos una constante con la información de prueba que queremos renderizar
  const testProducts = {
    id: 1,
    name: "Test Product",
    description: "A product for testing purposes",
  };

  const testFacets = [
    {
      name: "category",
      label: "Category",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
    },
    {
      name: "brand",
      label: "Brand",
      options: [
        { label: "Brand 1", value: "brand1" },
        { label: "Brand 2", value: "brand2" },
      ],
    },
  ];

  // Creamos una prueba que asegura que el componente renderiza sin errores
  it("renders without crashing", () => {
    render(<ProductFilterBlock {...mockProductFilterProps.data} />);
  });

  // // Creamos una prueba que asegura que se llama la función onFacetsChange al seleccionar una opción
  // it("calls onFacetsChange when an option is selected", () => {
  //     render(
  //         <ProductFilterBlock
  //             principalSearch={false}
  //             products={testProducts}
  //             facets={testFacets}
  //             onFacetsChange={mockOnFacetsChange}
  //         />
  //     );

  //     const categorySelect = screen.getByLabelText("Category");
  //     fireEvent.change(categorySelect, { target: { value: "option1" } });

  // });

  // // Creamos una prueba que asegura que se muestra el mensaje de carga cuando isLoading es true
  // it("shows loading message when isLoading is true", () => {
  //     render(
  //         <ProductFilterBlock
  //             principalSearch={false}
  //             products={testProducts}
  //             facets={testFacets}
  //             onFacetsChange={mockOnFacetsChange}
  //             isLoading={true}
  //         />
  //     );

  //     const loadingMessage = screen.getByText("Loading...");

  //     expect(loadingMessage).toBeInTheDocument();
  // });

  // // Creamos una prueba que asegura que se muestra el mensaje de error cuando error es true
  // it("shows error message when error is true", () => {
  //     render(
  //         <ProductFilterBlock
  //             principalSearch={false}
  //             products={testProducts}
  //             facets={testFacets}
  //             onFacetsChange={mockOnFacetsChange}
  //             error={true}
  //         />
  //     );

  //     const errorMessage = screen.getByText("Error loading data.");

  //     expect(errorMessage).toBeInTheDocument();
  // });
});
