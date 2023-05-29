import { Address, AddressCreate, Order, PaymentMethod } from "@commercelayer/sdk";
import { ListResponse } from "@commercelayer/sdk/lib/cjs/resource";
import { createContext } from "react";
import { Flow, VantiChekoutCustomer } from "./flows";
import { apiResponse } from "@/lib/interfaces/api-response.interface";

export interface IContextCheckout {
  order: Order;
  flow: Flow;
  tokenRecaptcha: string;
  addToCart: (sku: string, productImage?: string, productName?: string, category?: object) => Promise<apiResponse>;
  getSkuList: (filter?: string) => Promise<apiResponse>;
  changeItemService: (idItem?: string, dataAdjustment?: object, quantity?: number, idProductOrigin?: string) => Promise<apiResponse>;
  reloadOrder: () => void;
  updateMetadata: (meta: Record<string, any>) => Promise<void>;
  addCustomer: (customer: VantiChekoutCustomer) => Promise<void>;
  addLoggedCustomer: () => Promise<void>;
  updateItemQuantity: (skuCode: string, quantity: number) => Promise<apiResponse>;
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
  addPaymentMethodSource: (token: string) => Promise<void>;
  setDefaultShippingMethod: () => Promise<void>;
  onRecaptcha: (e: any) => void;
  validateExternal: (e: any) => Promise<void>;
}

const CheckoutContext = createContext<IContextCheckout>({
  order: undefined,
  flow: undefined,
  tokenRecaptcha: "",
  addToCart: () => undefined,
  getSkuList: () => undefined,
  changeItemService: () => undefined,
  reloadOrder: () => undefined,
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
  onRecaptcha: () => undefined,
  validateExternal: () => undefined,
});

export default CheckoutContext;
