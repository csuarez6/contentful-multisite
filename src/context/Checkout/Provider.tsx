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
    productUpdates,
    timeToPay,
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
    getShippingMethods,
    onRecaptcha,
    validateExternal,
    tokenRecaptcha,
    getSkuList,
    changeItemService,
    deleteItemService,
    upgradeTimePay,
    updateIsPaymentProcess,
    getOrderById,
    getOrdersByCustomerEmail,
    updateIspolicyCheck,
    isPolicyCheck,
  } = useCommerceLayer();

  const flow = useMemo(() => flows.find(i => i.name === paymentType), [paymentType]);

  const valuesProvider: IContextCheckout = {
    flow,
    order,
    productUpdates,
    tokenRecaptcha,
    timeToPay,
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
    getShippingMethods,
    onRecaptcha,
    validateExternal,
    getSkuList,
    changeItemService,
    deleteItemService,
    upgradeTimePay,
    updateIsPaymentProcess,
    getOrderById,
    getOrdersByCustomerEmail,
    updateIspolicyCheck,
    isPolicyCheck
  };

  return (
    <CheckoutContext.Provider value={valuesProvider}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
