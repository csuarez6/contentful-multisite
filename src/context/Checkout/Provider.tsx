import { useMemo } from 'react';
import { useRouter } from 'next/router';
import useCommerceLayer from '@/hooks/useCommerceLayer';
import CheckoutContext, { IContextCheckout } from ".";
import flows from './flows';

const CheckoutProvider = ({ children }) => {
  const router = useRouter();
  const { paymentType } = router.query;

  const {
    order,
    orderError,
    productUpdates,
    timeToPay,
    hasShipment,
    isFetchingOrder,
    isPaymentProcess,
    addToCart,
    reloadOrder,
    updateMetadata,
    updateItemQuantity,
    addCustomer,
    addLoggedCustomer,
    addAddresses,
    getAddresses,
    getCustomerAddresses,
    addCustomerAddress,
    updateCustomerAddress,
    placeOrder,
    getPaymentMethods,
    setPaymentMethod,
    addPaymentMethodSource,
    setDefaultShippingMethod,
    getShippingMethods,
    onRecaptcha,
    onHasShipment,
    validateExternal,
    tokenRecaptcha,
    getSkuList,
    changeItemService,
    deleteItemService,
    upgradeTimePay,
    updateIsPaymentProcess,
    getOrderById,
    getOrdersByCustomerEmail
  } = useCommerceLayer();

  const flow = useMemo(() => flows.find(i => i.name === paymentType), [paymentType]);

  const valuesProvider: IContextCheckout = {
    flow,
    order,
    orderError,
    productUpdates,
    tokenRecaptcha,
    timeToPay,
    hasShipment,
    isFetchingOrder,
    isPaymentProcess,
    addToCart,
    reloadOrder,
    updateMetadata,
    updateItemQuantity,
    addCustomer,
    addLoggedCustomer,
    addAddresses,
    getAddresses,
    getCustomerAddresses,
    addCustomerAddress,
    updateCustomerAddress,
    placeOrder,
    getPaymentMethods,
    setPaymentMethod,
    addPaymentMethodSource,
    setDefaultShippingMethod,
    getShippingMethods,
    onRecaptcha,
    onHasShipment,
    validateExternal,
    getSkuList,
    changeItemService,
    deleteItemService,
    upgradeTimePay,
    updateIsPaymentProcess,
    getOrderById,
    getOrdersByCustomerEmail
  };

  return (
    <CheckoutContext.Provider value={valuesProvider}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
