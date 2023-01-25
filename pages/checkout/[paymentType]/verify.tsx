import { ReactElement, useContext, useMemo } from "react";
import { defaultLayout } from "../../_app";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import CheckoutContext from "@/context/Checkout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useLastPath } from "@/hooks/utils/useLastPath";
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
                    <div className="flex flex-col gap-3 xs:flex-row">
                      <figure className="relative shrink-0">
                        {product?.image_url && (
                          <Image
                            src={product?.image_url}
                            alt={product?.name}
                            width={64}
                            height={64}
                            priority
                          />
                        )}
                      </figure>
                      <div className="text-grey-30">{product?.name}</div>
                    </div>
                    <div className="mt-2 text-blue-dark sm:hidden">
                      Precio: {product?.formatted_unit_amount}
                    </div>
                  </td>
                  <td className="flex justify-center px-3 py-4">
                    <div className="w-32 custom-number-input h-9">
                      <div className="relative flex flex-row w-full h-full mt-1 bg-transparent rounded-lg">
                        <button
                          data-action="decrement"
                          className="w-20 h-full border border-r-0 outline-none cursor-pointer rounded-l-3xl"
                          onClick={() =>
                            updateItemQuantity(
                              product?.sku_code,
                              product?.quantity - 1
                            )
                          }
                          disabled={order?.skus_count < 2}
                        >
                          <span className="m-auto">−</span>
                        </button>
                        <input
                          type="text"
                          className="flex items-center w-full text-center outline-none border-y focus:outline-none text-md md:text-basecursor-default"
                          name="custom-input-number"
                          value={product?.quantity}
                        ></input>
                        <button
                          data-action="increment"
                          className="w-20 h-full border border-l-0 cursor-pointer rounded-r-3xl"
                          onClick={() =>
                            updateItemQuantity(
                              product?.sku_code,
                              product.quantity + 1
                            )
                          }
                        >
                          <span className="m-auto">+</span>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-3 pr-4 text-sm text-right text-blue-dark sm:pr-6 md:pr-0 sm:table-cell">
                    {product.formatted_total_amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button onClick={handleNext} className="mt-6 button button-primary">
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