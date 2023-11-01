import { fireEvent, render } from "@testing-library/react";
import ProductOverview from "./ProductOverview";
import { mockProductOverviewProps } from "./ProductOverview.mocks";
import { ModalIntall } from "./ProductConfig"
import { useRouter } from "next/router";
import { act } from "react-dom/test-utils";
import CheckoutContext from "../../../context/Checkout";


jest.mock("@/utils/functions", () => {
  return {
    isAvailableGasAppliance: () => true,
    classNames: () => '',
    isAvailableVantilisto: () => true,
    isGasAppliance: () => true,
    isVantilisto: () => true,
    scrollContent: () => true,
  };
});


const useRouterMock = () => ({
  asPath: "/",
  push: jest.fn(),
  query: {
    paymentType: 'pse'
  }
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const { data } = mockProductOverviewProps;
const data2 = {
  optionsList: [
    {
      id: 1,
      name:"lorem",
      formatted_price_amount: 1000
    },
    {
      id: 2,
      name:"lorem 1",
      formatted_price_amount: 2000
    }
  ]
}

describe("ProductOverview", () => {

  beforeEach(() => {
    useRouter.mockImplementation(useRouterMock);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("render", () => {
    render(<ProductOverview {...data} copyServices={[]} />);
  });
  
  test("Add to cart", () => {

    const { getAllByText } = render(
      <CheckoutContext.Provider
        value={{
          order: {
            line_items: [
              {
                id: 1,
                name: "lorem",
                formatted_price_amount: 1000,
              },
            ],
          },
          addToCart: () => ({ status: 200, data: {
            id: 1
          } }),
        }}
      >
        <ProductOverview {...data} copyServices={[]} />
      </CheckoutContext.Provider>
    );
    const comp = getAllByText("Agregar al carro");
    act(() => {
      fireEvent.click(comp.at(0));
    })

    expect(comp).toBeTruthy()

  });

  test("render Modal", () => {
    render(<ModalIntall {...data2} />);
  });
});