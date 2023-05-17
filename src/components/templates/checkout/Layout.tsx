import { PSE_STEPS_TO_VERIFY } from "@/constants/checkout.constants";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import CheckoutContext from "../../../context/Checkout";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { MocksModalSuccessProps } from "@/components/organisms/modal-success/ModalSuccess.mocks";
import uuid from "react-uuid";
import InformationModal from "@/components/organisms/Information-modal/InformationModal";

interface IChekoutLayoutProps {
  children: React.ReactNode;
}

const DEFAULT_PAYMENT_METHOD = "dummy";

const CheckoutLayout: React.FC<IChekoutLayoutProps> = ({ children }) => {
  const { asPath, push } = useRouter();
  const {
    order,
    tokenRecaptcha,
    setPaymentMethod,
    addPaymentMethodSource,
    placeOrder,
    setDefaultShippingMethod,
    validateExternal,
  } = useContext(CheckoutContext);
  const [openDummyPGModal, setOpenDummyPGModal] = useState(false);
  const [transactionToken, setTransactionToken] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    icon: "",
    type: "",
    title: "",
  });

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    return order.line_items.filter(i => i.sku_code);
  }, [order]);

  const isComplete = useMemo(
    () =>
      order &&
      PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every(
        (i) => i
      ),
    [order]
  );

  // This hook redirect to first checkout screen if there  isn't produtcs
  useEffect(() => {
    if (!order) return;
    if (asPath.startsWith("/checkout/pse") && !order?.line_items?.length) {
      push("/checkout/pse/verify");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath, order]);

  /**
   * Before of place a order we've had to:
   * 1. Have Setted a shipping method
   * 2. Have Setted a payment method
   * 3. Have Added a payment method source
   */
  const onPlaceOrder = async () => {
    try {
      await validateExternal(tokenRecaptcha);

      const token = uuid();

      const paymentMethodId = order.available_payment_methods.find(
        (i) => i.reference === DEFAULT_PAYMENT_METHOD
      )?.id;

      await Promise.all([
        setDefaultShippingMethod(),
        setPaymentMethod(paymentMethodId),
      ]);
      await addPaymentMethodSource(token),

        await placeOrder();

      setOpenDummyPGModal(true);
      setTransactionToken(token);

    } catch (error) {
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: "Error al Realizar la orden",
      });
      console.error(error);
    }
  };

  const handlePayment = async (toCancel = false) => {
    try {
      const path = `/api/payments/${transactionToken}` + (toCancel ? `/cancel` : '');
      await fetch(path, {
        method: "POST",
      });
      const title = !toCancel ? "Pagado con éxito" : "Cancelado por usuario";
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: title,
      });
      push('/');

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
        {products.length > 0 && (
          <article className="bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] w-full h-fit">
            <div className="flex flex-col gap-[17px] w-full h-full text-justify">
              <h4 className="text-blue-dark border-b border-blue-dark pb-3">Detalle de tu pedido</h4>
              <div className="flex flex-col gap-3">
                {products?.map((product, i) => (
                  <>
                    <div className="grid grid-cols-1 text-sm" key={"product-name" + i}>
                      <p className="">{product.name}</p>
                    </div>
                    <div className="grid grid-cols-2 text-sm border-b border-gray-300 mb-2 pb-2" key={"product-count" + i}>
                      <p>Cantidad: {product.quantity}</p>
                      <span className="text-right text-blue-dark">
                        {product?.formatted_unit_amount}
                      </span>
                    </div>
                  </>
                ))}
                <div className="grid grid-cols-2 rounded mt-2">
                  <p className="font-bold text-left">TOTAL A PAGAR</p>
                  <span className="font-bold text-right">
                    {order?.formatted_total_amount_with_taxes}
                  </span>
                </div>
                {isComplete && tokenRecaptcha && (
                  <button
                    onClick={onPlaceOrder}
                    className="button button-primary w-full mt-[17px]"
                  >
                    Comprar
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
          <div className="w-full flex justify-end gap-5">
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
