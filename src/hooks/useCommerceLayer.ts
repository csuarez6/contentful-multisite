import getConfig from 'next/config';
import CommerceLayer, {
  AddressCreate,
  CommerceLayerClient,
  Order,
  QueryParamsRetrieve,
} from "@commercelayer/sdk";
import { getSalesChannelToken } from "@commercelayer/js-auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { VantiOrderMetadata } from "@/constants/checkout.constants";

const DEFAULT_ORDER_PARAMS: QueryParamsRetrieve = {
  include: ["line_items", "shipping_address", "billing_address"],
  fields: {
    orders: [
      "number",
      "skus_count",
      "formatted_subtotal_amount",
      "formatted_discount_amount",
      "formatted_shipping_amount",
      "formatted_total_tax_amount",
      "formatted_gift_card_amount",
      "formatted_total_amount_with_taxes",
      "line_items",
      "metadata",
      "customer_email",
    ],
    addresses: ["state_code", "city", "line_1", "phone"],
    line_items: [
      "item_type",
      "image_url",
      "name",
      "sku_code",
      "formatted_unit_amount",
      "quantity",
      "formatted_total_amount",
    ],
  },
};

const { publicRuntimeConfig } = getConfig();

export const useCommerceLayer = () => {
  const [client, setClient] = useState<CommerceLayerClient>();
  const [error, setError] = useState<unknown>();

  const isError = useMemo(() => !!error, [error]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    (async () => {
      try {
        console.log('NEXT_PUBLIC_COMMERCELAYER_ENDPOINT', publicRuntimeConfig.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE);
        const { accessToken } = await getSalesChannelToken({
          endpoint: publicRuntimeConfig.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
          clientId: publicRuntimeConfig.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID,
          scope: publicRuntimeConfig.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE, 
        });
        if (!accessToken) {
          setError(new Error("CREDENTIALS_ERROR"));
          return;
        }


        setClient(CommerceLayer({ accessToken, organization: "vanti-poc" }));
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const getOrderId = useCallback(async () => {
    if (!client?.orders) return;
    
    const orderId = localStorage.getItem("orderId");
    if (!orderId) {
      const draftOrder = await client.orders.create({});
      localStorage.setItem("orderId", draftOrder.id);
      return draftOrder.id;
    }

    return orderId;
  }, [client]);

  const getOrder = useCallback(async () => {
    const orderId = await getOrderId();
    const order = await client.orders.retrieve(orderId, DEFAULT_ORDER_PARAMS);

    return order;
  }, [getOrderId, client]);

  useEffect(() => {
    if (isLoading) return;
    if (isError) return;

    (async () => {
      try {
        const order = await getOrder();
        setOrder(order);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [client, getOrder, isLoading, isError]);

  const reloadOrder = async () => {
    const order = await getOrder();
    setOrder(order);
  };

  const addToCart = async (skuCode: string) => {
    const orderId = await getOrderId();

    const product = (
      await client.skus.list({
        filters: { code_eq: skuCode },
        fields: ["id", "name", "image_url", "code"],
      })
    ).at(0);

    await client.line_items.create({
      quantity: 1,
      name: product.name,
      image_url: product.image_url,
      sku_code: product.code,
      _update_quantity: true,
      order: {
        type: "orders",
        id: orderId,
      },
    });

    await reloadOrder();
  };

  const updateItemQuantity = async (skuCode: string, quantity: number) => {
    const lineItem = order.line_items.find((i) => i.sku_code === skuCode);
    if (quantity > 0) {
      await client.line_items.update({
        id: lineItem.id,
        quantity,
      });
    } else {
      await client.line_items.delete(lineItem.id);
      await updateMetadata(VantiOrderMetadata.IsVerified, false);
    }
    await reloadOrder();
  };

  const addCustomer = useCallback(
    async ({ email, firstName, lastName, cellPhone }) => {
      const id = await getOrderId();
      const result = await client.orders.update(
        {
          id,
          customer_email: email,
          metadata: {
            ...(order?.metadata && {
              ...order.metadata,
            }),
            firstName,
            lastName,
            cellPhone,
            hasPesonalInfo: true,
          },
        },
        DEFAULT_ORDER_PARAMS
      );
      setOrder(result);
    },
    [order, client, getOrderId]
  );

  const getAddresses = useCallback(async () => {
    if (!client) return;
    const orderId = await getOrderId();
    const [shippingAddress, billingAddress] = await Promise.all([
      client.orders.shipping_address(orderId),
      client.orders.billing_address(orderId),
    ]);

    return {
      shippingAddress,
      billingAddress,
    };
  }, [client, getOrderId]);

  const addAddresses = useCallback(
    async (shippingAddress: AddressCreate, billingAddress?: AddressCreate) => {
      const orderId = await getOrderId();

      const [shippingAddrResult, billingAddrResult] = await Promise.all([
        client.addresses.create(shippingAddress),
        ... billingAddress ? [client.addresses.create(billingAddress)] : [],
      ]);

      const orderUpdate = await client.orders.update(
        {
          id: orderId,
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
      console.log('billingAddrResult?.id',billingAddrResult?.id, order.billing_address);      

      setOrder(orderUpdate);
    },
    [order, getOrderId, client]
  );

  const updateMetadata = useCallback(
    async <T = any>(metaField: string, value: T) => {
      const id = await getOrderId();

      const result = await client.orders.update(
        {
          id,
          metadata: {
            ...(order?.metadata && {
              ...order.metadata,
            }),
            [metaField]: value,
          },
        },
        DEFAULT_ORDER_PARAMS
      );

      setOrder(result);
    },
    [order, client, getOrderId]
  );

  const placeOrder = useCallback(
    async () => {
      const id = await getOrderId();
      const result = await client.orders.update({
        id,
        _place: true
      }, DEFAULT_ORDER_PARAMS);

      setOrder(result);
    },
    [client, getOrderId]
  );

  const getPaymentMethods = useCallback(async () => {
    const orderId = await getOrderId();

    return client.orders.available_payment_methods(orderId);
  }, [client, getOrderId]);

  return {
    isError,
    isLoading,
    error,
    client,
    order,
    getOrderId,
    getOrder,
    addToCart,
    updateItemQuantity,
    addCustomer,
    addAddresses,
    getAddresses,
    updateMetadata,
    placeOrder,
    getPaymentMethods
  };
};

export default useCommerceLayer;
