import { ReactElement, useContext, useMemo } from "react";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "src/context/Checkout";
import { useRouter } from "next/router";
import { useLastPath } from "src/hooks/utils/useLastPath";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";

const STEP_META_FIELD = 'isVerified';

const CheckoutVerify = () => {
  const router = useRouter();
  const lastPath = useLastPath();

  const { order, flow, updateMetadata, updateItemQuantity } = useContext(CheckoutContext);

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    return order.line_items;
  }, [order]);

  const isStepCompleted = useMemo(() => !!order?.metadata?.[STEP_META_FIELD], [order]);

  const handleNext = async () => {
    await updateMetadata(STEP_META_FIELD, true);
    router.push(`/checkout/${router.query.paymentType}/${flow.getNextStep(lastPath)}`);
  };

  return (<>
      <h2>
        <span>Verificar tu compra</span>
        <input type="checkbox" checked={isStepCompleted} readOnly/>
      </h2>
      <table>
        <thead>
          <tr>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => <tr key={i}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.formatted_total_amount}</td>
            <td>
              <button
                className="p-2"
                onClick={() => updateItemQuantity(product.sku_code, product.quantity + 1)}
              >+
              </button>
              <button
                className="p-2"
                onClick={() => updateItemQuantity(product.sku_code, product.quantity - 1)}
              >-
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>

      <button onClick={handleNext}>
        Continuar
      </button>
    </>
  );
};

CheckoutVerify.getInitialProps = () => {
  return {
    layout: {
      name: mockPageLayoutProps.data.name,
      footerInfo: mockPageLayoutProps.data.layout.footerInfo,
      headerInfo: mockPageLayoutProps.data.layout.headerInfo,
    },
  };
};

CheckoutVerify.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutVerify;