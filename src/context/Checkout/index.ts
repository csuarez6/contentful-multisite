import { Address, AddressCreate, Order, PaymentMethod } from "@commercelayer/sdk";
import { ListResponse } from "@commercelayer/sdk/lib/cjs/resource";
import { createContext } from "react";
import { Flow, VantiChekoutCustomer } from "./flows";

export interface IContextCheckout {
  isLoading: boolean;
  isError: boolean;
  order: Order;
  flow: Flow;
  addToCart: (sku: string, productImage?: string, productName?: string) => void;
  updateMetadata: (meta: Record<string, any>) => Promise<void>;
  addCustomer: (customer: VantiChekoutCustomer) => Promise<void>;
  addLoggedCustomer: () => Promise<void>;
  updateItemQuantity: (skuCode: string, quantity: number) => Promise<void>;
  addAddresses: (
    shippingAddress: AddressCreate,
    billingAddress?: AddressCreate
  ) => Promise<void>;
  getAddresses: () => Promise<{
    shippingAddress?: Address;
    billingAddress?: Address;
  }>;
  getCustomerAddresses: () => Promise<Address[]>;
  placeOrder: () => Promise<void>;
  getPaymentMethods: () => Promise<ListResponse<PaymentMethod>>;
  setPaymentMethod: (paymentMethodId: string) => Promise<void>;
  addPaymentMethodSource: () => Promise<void>;
  setDefaultShippingMethod: () => Promise<void>;
}

const CheckoutContext = createContext<IContextCheckout>({
  order: undefined,
  isLoading: false,
  isError: false,
  flow: undefined,
  addToCart: () => undefined,
  updateMetadata: () => undefined,
  addCustomer: () => undefined,
  addLoggedCustomer: () => undefined,
  updateItemQuantity: () => undefined,
  addAddresses: () => undefined,
  getAddresses: () => undefined,
  getCustomerAddresses: () => undefined,
  placeOrder: () => undefined,
  getPaymentMethods: () => undefined,
  setPaymentMethod: () => undefined,
  addPaymentMethodSource: () => undefined,
  setDefaultShippingMethod: () => undefined,
});

export default CheckoutContext;
