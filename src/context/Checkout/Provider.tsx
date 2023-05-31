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
    addToCart,
    reloadOrder,
    updateMetadata,
    updateItemQuantity,
    addCustomer,
    addLoggedCustomer,
    addAddresses,
    getAddresses,
    getCustomerAddresses,
    placeOrder,
    getPaymentMethods,
    setPaymentMethod,
    addPaymentMethodSource,
    setDefaultShippingMethod,
    onRecaptcha,
    validateExternal,
    tokenRecaptcha,
    getSkuList,
    changeItemService,
    deleteItemService
  } = useCommerceLayer();

  const flow = useMemo(() => flows.find(i => i.name === paymentType), [paymentType]);

  const valuesProvider: IContextCheckout = {
    flow,
    order,
    productUpdates,
    tokenRecaptcha,
    addToCart,
    reloadOrder,
    updateMetadata,
    updateItemQuantity,
    addCustomer,
    addLoggedCustomer,
    addAddresses,
    getAddresses,
    getCustomerAddresses,
    placeOrder,
    getPaymentMethods,
    setPaymentMethod,
    addPaymentMethodSource,
    setDefaultShippingMethod,
    onRecaptcha,
    validateExternal,
    getSkuList,
    changeItemService,
    deleteItemService
  };

  return (
    <CheckoutContext.Provider value={valuesProvider}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
