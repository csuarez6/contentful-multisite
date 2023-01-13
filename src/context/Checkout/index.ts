import { Address, AddressCreate, Order } from "@commercelayer/sdk";
import { createContext } from "react";

export enum VantiCheckoutFlowType {
  pse = 'pse',
  vantiListo = 'vantiListo',
  factura = 'factura'
}

export type VantiCheckoutStep = {
  path: string
  onNext: () => void
  onPrev: () => void
}

export interface VantiChekoutCustomer {
  firstName: string
  lastName: string
  cellPhone: string | number
  email: string
}

export type VantiCheckoutFlow = {
  name: VantiCheckoutFlowType
  steps: string[]
  getNextStep: (step: string) => string | null
  getPrevStep: (step: string) => string | null
}

export interface IContextCheckout {
  isLoading: boolean
  isError: boolean
  order: Order
  flow: VantiCheckoutFlow
  addToCart: (sku: string) => void
  updateMetadata: <T = any>(metaField: string, value: T) => Promise<void>
  addCustomer: (customer: VantiChekoutCustomer) => Promise<void>,
  updateItemQuantity: (skuCode: string, quantity: number) => Promise<void>
  addAddresses: (shippingAddress: AddressCreate, billingAddress?: AddressCreate) => Promise<void>,
  getAddresses: () => Promise<{
    shippingAddress?: Address,
    billingAddress?: Address
  }>,
}

const CheckoutContext = createContext<IContextCheckout>({
    order: undefined,
    isLoading: false,
    isError: false,
    flow: undefined,
    addToCart: () => undefined,
    updateMetadata: () => undefined,
    addCustomer: () => undefined,
    updateItemQuantity: () => undefined,
    addAddresses: () => undefined,
    getAddresses: () => undefined,
});

export default CheckoutContext;
