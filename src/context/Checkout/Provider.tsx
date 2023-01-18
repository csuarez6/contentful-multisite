import { useMemo } from 'react';
import { useRouter } from 'next/router';
import useCommerceLayer from 'src/hooks/useCommerceLayer';
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
    addAddresses,
    getAddresses,
    placeOrder,
    getPaymentMethods,
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
    addAddresses,
    getAddresses,
    placeOrder,
    getPaymentMethods,
  };

  return (
    <CheckoutContext.Provider value={valuesProvider}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
