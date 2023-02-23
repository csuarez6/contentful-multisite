import { useMemo } from 'react';
import { useRouter } from 'next/router';
import useCommerceLayer from '@/hooks/useCommerceLayer';
import CheckoutContext, { IContextCheckout } from ".";
import flows from './flows';

const CheckoutProvider = ({ children }) => {
  const router = useRouter();
  const { paymentType } = router.query;

  const {
    isLoading,
    isError,
    order,
    addToCart,
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
  } = useCommerceLayer();

  const flow = useMemo(() => flows.find(i => i.name === paymentType), [paymentType]);

  const valuesProvider: IContextCheckout = {
    flow,
    isLoading,
    isError,
    order,
    addToCart,
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
  };

  return (
    <CheckoutContext.Provider value={valuesProvider}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
