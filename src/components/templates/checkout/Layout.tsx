import { PSE_STEPS_TO_VERIFY } from "@/constants/checkout.constants";
import Image from "next/image";
import { useContext, useMemo } from "react";
import CheckoutContext from "../../../context/Checkout";

interface IChekoutLayoutProps {
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<IChekoutLayoutProps> = ({ children }) => {
  const { order } = useContext(CheckoutContext);
  
  const products = useMemo(() => {
    if (!order?.line_items) return [];
    return order.line_items;
  }, [order]);

  const isComplete = useMemo(
    () =>
      order &&
      PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every(i => i),
    [order]
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>{children}</div>
      <div>
        <h2>Total</h2>
        {order?.formatted_total_amount_with_taxes}
        <br />
        Productos
        {products?.map((product, i) => (
          <figure key={i} className="max-w-max">
            <Image alt={product.name} src={product.image_url} width="200" height="200" />
          </figure>
        ))}
        <br />
        Cantidad: {order?.skus_count}
        {isComplete && <button className="p-4 bg-yellow-400">Comprar</button>}
      </div>
    </div>
  );
};

export default CheckoutLayout;
