import { PRICE_VALIDATION_ID, PSE_STEPS_TO_VERIFY } from "@/constants/checkout.constants";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CheckoutContext from "../../../context/Checkout";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { MocksModalSuccessProps } from "@/components/organisms/modal-success/ModalSuccess.mocks";
import uuid from "react-uuid";
import InformationModal from "@/components/organisms/Information-modal/InformationModal";
import { classNames } from "@/utils/functions";
import Link from "next/link";

interface IChekoutLayoutProps {
  children: React.ReactNode;
}

const DEFAULT_PAYMENT_METHOD = "dummy";

const CheckoutLayout: React.FC<IChekoutLayoutProps> = ({ children }) => {
  const { asPath, push } = useRouter();
  const {
    order,
    tokenRecaptcha,
    timeToPay,
    reloadOrder,
    productUpdates,
    setPaymentMethod,
    addPaymentMethodSource,
    placeOrder,
    setDefaultShippingMethod,
    validateExternal,
    upgradeTimePay,
  } = useContext(CheckoutContext);
  const [onPayment, setOnPayment] = useState<boolean>();
  const [openDummyPGModal, setOpenDummyPGModal] = useState(false);
  const [transactionToken, setTransactionToken] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    icon: "",
    type: "",
    title: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    return order.line_items.filter((i) => i.sku_code);
  }, [order]);

  const isComplete = useMemo(
    () =>
      order &&
      PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every(
        (i) => i
      ),
    [order]
  );

  const validateOrder = async () => {
    setIsLoading(true);
    setOnPayment(true);
    await reloadOrder(true);
    setIsLoading(false);
  };

  /**
   * Before of place a order we've had to:
   * 1. Have Setted a shipping method
   * 2. Have Setted a payment method
   * 3. Have Added a payment method source
   */
  const onPlaceOrder = useCallback(async () => {
    setIsLoading(true);
    try {
      await validateExternal(tokenRecaptcha);

      const token = uuid();

      const paymentMethodId = order.available_payment_methods.find(
        (i) => i.reference === DEFAULT_PAYMENT_METHOD
      )?.id;

      await setDefaultShippingMethod();
      await setPaymentMethod(paymentMethodId);
      await addPaymentMethodSource(token);
      await placeOrder()
        .then((res) => {
          if (res.status === 200) {
            setOpenDummyPGModal(true);
            setTransactionToken(token);
          }
        })
        .catch((err) => {
          console.error("error on place order", err);
          setError(true);
          if (!navigator.onLine)
            setErrorMessage({
              icon: "alert",
              type: "warning",
              title:
                "Comprueba tu conexión a internet e intenta de nuevo por favor.",
            });
          else
            setErrorMessage({
              icon: "alert",
              type: "warning",
              title: `Ocurrió un error al continuar con la pasarela de pagos.`,
            });
        })
        .finally();
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: "Error al Realizar la orden",
      });
    }
    setIsLoading(false);
  }, [
    addPaymentMethodSource,
    placeOrder,
    setDefaultShippingMethod,
    setPaymentMethod,
    tokenRecaptcha,
    validateExternal,
    order?.available_payment_methods,
  ]);

  // This hook redirect to first checkout screen if there  isn't produtcs
  useEffect(() => {
    if (!order) return;
    if (asPath.startsWith("/checkout/pse") && !order?.line_items?.length) {
      push("/checkout/pse/verify");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath, order]);

  useEffect(() => {
    (async () => {
      if (onPayment) {
        setOnPayment(false);
        if (productUpdates?.length === 0) {
          await onPlaceOrder();
        } else {
          setError(true);
          setErrorMessage({
            icon: "alert",
            type: "warning",
            title:
              "La orden ha tenido algunos cambios de especificaciones, por favor compruebe si desea continuar.",
          });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUpdates]);

  const handlePayment = async (toCancel = false) => {
    try {
      const path =
        `/api/payments/${transactionToken}` + (toCancel ? `/cancel` : "");
      await fetch(path, {
        method: "POST",
      });
      const title = !toCancel ? "Pagado con éxito" : "Cancelado por usuario";
      setError(true);
      setErrorMessage({
        icon: !toCancel ? "check" : "alert",
        type: !toCancel ? "success" : "warning",
        title: title,
      });
      if (!toCancel) {
        if (isNaN(timeToPay) || timeToPay === 0) {
          upgradeTimePay(30);
        }
      }
      push("/");
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: "Error en la pasarela de pago.",
      });
    } finally {
      setOpenDummyPGModal(false);
    }
  };

  return (
    <>
      <div className="main-container grid grid-cols-1 2md:grid-cols-3 gap-y-6 2md:gap-x-6 mt-[84px] mb-[180px]">
        <div className="col-span-2">{children}</div>
        {(products?.length > 0 || productUpdates?.length > 0) && (
          <article className="bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] w-full h-fit">
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
                  <div key={`lateral-product-overview-${product.id}`}>
                    <div
                      className="grid grid-cols-1 text-sm"
                      key={"product-name" + i}
                    >
                      <p className="">{product.name}</p>
                      <p className="text-xs">* IVA incluido</p>
                    </div>
                    <div
                      className="grid grid-cols-2 pb-2 mb-2 text-sm border-b border-gray-300"
                      key={"product-count" + i}
                    >
                      <p>Cantidad: {product.quantity}</p>
                      <span className="text-right text-blue-dark">
                        {product?.formatted_unit_amount}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 mt-2 rounded">
                  <p className="font-bold text-left">TOTAL A PAGAR</p>
                  <span className="font-bold text-right">
                    {order?.formatted_total_amount_with_taxes}
                  </span>
                </div>
                {isComplete && tokenRecaptcha && (
                  <button
                    onClick={validateOrder}
                    disabled={isLoading}
                    className={classNames(
                      "button button-primary w-full mt-[17px]",
                      isLoading
                        ? "disabled flex items-center justify-center gap-3"
                        : ""
                    )}
                  >
                    {isLoading && (
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
                    {isLoading ? "Validando" : "Comprar"}
                  </button>
                )}
              </div>
            </div>
          </article>
        )}
      </div>
      {openDummyPGModal && (
        <ModalSuccess
          {...MocksModalSuccessProps.modalLayout}
          isActive={openDummyPGModal}
        >
          <div className="flex justify-end w-full gap-5">
            <button
              className="button button-outline"
              onClick={() => {
                handlePayment(true);
              }}
            >
              Cancelar pago
            </button>
            <button
              className="button button-primary"
              onClick={() => {
                handlePayment();
              }}
            >
              Pagar
            </button>
          </div>
        </ModalSuccess>
      )}
      {error && (
        <InformationModal
          icon={errorMessage.icon}
          type={errorMessage.type}
          title={errorMessage.title}
          close={() => setError(false)}
        />
      )}
    </>
  );
};

export default CheckoutLayout;
