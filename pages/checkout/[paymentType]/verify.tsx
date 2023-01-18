import { ReactElement, useContext, useMemo } from "react";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "src/context/Checkout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useLastPath } from "src/hooks/utils/useLastPath";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";

const STEP_META_FIELD = 'isVerified';

const CheckoutVerify = () => {
  const router = useRouter();
  const lastPath = useLastPath();

  const { order, flow, updateMetadata, updateItemQuantity } = useContext(CheckoutContext);

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    return order.line_items;
  }, [order]);

  const isCompleted = useMemo(() => !!order?.metadata?.[STEP_META_FIELD], [order]);

  const handleNext = async () => {
    if (!products.length) return;
    await updateMetadata(STEP_META_FIELD, true);
    router.push(`/checkout/${router.query.paymentType}/${flow.getNextStep(lastPath)}`);
  };

  return (
    <>
      <HeadingCard
        classes="col-span-2"
        title="1. Verificar tu compra"
        icon="verify-purchase"
        isCheck={isCompleted}
      >
        <div className="flex flex-col sm:-mx-6 md:mx-0">
          <table className="min-w-full divide-y divide-grey-60">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-blue-dark sm:pl-6 md:pl-0"
                >
                  Productos
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-center text-sm font-bold text-blue-dark sm:table-cell"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-bold text-blue-dark sm:table-cell"
                >
                  Precio
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-grey-60">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="flex gap-3 flex-col xs:flex-row">
                        <figure className="relative shrink-0">
                          <Image
                            src={product?.image_url}
                            alt={product?.name}
                            width={64}
                            height={64}
                            priority
                          />
                        </figure>
                      <div className="text-grey-30">{product?.name}</div>
                    </div>
                    <div className="mt-2 text-blue-dark sm:hidden">
                      Precio: {product?.formatted_total_amount}
                    </div>
                  </td>
                  <td className="py-4 px-3 flex justify-center">
                    <div className="custom-number-input h-9 w-32">
                      <div className="flex flex-row h-full w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" className="border border-r-0 h-full w-20 rounded-l-3xl cursor-pointer outline-none"
                          onClick={() => updateItemQuantity(product?.sku_code, product?.quantity - 1)} disabled={order?.skus_count < 2}
                        >
                          <span className="m-auto">−</span>
                        </button>
                        <input type="text" className="border-y outline-none focus:outline-none text-center w-full text-md md:text-basecursor-default flex items-center" name="custom-input-number" value={order?.skus_count} ></input>
                        <button data-action="increment" className="border border-l-0 h-full w-20 rounded-r-3xl cursor-pointer"
                          onClick={() => updateItemQuantity(product?.sku_code, product.quantity + 1)}
                        >
                          <span className="m-auto">+</span>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-3 pr-4 text-right text-sm text-blue-dark sm:pr-6 md:pr-0 sm:table-cell">{product.formatted_total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button onClick={handleNext} className="button button-primary mt-6">
            Continuar
          </button>
        </div>
      </HeadingCard>
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