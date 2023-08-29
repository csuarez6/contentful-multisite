import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CommerceLayer, { AddressCreate, LineItem, Order, QueryParamsRetrieve } from "@commercelayer/sdk";
import { CL_ORGANIZATION } from "@/constants/commerceLayer.constants";
import { getMerchantToken, IAdjustments } from "@/lib/services/commerce-layer.service";
import AuthContext from "@/context/Auth";
import { useRouter } from "next/router";
import { IAlly, ILineItemExtended } from "@/lib/interfaces/ally-collection.interface";
import { ILoggedErrorCollection } from "@/lib/interfaces/commercelayer-extend.interface";
const INVALID_ORDER_ID_ERROR = "INVALID_ORDER_ID";
const DEFAULT_SHIPPING_METHOD_ID = "dOLWPFmmvE"; //Temp
const DEFAULT_ORDER_PARAMS: QueryParamsRetrieve = {
  include: ["line_items", "line_items.item", "line_items.shipment_line_items", "line_items.item.shipping_category", "available_payment_methods", "shipments", "shipments.shipping_method", "shipments.available_shipping_methods", "customer"],
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
      "total_amount_with_taxes_float",
      "line_items",
      "customer",
      "metadata",
      "customer_email",
      "available_payment_methods",
      "shipments",
    ],
    addresses: ["state_code", "city", "line_1", "phone"],
    shipments: ["available_shipping_methods", "stock_location"],
    line_items: [
      "item_type",
      "image_url",
      "name",
      "sku_code",
      "formatted_unit_amount",
      "quantity",
      "formatted_total_amount",
      "total_amount_cents",
      "total_amount_float",
      "unit_amount_cents",
      "unit_amount_float",
      "item",
      "metadata",
      "shipment_line_items"
    ],
    customer: ["id"],
  },
};

// useCommercelayer - start
export const useCommerceLayer = () => {
  const { clientLogged, user } = useContext(AuthContext);
  const [tokenRecaptcha, setTokenRecaptcha] = useState<any>();
  const [order, setOrder] = useState<Order>();
  const [isFetchingOrder, setIsFetchingOrder] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<boolean>(false);
  const [hasShipment, setHasShipment] = useState<boolean>(false);
  const [productUpdates, setProductUpdates] = useState([]);
  const { asPath } = useRouter();
  const [timeToPay, setTimeToPay] = useState<number>();
  const orderId = useMemo(() => order?.id, [order]);
  const [isInitialRender, setIsInitialRender] = useState<boolean>();
  const [localOrderId, setLocalOrderId] = useState<string>();
  const [isPaymentProcess, setisPaymentProcess] = useState(false);

  /**
   * Set localStorage and State Order ID
   */
  useEffect(() => {
    (async () => {
      try {
        setLocalOrderId(localStorage.getItem('orderId'));
        setOrderError(!orderId || !localOrderId);
      } catch (error) {
        console.error("Error at: useCommerceLayer setLocalOrderID", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, orderError, localOrderId]);

  const generateClient = async () => {
    try {
      const accessToken = await getMerchantToken();
      if (!accessToken) throw new Error("CREDENTIALS_ERROR");
      return CommerceLayer({ accessToken, organization: CL_ORGANIZATION });
    } catch (error) {
      console.error("Error at: useCommerceLayer getSalesChannelToken", error);
      throw error;
    }
  };

  const getUpdateOrderAdmin = async (idOrder?: string, params?: QueryParamsRetrieve, checkUpdates = false) => {
    let data = { status: 400, data: "Error updating order", productUpdates: [] };
    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        idOrder: idOrder,
        orderParams: params,
        checkUpdates
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          data = json;
        } else {
          console.error("Error get UpdateOrderAdmin");
          data = { status: 400, data: "Error updating order - 1", productUpdates: [] };
        }
      }).catch((error) => {
        console.error({ error });
      });

    return data;
  };

  const getSkuList = async (filter?: string) => {
    let data = { status: 400, data: "Error Util_SkuList" };
    await fetch("/api/sku-options", {
      method: "POST",
      body: JSON.stringify({
        filter: filter,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          data = json;
        } else {
          console.error("Error Util sku-options");
        }
      }).catch((error) => {
        console.error({ error });
      });
    return data;
  };

  const getOrder = useCallback(async (checkUpdates?: boolean) => {
    setIsFetchingOrder(true);
    try {
      const idOrder = localStorage.getItem("orderId");

      if (!idOrder) throw new Error(INVALID_ORDER_ID_ERROR);

      const orderResp = await getUpdateOrderAdmin(idOrder, DEFAULT_ORDER_PARAMS, checkUpdates);

      if (checkUpdates) setProductUpdates(orderResp.productUpdates);

      const order = orderResp.data as unknown as Order;

      if (!["draft", "pending"].includes(order.status)) {
        throw new Error(INVALID_ORDER_ID_ERROR);
      }

      setIsFetchingOrder(false);
      return order;
    } catch (error) {
      console.warn(INVALID_ORDER_ID_ERROR, "Creating new draft order");
      const client = await generateClient();
      const draftOrder = await client.orders.create({}).catch(err => err.errors);
      if (draftOrder[0]?.status !== 200) localStorage.setItem("orderId", draftOrder.id);
      setIsFetchingOrder(false);
      return draftOrder;
    }
  }, []);

  const reloadOrder = useCallback(async (checkUpdates?: boolean) => {
    try {
      const order = await getOrder(checkUpdates);
      setOrder(order);
      return { status: 200, data: 'success at reload order' };
    } catch (error) {
      console.error('error reloadOrder ', error);
      return { status: 400, data: 'error at reload order' };
    }

  }, [getOrder]);

  /**
   * Function to SetUP the Order on the Context 
   */
  const setUpOrder = useCallback(async (checkUpdates: boolean) => {
    try {
      const order = await getOrder(checkUpdates);
      setOrder(order);
    } catch (error) {
      console.error("Error at: useCommerceLayer getOrder, setOrder", error);
    }
  }, [getOrder]);

  /**
   * Set the order only once for performance (in the initial render of the context)
   */
  useEffect(() => {
    (async () => {
      if (typeof isInitialRender == "undefined") setIsInitialRender(true);
      if (isInitialRender) {
        await setUpOrder(false);
        setIsInitialRender(false);
      }
    })();
  }, [isInitialRender, setUpOrder]);

  /**
   * If the user is going to use the cart, in each window the order will be refreshed. (for check the prices and inventory)
   */
  useEffect(() => {
    const checkUpdates = asPath.startsWith("/checkout/pse");
    if (checkUpdates && isInitialRender === false) setUpOrder(true);
  }, [asPath, isInitialRender, setUpOrder]);

  const addToCart = useCallback(
    async (skuCode: string, productImage: string, productName: string, category?: object) => {
      try {
        const client = await generateClient();
        const resCreate: any = await client.line_items.create({
          quantity: 1,
          name: productName,
          image_url: productImage,
          sku_code: skuCode,
          _update_quantity: true,
          metadata: {
            clWarrantyReference: category?.["clWarrantyReference"],
            clInstallationReference: category?.["clInstallationReference"],
          },
          order: {
            type: "orders",
            id: orderId,
          }
        }).catch(err => err.errors);

        const orderRes = await reloadOrder();
        if (resCreate?.[0]?.status) return { status: parseInt(resCreate[0].status), data: resCreate[0].title };
        if (orderRes?.[0]?.status) return { status: parseInt(orderRes[0].status), data: 'error at add to card' };
        const infoResp = {
          message: 'product add to card',
          quantity: resCreate.quantity,
          id: resCreate.id
        };
        return { status: 200, data: infoResp };

      } catch (error) {
        console.error('error add to card', error);
        return { status: 500, data: 'error at add to card' };
      }

    },
    [orderId, reloadOrder]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  );

  const updateItemQuantity = async (skuCode: string, quantity: number) => {
    try {
      const client = await generateClient();
      const lineItem = order.line_items.find((i) => i.sku_code === skuCode);
      let response : Promise<LineItem> | ILoggedErrorCollection;
      
      if (quantity > 0) {
        response = await client.line_items.update({ id: lineItem.id, quantity }).catch(err => err);
        
        if ('errors' in response && (await client.line_items.retrieve(lineItem.id))?.quantity !== quantity) { // It checks if has ocurred an error and the quantity was updated in fact 
          console.info("error in sku line item", response.errors);
          return { status: parseInt(response.errors[0].status), data: response.errors[0].title };
        } else {
          try {
            const warrantyServicePromise = lineItem["warranty_service"] && lineItem["warranty_service"].length > 0
              ? client.line_items.update({ id: lineItem["warranty_service"][0].id, quantity })
              : Promise.resolve();

            const installationServicePromise = lineItem["installlation_service"] && lineItem["installlation_service"].length > 0
              ? client.line_items.update({ id: lineItem["installlation_service"][0].id, quantity })
              : Promise.resolve();

            // Send all of requests at the same time
            const [warrantyResult, installationResult] = await Promise.allSettled([warrantyServicePromise, installationServicePromise]);

            // Validate if happened any errors with the requests 
            if (warrantyResult.status === 'rejected' || installationResult.status === 'rejected') {
              console.error('Error with any update promise, see:', warrantyResult, installationResult);
              throw new Error("Error with any service update promise");
            }

          } catch (nestedErr) {
            console.error("General error in the update", nestedErr);
            return { status: 500, data: nestedErr.message };
          } finally {
            await reloadOrder();
          }
        }
      } else {
        try {
          const warrantyServicePromise = lineItem["warranty_service"] && lineItem["warranty_service"].length > 0
              ? client.line_items.delete(lineItem["warranty_service"][0].id)
              : Promise.resolve();

          const installationServicePromise = lineItem["installlation_service"] && lineItem["installlation_service"].length > 0
              ? client.line_items.delete(lineItem["installlation_service"][0].id)
              : Promise.resolve();

          const skuPromise = client.line_items.delete(lineItem.id).catch(err => err);
          
          // Send all of requests at the same time
          const [warrantyResult, installationResult, skuResult] = await Promise.allSettled([warrantyServicePromise, installationServicePromise, skuPromise]);

          // Validate if happened any errors with the requests 
          if (skuResult.status === 'rejected' || warrantyResult.status === 'rejected' || installationResult.status === 'rejected') {
            console.error('Error with any delete promise, see:', warrantyResult, installationResult, skuResult);
            throw new Error("Error in the quantity updating process");
          }
        } catch (nestedErr) {
          console.error("Error deleting product and services", nestedErr);
          return { status: 500, data: nestedErr.message };
        } finally {
          await reloadOrder();
        }
      }

      return { status: 200, data: 'success update item' };

    } catch (err) {
      console.error('An general error has ocurred when updateItemQuantity was running:', err);
      return { status: 500, data: "General error, please see the system logs" };
    }
  };

  const requestService = async (data: IAdjustments, orderId: string, quantity: string) => {
    await fetch("/api/product/service-adition", {
      method: "POST",
      body: JSON.stringify({
        data,
        orderId,
        quantity
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json())
      .then(async (json) => {
        if (json.status === 200 && json.data != null) {
          console.info(json);
        } else {
          console.error("Error requestService or Null");
        }
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(async () => { await reloadOrder(); });
  };

  const changeItemService = async (idItemDelete: string, newAdjustment: IAdjustments, quantity: number, idProductOrigin: string) => {
    try {
      let response;
      const lineItem = order.line_items.find((i) => i.id === idProductOrigin);
      const checkItem = newAdjustment.type === "warranty" ? lineItem?.["warranty_service"] : lineItem?.["installlation_service"];
      const client = await generateClient();
      if (checkItem.length > 0) {
        response = await client.line_items.delete(checkItem[0].id).catch(err => err.errors);
        if (response?.[0]?.status) {
          return { status: parseInt(response[0].status), data: response[0].title };
        }
      }
      if (!isNaN(parseInt(newAdjustment.amount_cents))) {
        await requestService(newAdjustment, order.id, quantity.toString() ?? "1");
      }
      await reloadOrder();

    } catch (err) {
      console.error('error', err);
      return { status: 500, data: 'Error changing item-service' };
    }
  };

  const deleteItemService = async (idItemsDelete: Array<string>) => {
    try {
      const client = await generateClient();
      idItemsDelete.forEach(async idElement => {
        await client.line_items.delete(idElement).catch(err => err.errors);
      });
      await reloadOrder();

    } catch (err) {
      console.error('error', err);
      return { status: 500, data: 'Error Deleting item-service' };
    }
  };

  const addLoggedCustomer = useCallback(async () => {
    if (!clientLogged) throw new Error("unauthorized");
    await clientLogged.orders.update(
      {
        id: orderId,
        customer: {
          id: user.id,
          type: "customers",
        },
      },
      DEFAULT_ORDER_PARAMS
    );
  }, [user?.id, clientLogged, orderId]);

  const addCustomer = useCallback(
    async ({ email, name, lastName, cellPhone, documentType, documentNumber }) => {
      const client = await generateClient();
      await client.orders.update(
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
            documentType,
            documentNumber,
            hasPersonalInfo: true,
          },
        },
        DEFAULT_ORDER_PARAMS
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);

  const getAddresses = useCallback(async () => {
    const client = await generateClient();
    const [shippingAddress, billingAddress] = await Promise.all([
      client.orders?.shipping_address(orderId),
      client.orders?.billing_address(orderId),
    ]);

    return {
      shippingAddress,
      billingAddress,
    };
  }, [orderId]);

  const getCustomerAddresses = useCallback(async () => {
    if (!clientLogged) return [];
    return clientLogged.customer_addresses.list();
  }, [clientLogged]);

  const addAddresses = useCallback(
    async (shippingAddress: AddressCreate, billingAddress?: AddressCreate) => {

      const client = await generateClient();
      const [shippingAddrResult, billingAddrResult] = await Promise.all([
        client.addresses.create(shippingAddress),
        ...(billingAddress ? [client.addresses.create(billingAddress)] : []),
      ]);

      await client.orders.update(
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
    },
    [order]
  );

  const updateMetadata = useCallback(
    async (metadata: Record<string, any>) => {
      const client = await generateClient();
      await client.orders.update(
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
    },
    [order, orderId]
  );

  const getPaymentMethods = useCallback(async () => {
    const client = await generateClient();
    return client.orders.available_payment_methods(orderId);
  }, [orderId]);

  const setPaymentMethod = useCallback(
    async (paymentMethodId: string) => {
      const client = await generateClient();
      await client.orders.update(
        {
          id: orderId,
          payment_method: {
            id: paymentMethodId,
            type: "payment_methods",
          },
        },
        DEFAULT_ORDER_PARAMS
      ).catch(err => console.error('setPaymentMethod', err));
    },
    [orderId]
  );

  const addPaymentMethodSource = useCallback(
    async (token: string) => {
      const client = await generateClient();
      await client.external_payments.create({
        payment_source_token: token,
        order: {
          id: orderId,
          type: "orders",
        },
      });
    },
    [orderId]
  );

  const getShippingMethods = useCallback(async () => {
    const client = await generateClient();
    // return client.orders.available_payment_methods(orderId);
    return client.shipping_methods.list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const setDefaultShippingMethod = useCallback(async (hasShipment) => {
    // ************** CODE PREV
    // const shipmentId = order.shipments.at(0)?.id;
    // const client = await generateClient();
    // await client.shipments.update({
    //   id: shipmentId,
    //   shipping_method: {
    //     id: DEFAULT_SHIPPING_METHOD_ID,
    //     type: "shipping_methods",
    //   },
    // }).catch(err => console.error('error set default shipping method', err.errors));
    // ************** END CODE PREV
    const client = await generateClient();
    const shipments = order.shipments;
    const allies = [];
    order?.line_items?.forEach((line_item: ILineItemExtended) => {
      try {
        let targetIndex = allies.findIndex((value: IAlly) => value.id === line_item.item.shipping_category.id);
        if (targetIndex === -1) {
          allies.push({ ...line_item.item.shipping_category });
          targetIndex = allies.length - 1;
        }
        if (!(allies[targetIndex]?.line_items)) allies[targetIndex].line_items = [];
        delete line_item?.item?.shipping_category;
        allies[targetIndex].line_items.push({ ...line_item });
      } catch (iteration_error) {
        console.error("ShippingMethod: An error has ocurred when the iteration line_item by ally was executed with the object:", line_item, "the error:", iteration_error);
      }
    });
    shipments.forEach(async (el, index) => {
      const availableMethods = el.available_shipping_methods;
      const methodID = availableMethods.find((item) => item.name === allies[index].name);
      const methodIdCheck = (methodID) ? methodID.id : DEFAULT_SHIPPING_METHOD_ID;
      await client.shipments.update({
        id: el.id,
        shipping_method: {
          id: (hasShipment) ? methodIdCheck : DEFAULT_SHIPPING_METHOD_ID,
          type: "shipping_methods",
        },
      }).catch(err => console.error('error set default shipping method', err.errors));
    });
  }, [order]);

  const placeOrder = useCallback(async () => {
    try {
      const client = await generateClient();
      const response = await client.orders.update(
        {
          id: orderId,
          _place: true,
        },
        DEFAULT_ORDER_PARAMS
      )
        .then(() => {
          return { status: 200, data: 'esta todo ok' };
        })
        .catch(err => {
          console.error('error place order', err.errors);
          return { status: 500, data: err.errors };
        });
      return response;
    } catch (error) {
      console.error('error place order', error);
      return { status: 500, data: error };
    }
  }, [orderId]);

  const validateExternal = useCallback(
    async (recapchaResponse: string) => {
      const client = await generateClient();
      await client.orders.update(
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
    },
    [orderId, order]
  );

  const checkCurrentPrices = useCallback(() => {
    console.warn(order);
    return [
      {
        sku: "Therm 1400 F 12 lt",
        productName: "Calendator 12LT Tiro Forzado THERM1400F Bosh",
      }
    ];
  }, [order]);

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

  const onHasShipment = async (e) => {
    try {
      if (!e || e === "not authorized") {
        setHasShipment(false);
        return;
      }
      setHasShipment(e);
    } catch (error) {
      console.error(error);
    }
  };

  const upgradeTimePay = useCallback(
    async (time: number) => {
      setTimeToPay(time);
    }, []
  );

  const updateIsPaymentProcess = useCallback(
    async (value: boolean) => {
      setisPaymentProcess(value);
    }, []
  );

  return {
    order,
    orderError,
    productUpdates,
    tokenRecaptcha,
    timeToPay,
    onRecaptcha,
    onHasShipment,
    hasShipment,
    isFetchingOrder,
    getOrder,
    reloadOrder,
    addToCart,
    isPaymentProcess,
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
    getShippingMethods,
    validateExternal,
    getSkuList,
    changeItemService,
    checkCurrentPrices,
    deleteItemService,
    upgradeTimePay,
    updateIsPaymentProcess
  };
};

export default useCommerceLayer;
