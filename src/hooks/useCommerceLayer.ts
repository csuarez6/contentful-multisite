import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CommerceLayer, {
  AddressCreate,
  CommerceLayerClient,
  Order,
  QueryParamsRetrieve,
} from "@commercelayer/sdk";
import { VantiOrderMetadata } from "@/constants/checkout.constants";
import { CL_ORGANIZATION } from "@/constants/commerceLayer.constants";
import { getMerchantToken } from "@/lib/services/commerce-layer.service";
import AuthContext from "@/context/Auth";
const INVALID_ORDER_ID_ERROR = "INVALID_ORDER_ID";
const DEFAULT_SHIPPING_METHOD_ID = "dOLWPFmmvE";
const DEFAULT_ORDER_PARAMS: QueryParamsRetrieve = {
  include: ["line_items", "available_payment_methods", "shipments", "customer"],
  fields: {
    orders: [
      "number",
      "status",
      "skus_count",
      "formatted_subtotal_amount",
      "formatted_discount_amount",
      "formatted_shipping_amount",
      "formatted_total_tax_amount",
      "formatted_gift_card_amount",
      "formatted_total_amount_with_taxes",
      "line_items",
      "customer",
      "metadata",
      "customer_email",
      "available_payment_methods",
      "shipments",
    ],
    addresses: ["state_code", "city", "line_1", "phone"],
    shipments: ["available_shipping_methods"],
    line_items: [
      "item_type",
      "image_url",
      "name",
      "sku_code",
      "formatted_unit_amount",
      "quantity",
      "formatted_total_amount",
    ],
    customer: ["id"],
  },
};

export const useCommerceLayer = () => {
  const [client, setClient] = useState<CommerceLayerClient>();
  const [error, setError] = useState<unknown>();
  const { clientLogged, user } = useContext(AuthContext);
  const [tokenRecaptcha, setTokenRecaptcha] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<Order>();
  const isError = useMemo(() => !!error, [error]);
  const orderId = useMemo(() => order?.id, [order]);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getMerchantToken();
        if (!accessToken) {
          setError(new Error("CREDENTIALS_ERROR"));
          return;
        }

        setClient(
          CommerceLayer({ accessToken, organization: CL_ORGANIZATION })
        );
      } catch (error) {
        setError(error);
        console.error("Error at: useCommerceLayer getSalesChannelToken", error);
      }

      setIsLoading(false);
    })();
  }, []);

  const getOrder = useCallback(async () => {
    try {
      const idOrder = localStorage.getItem("orderId");

      if (!idOrder) throw new Error(INVALID_ORDER_ID_ERROR);

      const order = await client.orders.retrieve(idOrder, DEFAULT_ORDER_PARAMS);

      if (!["draft", "pending"].includes(order.status)) {
        throw new Error(INVALID_ORDER_ID_ERROR);
      }

      return order;
    } catch (error) {
      console.warn(INVALID_ORDER_ID_ERROR, "Creating new draft order");

      const draftOrder = await client.orders.create({}).catch(err => err.errors);
      if(draftOrder[0]?.status !== 200) localStorage.setItem("orderId", draftOrder.id);
      return draftOrder;
    }
  }, [client]);

  useEffect(() => {
    if (isLoading) return;

    (async () => {
      try {
        const order = await getOrder();
        setOrder(order);
      } catch (error) {
        console.error("Error at: useCommerceLayer getOrder, setOrder", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const reloadOrder = useCallback(async () => {
    try {
      const order = await getOrder();
      setOrder(order);
      return {status: 200, data: 'success at reload order'};
    } catch (error) {
      console.error('error reloadOrder ', error);
      return {status: 400, data: 'error at reload order'};
    }
    
  }, [getOrder]);

  const addToCart = useCallback(
    async (skuCode: string, productImage: string, productName: string) => {
      try{
        const resCreate = await client.line_items.create({
          quantity: 1,
          name: productName,
          image_url: productImage,
          sku_code: skuCode,
          _update_quantity: true,
          order: {
            type: "orders",
            id: orderId,
          },
        })
        .catch(error => error.errors);
        if(resCreate?.[0]?.status){
          return {status: parseInt(resCreate[0].status), data: resCreate[0].title};
        }
        const orderRes = await reloadOrder();
        if(orderRes?.[0]?.status ) return {status: parseInt(orderRes[0].status), data: 'error at add to card'}; 
        return {status: 200, data: 'product add to card'};
        
      }catch(error){
        console.error('error add to card', error);
        return {status: 500, data: 'error at add to card'};
      }
      
    },
    [orderId, client, reloadOrder]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  );

  const updateItemQuantity = async (skuCode: string, quantity: number) => {
    try {
      const lineItem = order.line_items.find((i) => i.sku_code === skuCode);
      let response;
      if (quantity > 0) {
        response = await client.line_items.update({
          id: lineItem.id,
          quantity,
        }).catch(err => err.errors);
      } else {
        response = await client.line_items.delete(lineItem.id).catch(err => err.errors);
        await updateMetadata({ [VantiOrderMetadata.IsVerified]: false });
      }
      await reloadOrder();
      if(response?.[0]?.status){
        return {status: parseInt(response[0].status), data: response[0].title};
      }
      return {status: 200, data: 'success update item'};
    } catch(err) {
      console.error('error', err);
      return {status: 500, data: 'error update item'};
    }
  };

  const addLoggedCustomer = useCallback(async () => {
    if (!clientLogged) throw new Error("unauthorized");

    const result = await clientLogged.orders.update(
      {
        id: orderId,
        customer: {
          id: user.id,
          type: "customers",
        },
      },
      DEFAULT_ORDER_PARAMS
    );

    setOrder(result);
  }, [user?.id, clientLogged, orderId]);

  const addCustomer = useCallback(
    async ({ email, name, lastName, cellPhone }) => {
      const result = await client.orders.update(
        {
          id: orderId,
          customer_email: email,
          metadata: {
            ...(order?.metadata && {
              ...order.metadata,
            }),
            name,
            lastName,
            cellPhone,
            hasPersonalInfo: true,
          },
        },
        DEFAULT_ORDER_PARAMS
      );
      setOrder(result);
    },
    [order, client, orderId]
  );

  const getAddresses = useCallback(async () => {
    if (!client) return;
    const [shippingAddress, billingAddress] = await Promise.all([
      client.orders.shipping_address(orderId),
      client.orders.billing_address(orderId),
    ]);

    return {
      shippingAddress,
      billingAddress,
    };
  }, [client, orderId]);

  const getCustomerAddresses = useCallback(async () => {
    if (!clientLogged) return [];
    return clientLogged.customer_addresses.list();
  }, [clientLogged]);

  const addAddresses = useCallback(
    async (shippingAddress: AddressCreate, billingAddress?: AddressCreate) => {
      const [shippingAddrResult, billingAddrResult] = await Promise.all([
        client.addresses.create(shippingAddress),
        ...(billingAddress ? [client.addresses.create(billingAddress)] : []),
      ]);

      const orderUpdate = await client.orders.update(
        {
          id: order.id,
          shipping_address: {
            id: shippingAddrResult.id,
            type: "addresses",
          },
          ...(billingAddrResult?.id && {
            billing_address: {
              id: billingAddrResult.id,
              type: "addresses",
            },
          }),
          ...(!billingAddrResult?.id && {
            _billing_address_same_as_shipping: true,
          }),
          metadata: {
            ...(order?.metadata && {
              ...order.metadata,
            }),
            hasAddresses: true,
          },
        },
        DEFAULT_ORDER_PARAMS
      );

      setOrder(orderUpdate);
    },
    [order, client]
  );

  const updateMetadata = useCallback(
    async (metadata: Record<string, any>) => {
      const result = await client.orders.update(
        {
          id: orderId,
          metadata: {
            ...(order?.metadata && {
              ...order.metadata,
            }),
            ...metadata,
          },
        },
        DEFAULT_ORDER_PARAMS
      );

      setOrder(result);
    },
    [order, client, orderId]
  );

  const getPaymentMethods = useCallback(async () => {
    return client.orders.available_payment_methods(orderId);
  }, [client, orderId]);

  const setPaymentMethod = useCallback(
    async (paymentMethodId: string) => {
      const result = await client.orders.update(
        {
          id: orderId,
          payment_method: {
            id: paymentMethodId,
            type: "payment_methods",
          },
        },
        DEFAULT_ORDER_PARAMS
      );

      setOrder(result);
    },
    [client, orderId]
  );

  const addPaymentMethodSource = useCallback(
    async (token: string) => {
      await client.external_payments.create({
        payment_source_token: token,
        order: {
          id: orderId,
          type: "orders",
        },
      });
    },
    [client, orderId]
  );

  const setDefaultShippingMethod = useCallback(async () => {
    const shipmentId = order.shipments.at(0)?.id;

    await client.shipments.update({
      id: shipmentId,
      shipping_method: {
        id: DEFAULT_SHIPPING_METHOD_ID,
        type: "shipping_methods",
      },
    });
  }, [client, order]);

  const placeOrder = useCallback(async () => {
    const result = await client.orders.update(
      {
        id: orderId,
        _place: true,
      },
      DEFAULT_ORDER_PARAMS
    );

    setOrder(result);
  }, [client, orderId]);

  const validateExternal = useCallback(
    async (recapchaResponse: string) => {
      const result = await client.orders.update(
        {
          id: orderId,
          metadata: {
            ...(order?.metadata && {
              ...order.metadata,
            }),
            recapchaResponse,
          },
        },
        DEFAULT_ORDER_PARAMS
      );

      setOrder(result);
    },
    [client, orderId, order]
  );

  const onRecaptcha = async (e) => {
    try {
      if (!e || e === "not authorized") {
        setTokenRecaptcha("");
        return;
      }

      setTokenRecaptcha(e);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isError,
    isLoading,
    error,
    client,
    order,
    tokenRecaptcha,
    onRecaptcha,
    getOrder,
    reloadOrder,
    addToCart,
    updateItemQuantity,
    addCustomer,
    addLoggedCustomer,
    addAddresses,
    getAddresses,
    getCustomerAddresses,
    updateMetadata,
    placeOrder,
    getPaymentMethods,
    setPaymentMethod,
    addPaymentMethodSource,
    setDefaultShippingMethod,
    validateExternal,
  };
};

export default useCommerceLayer;
