import { PSE_STEPS_TO_VERIFY } from "@/constants/checkout.constants";
import { classNames } from "@/utils/functions";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo } from "react";
import CheckoutContext from "../../../context/Checkout";
interface IChekoutLayoutProps {
  children: React.ReactNode;
}

const DEFAULT_PAYMENT_METHOD = "pse";


const CheckoutLayout: React.FC<IChekoutLayoutProps> = ({ children }) => {
  const { asPath, push } = useRouter();
  const {
    order,
    setPaymentMethod,
    addPaymentMethodSource,
    placeOrder,
    setDefaultShippingMethod,
  } = useContext(CheckoutContext);

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    return order.line_items;
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
    if (asPath.startsWith("/checkout/pse") && !order?.line_items.length) {
      push("/checkout/pse/verify");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath, order]);

  const onPlaceOrder = async () => {
    try {
      /**
       * Before of place a order we've had to:
       * 1. Have Setted a shipping method
       * 2. Have Setted a payment method
       * 3. Have Added a payment method source
       */
      const paymentMethodId = order.available_payment_methods.find(
        (i) => i.reference === DEFAULT_PAYMENT_METHOD
      )?.id;
      await Promise.all([
        setDefaultShippingMethod(),
        setPaymentMethod(paymentMethodId),
        addPaymentMethodSource(),
      ]);

      await placeOrder();
      window.location.href =
        "https://www.psepagos.co/PSEHostingUI/InvoicesTicketOffice.aspx?ID=9524";
    } catch (error) {
      console.error(error);
      alert("Error al Realizar el pedido");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 2md:grid-cols-3 gap-y-6 2md:gap-x-6 mt-[84px] mb-[180px]">
        <div className="col-span-2">{children}</div>
        {products.length > 0 && (
          <article className="bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] w-full h-fit">
            <div className="flex flex-col gap-[17px] w-full h-full text-justify">
              <h4 className="text-blue-dark">Detalle de tu pedido</h4>
              {products?.map((product, i) => (
                <div className="flex justify-center" key={i}>
                  {product?.image_url && (
                    <figure
                      className={classNames("w-full relative aspect-[214/214]")}
                    >
                      <Image
                        src={product?.image_url}
                        alt={product?.name}
                        className="h-full w-full object-cover"
                        fill
                      />
                    </figure>
                  )}
                </div>
              ))}
              <div className="p-5 flex flex-col gap-3">
                <p className="text-neutral-20">Productos</p>
                {products?.map((product, i) => (
                  <div key={i}>
                    <div className="relative">
                      <div className="grid grid-cols-2">
                        <p className="">{product.name}</p>
                        <span className="text-center text-blue-dark">
                          {product?.formatted_unit_amount}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <p>Cantidad</p>
                        <span className="text-center text-blue-dark">
                          {product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 bg-neutral-90 rounded justify-items-center p-1 mt-[17px]">
                  <p className="font-bold">TOTAL</p>
                  <span className="font-bold">
                    {order?.formatted_total_amount_with_taxes}
                  </span>
                </div>
                {isComplete && (
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
    </>
  );
};

export default CheckoutLayout;
