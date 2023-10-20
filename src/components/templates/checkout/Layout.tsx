import { useCallback, useContext, useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import CheckoutContext from "../../../context/Checkout";
import { CHANGED_PRODUCTS_ERROR_MSG, FINAL_422_ERROR_MSG, NEXT_STEP_ERROR_MSG, PRICE_VALIDATION_ID } from "@/constants/checkout.constants";
import StepsLine from "@/components/organisms/line-step/StepsLine";
import { classNames, formatPrice, showProductTotal } from "@/utils/functions";
import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import ProductDetailsLayoutSkeleton from "@/components/skeletons/ProductDetailsLayoutSkeleton/ProductDetailsLayoutSkeleton";
import Icon from "@/components/atoms/icon/Icon";
import { gaEventPurchase } from "@/utils/ga-events--checkout";
import { gaEventForm } from "@/utils/ga-events--forms";
import { IP2PRequest } from "@/lib/interfaces/p2p-cf-interface";
import InformationModal from "@/components/organisms/Information-modal/InformationModal";
import { Order } from "@commercelayer/sdk";
import citiesFile from "@/utils/static/cities-co.json";

interface IChekoutLayoutProps {
  children: React.ReactNode;
}

const getStepsLine = (paymentType) => {
  return [
    {
      title: "Verificar tu compra",
      path: `/checkout/${paymentType}/verify`
    },
    {
      title: "Datos personales",
      path: `/checkout/${paymentType}/personal-info`
    },
    {
      title: "Ingresar dirección",
      path: `/checkout/${paymentType}/addresses`
    },
    {
      title: "Resumen",
      path: `/checkout/${paymentType}/summary`
    },
  ];
};

const CheckoutLayout: React.FC<IChekoutLayoutProps> = ({ children }) => {
  const { asPath, push, query } = useRouter();
  const stepsList = getStepsLine(query.paymentType);
  const currentStepList = stepsList.find(el => el.path === asPath);

  const {
    order: oderProp,
    tokenRecaptcha,
    reloadOrder,
    productUpdates,
    setPaymentMethod,
    setDefaultShippingMethod,
    getShippingMethods,
    validateExternal,
    hasShipment,
    isFetchingOrder,
    updateIsPaymentProcess,
    getOrderById,
    onHasShipment,
    isPolicyCheck
  } = useContext(CheckoutContext);
  const [onPayment, setOnPayment] = useState<boolean>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    icon: "",
    type: "",
    title: "",
    description: "",
  });
  const [isComplete, setIsComplete] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isFinishProductsLoading, setIsFinishProductsLoading] = useState(false);

  const asPathUrl = asPath.split("/")[3];
  const [shippingMethodGlobal, setShippingMethodGlobal] = useState<any>([]);
  const shippingCostTotal = useRef([]);
  const router = useRouter();
  const orderId = router.query.id?.toString();
  const [order, setOrder] = useState<Order>();

  // UseEffect for check order data if by Id or not
  useEffect(() => {
    (async () => {
      if (asPath.startsWith("/checkout/pse/purchase-order")) {
        const orderData = await getOrderById(orderId);
        setOrder(orderData.data);
      } else {
        setOrder(oderProp);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, oderProp]);
  // **********************************************

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    const items = order.line_items.filter((i) => i.sku_code);
    if (asPath.startsWith("/checkout/pse/purchase-order")) {
      setIsFinishProductsLoading(true);
    }
    return items;
  }, [asPath, order]);

  const validateOrder = async () => {
    setIsLoading(true);
    gaEventPurchase(order, shippingMethodGlobal);
    setOnPayment(true);
    updateIsPaymentProcess(true);
    await reloadOrder(true);
    setIsLoading(false);
  };

  // This hook redirect to first checkout screen if there  isn't produtcs
  useEffect(() => {
    if (!order) return;
    if (asPath.startsWith("/checkout/pse") && !order?.line_items?.length && !asPath.startsWith("/checkout/pse/purchase-order")) push("/checkout/pse/verify");
    setIsComplete(asPath.startsWith('/checkout/pse/summary'));
    shippmentdash(order?.shipping_address?.state_code, order?.shipping_address?.city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath, order]);

  useEffect(() => {
    (async () => {
      if (onPayment) {
        setOnPayment(false);
        if (productUpdates?.length === 0) {
          await onPayOrder();
        } else {
          setError(true);
          setErrorMessage({
            icon: "alert",
            type: "warning",
            title: "¡Vaya! Tenemos cambios",
            description: CHANGED_PRODUCTS_ERROR_MSG,
          });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUpdates]);

  useEffect(() => {
    (async () => {
      try {
        const shippingMethod = await getShippingMethods();
        if (shippingMethod) setShippingMethodGlobal(shippingMethod);
      } catch (error) {
        console.error("Error at: ProductService", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateIsPaymentProcess(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Before of place a order we've had to:
   * 1. Have Setted a shipping method
   * 2. Have Setted a payment method
   * 3. Have Added a payment method source
   */
  const onPayOrder = useCallback(async () => {
    setIsPaying(true);
    try {
      await validateExternal(tokenRecaptcha);
      await setDefaultShippingMethod(hasShipment);
      await setPaymentMethod();
      await handlePayment();
    } catch (error) {
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: "¡Ups!",
        description: NEXT_STEP_ERROR_MSG
      });
    }
    updateIsPaymentProcess(false);
    setIsPaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setDefaultShippingMethod,
    setPaymentMethod,
    tokenRecaptcha,
    validateExternal,
    order?.available_payment_methods,
  ]);

  const handlePayment = async (toCancel = false) => {
    try {
      const path = `/api/p2p` + (toCancel ? `/cancel` : "");
      await fetch(path, {
        method: "POST",
        body: JSON.stringify({
          orderId: order?.id
        }),
      })
        .then((response) => response.json())
        .then(async (json) => {
          if (json?.data?.status?.status === 'OK') {
            const data: IP2PRequest = json.data;
            const productsData = products.map(el => {
              return {
                product: el.name,
                sku: el.sku_code
              };
            });

            gaEventForm({
              category: "Checkout",
              label: "Compra de Productos",
              productsList: productsData,
            });

            push(data.processUrl);
          } else if (json?.error === 'AMOUNT_ERROR') {
            setError(true);
            setErrorMessage({
              icon: "alert",
              type: "warning",
              title: "¡Ups!",
              description: FINAL_422_ERROR_MSG
            });
          } else {
            throw new Error("Error create p2p session");
          }
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  const getShippingPrice = (product) => {
    const price = shippingMethodGlobal.find((x) => x.name === product.item.shipping_category.name)?.price_amount_float ?? 0;
    if (!shippingCostTotal.current.find((el) => el.product === product.id)) shippingCostTotal.current.push({ product: product.id, shippingCost: price });
    return price;
  };

  const breadcrumbsList: IPromoBlock =
  {
    ctaCollection: {
      items: [
        {
          promoTitle: "Hogares",
          internalLink: {
            urlPaths: ["/"]
          }
        },
        {
          promoTitle: "Mis Compras",
          internalLink: {
            urlPaths: ["/dashboard/orders"]
          }
        },
        {
          promoTitle: "Estado de Orden",
          internalLink: {
            urlPaths: ["/checkout/pse/purchase-order"]
          }
        },
      ]
    }
  };

  const shippmentdash = (state, cityWached) => {
    const cityCheck = citiesFile.filter(
      (city) =>
        city.admin_name === state &&
        city.city === cityWached
    );
    onHasShipment(cityCheck[0]?.isCovered == "false");
  };

  return (
    <>
      <h1 className="sr-only">
        {currentStepList ? `"Proceso de compra" - ${currentStepList?.title}` : "Checkout"}
      </h1>
      {asPathUrl === "purchase-order" && (
        <div className="hidden 2md:flex w-full main-container justify-end relative top-[17px] pt-2">
          <div className="top-[-15px] absolute left-0 main-container">
            <Breadcrumbs {...breadcrumbsList} />
          </div>
          <p className="font-bold 2md:text-2xl text-blue-dark">Resumen de compra</p>
        </div>
      )}
      <div className="main-container">
        <div className="grid grid-cols-1 2md:grid-cols-5 2lg:grid-cols-3 gap-y-6 2md:gap-x-6 pt-[84px] pb-[180px]">
          {currentStepList && (
            <div className="col-span-full">
              <StepsLine {...{ items: stepsList }} />
            </div>
          )}
          <div className="2md:col-span-3 2lg:col-span-2">
            {children}
          </div>
          {(products?.length > 0 || productUpdates?.length > 0) && (
            <article className="2md:col-span-2 2lg:col-span-1 bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] w-full h-fit">
              <div className="flex flex-col gap-[17px] w-full h-full text-justify">
                <h4 className="pb-3 border-b text-blue-dark border-blue-dark">
                  Detalle de tu pedido
                </h4>
                <div className="flex flex-col gap-3">
                  {(productUpdates?.length > 0) && (
                    <div className="w-full">
                      {productUpdates.map((productUpdate: any) => {
                        return (<div key={`product-update-payment-${productUpdate.id}`} className="px-3 py-2 mb-2 text-sm text-orange-700 bg-orange-100 border-l-4 border-orange-500">
                          El producto <Link href={`/api/showproduct/${encodeURIComponent(productUpdate?.sku_code ?? "")}`} className="inline-block font-bold underline">{productUpdate?.name}</Link> ha sido removido del carrito debido a que {productUpdate?.type === PRICE_VALIDATION_ID ? "cambió de precio" : "no hay unidades suficientes"}.
                        </div>);
                      })}
                    </div>
                  )}
                  {products?.map((product, i) => (
                    <div key={`lateral-product-overview-${product.id}`} className="pb-2 mb-2 border-b border-gray-300">
                      <div className="flex items-start gap-2">
                        <figure className="w-16 shrink-0">
                          {product?.image_url && (
                            <Image
                              className="object-contain w-full h-full"
                              src={product?.image_url}
                              alt={product?.name}
                              width={64}
                              height={64}
                              priority
                            />
                          )}
                        </figure>
                        <div className="flex-1">
                          {/* Start Product Information */}
                          <div
                            className="grid grid-cols-1 mb-2 text-sm"
                            key={"product-name" + i}
                          >
                            <p className="flex justify-between gap-3 mb-1 font-bold">
                              <span className="text-left">{product.name}</span>
                              <span className="text-base text-blue-dark">{(product.formatted_unit_amount).split(',')[0]}</span>
                            </p>
                            <p className="text-xs text-gray-600">* IVA incluido</p>
                            <p className="text-sm text-gray-600">
                              Cantidad: {" "} {product.quantity}
                            </p>
                          </div>
                          {/* End Product Information */}

                          {/* Start Product Warranty */}
                          {(product?.["warranty_service"] && product?.["warranty_service"].length > 0) && (
                            <div
                              className="grid grid-cols-3 text-sm"
                              key={"product-warranty-count" + i}
                            >
                              <p className="flex col-span-1">
                                <span>G.E:</span>
                                <span title="Garantía extendida" className="flex items-center ml-1 cursor-help">
                                  <Icon icon="info" size={18} className="text-gray-500" />
                                </span>
                              </p>

                              <p className="col-span-2 text-right text-blue-dark">
                                <span className="inline-block py-0.5 px-1 mx-auto rounded-lg bg-blue-100 font-bold text-size-span mr-2">
                                  {product["warranty_service"]?.length > 0
                                    ? product["warranty_service"][0]["quantity"]
                                    : "0"}
                                  x
                                </span>
                                <span>
                                  {formatPrice(product?.["warranty_service"][0].unit_amount_float)}
                                </span>
                              </p>
                            </div>
                          )}
                          {/* End Product Warranty */}

                          {/* Start Product Installation */}
                          {(product?.["installlation_service"] && product?.["installlation_service"].length > 0) && (
                            <div
                              className="grid grid-cols-3 text-sm"
                              key={"product-installation-count" + i}
                            >
                              <p className="flex col-span-1">
                                <span>S.I.:</span>
                                <span title="Servicio de instalación" className="flex items-center ml-1 cursor-help">
                                  <Icon icon="info" size={18} className="text-gray-500" />
                                </span>
                              </p>

                              <p className="col-span-2 text-right text-blue-dark">
                                <span className="inline-block py-0.5 px-1 mx-auto rounded-lg bg-blue-100 font-bold text-size-span mr-2">
                                  {product["installlation_service"]?.length > 0
                                    ? product["installlation_service"][0]["quantity"]
                                    : "0"}
                                  x
                                </span>
                                <span>
                                  {formatPrice(product?.["installlation_service"][0].unit_amount_float)}
                                </span>
                              </p>

                            </div>
                          )}
                          {/* Ent Product Installation */}

                          {/* Start Shipping Cost */}
                          <div
                            className="grid grid-cols-3 text-sm"
                            key={"product-unit-shipcost" + i}
                          >
                            <p className="flex col-span-1">
                              Envío:
                              {product?.item["shipping_category"] && Object.entries(product?.item["shipping_category"]).length > 0 && (
                                <span title={`Envío Marca: ${product.item["shipping_category"].name}`} className="flex items-center ml-1 cursor-help">
                                  <Icon icon="info" size={18} className="text-gray-500" />
                                </span>
                              )}
                            </p>
                            <p className="col-span-2 text-right text-blue-dark">
                              <span>
                                {product?.item["shipping_category"] && Object.entries(product?.item["shipping_category"]).length > 0
                                  ? (
                                    
                                    (shippingMethodGlobal.find((x) => x.name === product.item["shipping_category"].name))?.formatted_price_amount.split(',')[0]
                                    ?? formatPrice(product.item["shipping_category"].name)
                                  )
                                  : "$0"
                                }
                              </span>
                            </p>
                          </div>
                          {/* End Shipping Cost */}

                          {/* Start Product Subtotal Price */}
                          <div
                            className="grid grid-cols-3 text-sm"
                            key={"product-shipping" + i}
                          >
                            <p className="col-span-1 font-bold">Subtotal:</p>
                            <span className="col-span-2 font-bold text-right text-blue-dark">
                              {product?.item["shipping_category"] && Object.entries(product?.item["shipping_category"]).length > 0
                                ? formatPrice(
                                  showProductTotal(
                                    product?.total_amount_float,
                                    product?.["installlation_service"],
                                    product?.["warranty_service"]
                                  ) +
                                  getShippingPrice(product)
                                )
                                : formatPrice(showProductTotal(product?.total_amount_float, product?.["installlation_service"], product?.["warranty_service"]))
                              }
                            </span>
                          </div>
                          {/* End Product Subtotal Price */}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-1 rounded">
                    <p className="text-xs text-gray-600">
                      El costo de envío depende de la cobertura de Vanti y la marca de cada producto, de acuerdo a esto se realiza el cálculo del envío
                    </p>
                  </div>
                  <div className="grid grid-cols-2 mt-2 rounded">
                    <p className="font-bold text-left">TOTAL A PAGAR</p>
                    <span className="font-bold text-right">
                      { 
                        formatPrice(
                          order?.total_amount_float +
                          shippingCostTotal.current.reduce((acc, current) => acc + current.shippingCost, 0)
                        )
                      }
                    </span>
                  </div>
                  {isComplete && (
                    <button
                      onClick={validateOrder}
                      disabled={isLoading || isPaying || !tokenRecaptcha || !isPolicyCheck}
                      className={classNames(
                        "button button-primary w-full mt-[17px]",
                        (isLoading || isPaying)
                          ? "disabled flex items-center justify-center gap-3"
                          : ""
                      )}
                    >
                      {(isLoading || isPaying) && (
                        <svg
                          aria-hidden="true"
                          className="inline-block w-5 h-5 text-gray-200 animate-spin fill-blue-dark"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      )}
                      {isLoading ? "Validando" : (isPaying ? "Procesando" : "Comprar")}
                    </button>
                  )}
                </div>
              </div>
            </article>
          )}
          {(isFetchingOrder && !isFinishProductsLoading && products?.length === 0 && productUpdates?.length === 0) && (
            <ProductDetailsLayoutSkeleton />
          )}
          {(isFinishProductsLoading && products.length === 0) && (
            <article className="2md:col-span-2 2lg:col-span-1 bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] w-full h-fit">
              <div className="flex flex-col gap-[17px] w-full h-full text-justify">
                <h4 className="pb-3 border-b text-blue-dark border-blue-dark">
                  Detalle de tu pedido
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="px-3 py-2 mb-2 text-sm text-orange-700 bg-orange-100 border-l-4 border-orange-500">
                    No se puede mostrar el detalle del pedido
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
      {error && (
        <InformationModal
          icon={errorMessage.icon}
          type={errorMessage.type}
          title={errorMessage.title}
          description={errorMessage.description}
          close={() => setError(false)}
        />
      )
      }
    </>
  );
};

export default CheckoutLayout;
