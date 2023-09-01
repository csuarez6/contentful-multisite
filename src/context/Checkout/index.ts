import { Address, AddressCreate, Order, PaymentMethod, ShippingMethod } from "@commercelayer/sdk";
import { ListResponse } from "@commercelayer/sdk/lib/cjs/resource";
import { createContext } from "react";
import { Flow, VantiChekoutCustomer } from "./flows";
import { apiResponse } from "@/lib/interfaces/api-response.interface";

export interface IContextCheckout {
  order: Order;
  orderError: boolean;
  productUpdates: any;
  flow: Flow;
  tokenRecaptcha: string;
  timeToPay: number;
  hasShipment: boolean;
  isFetchingOrder: boolean;
  isPaymentProcess: boolean;
  addToCart: (sku: string, productImage?: string, productName?: string, category?: object) => Promise<apiResponse>;
  getSkuList: (filter?: string) => Promise<apiResponse>;
  changeItemService: (idItem?: string, dataAdjustment?: object, quantity?: number, idProductOrigin?: string) => Promise<apiResponse>;
  deleteItemService: (idItems: Array<string>) => Promise<apiResponse>;
  reloadOrder: (checkUpdates?: boolean) => void;
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
  getCustomerAddresses: (token: string) => Promise<any>;
  addCustomerAddress: (token: string, address: any) => Promise<void>;
  updateCustomerAddress: (token: string, id: string, address: any) => Promise<void>;
  placeOrder: () => Promise<apiResponse>;
  getPaymentMethods: () => Promise<ListResponse<PaymentMethod>>;
  setPaymentMethod: (paymentMethodId: string) => Promise<void>;
  addPaymentMethodSource: (token: string) => Promise<void>;
  setDefaultShippingMethod: (hasShipment: boolean) => Promise<void>;
  getShippingMethods: () => Promise<ListResponse<ShippingMethod>>;
  onRecaptcha: (e: any) => void;
  onHasShipment: (e: any) => void;
  validateExternal: (e: any) => Promise<void>;
  upgradeTimePay: (e: number) => Promise<void>;
  updateIsPaymentProcess: (e: boolean) => Promise<void>;
  getOrderById: (orderId: string) => Promise<any>;
}

const CheckoutContext = createContext<IContextCheckout>({
  order: undefined,
  orderError: undefined,
  productUpdates: undefined,
  flow: undefined,
  tokenRecaptcha: "",
  timeToPay: undefined,
  hasShipment: undefined,
  isFetchingOrder: undefined,
  isPaymentProcess: undefined,
  addToCart: () => undefined,
  getSkuList: () => undefined,
  changeItemService: () => undefined,
  deleteItemService: () => undefined,
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
  addCustomerAddress: () => undefined,
  updateCustomerAddress: () => undefined,
  setPaymentMethod: () => undefined,
  addPaymentMethodSource: () => undefined,
  setDefaultShippingMethod: () => undefined,
  getShippingMethods: () => undefined,
  onRecaptcha: () => undefined,
  onHasShipment: () => undefined,
  validateExternal: () => undefined,
  upgradeTimePay: () => undefined,
  updateIsPaymentProcess: () => undefined,
  getOrderById: () => undefined,
});

export default CheckoutContext;
