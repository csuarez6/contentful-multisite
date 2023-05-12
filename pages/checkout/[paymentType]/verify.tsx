import { ReactElement, useContext, useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import CheckoutContext from "@/context/Checkout";
import { useLastPath } from "@/hooks/utils/useLastPath";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { defaultLayout } from "../../_app";
import { VantiOrderMetadata } from "@/constants/checkout.constants";
import AuthContext from "@/context/Auth";

const CheckoutVerify = () => {
  const router = useRouter();
  const lastPath = useLastPath();

  const { isLogged } = useContext(AuthContext);
  const {
    order,
    flow,
    updateMetadata,
    updateItemQuantity,
    addLoggedCustomer
  } = useContext(CheckoutContext);

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    return order.line_items;
  }, [order]);

  const isCompleted = useMemo(
    () => !!order?.metadata?.[VantiOrderMetadata.HasPersonalInfo],
    [order]
  );

  const PATH_BASE = useMemo(
    () => `/checkout/${router.query.paymentType}`,
    [router.query]
  );

  const handleNext = async () => {
    try {
      if (!products.length) return;

      const meta = {
        [VantiOrderMetadata.IsVerified]: true
      };

      if (isLogged) {
        await addLoggedCustomer();

        meta[VantiOrderMetadata.HasPersonalInfo] = true;
      }

      await updateMetadata(meta);

      router.push(`${PATH_BASE}/${flow.getNextStep(lastPath, isLogged)}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <HeadingCard
      classes="col-span-2"
      title="1. Verificar tu compra"
      icon="verify-purchase"
      isCheck={isCompleted}
    >
      <div className="flex flex-col sm:-mx-6 md:mx-0">
        {/* Start Heading */}
        <div className="grid grid-template-product font-bold text-blue-dark border-b border-grey-60 text-md">
          <div className="text-left py-3.5 pl-4 sm:pl-6 md:pl-0">
            <span>Productos</span>
          </div>
          <div className="hidden sm:inline-block py-3.5 px-3 text-center">
            <span>Cantidad</span>
          </div>
          <div className="hidden sm:inline-block py-3.5 text-right pr-1">
            <span>Precio</span>
          </div>
        </div>
        {/* End Heading */}

        {products.map((product) => (
          <div className="grid grid-template-product-details border-b" key={product.id}>
            <div className="row-start-1 row-end-4 py-3.5">
              <figure className="relative w-16 shrink-0">
                {product?.image_url && (
                  <Image
                    className="w-full h-full"
                    src={product?.image_url}
                    alt={product?.name}
                    width={64}
                    height={64}
                    priority
                  />
                )}
              </figure>
            </div>
            <div className="text-left py-3.5 pl-4 text-grey-30 text-md font-bold">
              {product?.name}
            </div>
            <div className="hidden sm:inline-block py-3.5 px-3 text-blue-dark mx-auto">
              <div className="w-32 custom-number-input h-9">
                <div className="relative flex flex-row w-full h-full bg-transparent rounded-lg">
                  <button
                    data-action="decrement"
                    className="w-20 h-full border border-r-0 outline-none cursor-pointer rounded-l-3xl"
                    onClick={() =>
                      updateItemQuantity(
                        product?.sku_code,
                        product?.quantity - 1
                      )
                    }
                  >
                    <span className="m-auto">−</span>
                  </button>
                  <input
                    type="text"
                    className="flex items-center w-full text-center outline-none border-y focus:outline-none text-md md:text-basecursor-default"
                    name="custom-input-number"
                    value={product?.quantity}
                    readOnly
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
            </div>
            <div className="hidden sm:inline-block py-3.5 text-right text-blue-dark text-md pr-1">
              {product.formatted_unit_amount}
            </div>
            <div className="text-left py-1 pl-4 text-grey-30 text-sm">
              1 año de garantía extendida <button className="text-blue-500 hover:text-blue-800 ml-2">Cambiar</button>
            </div>
            <div className="text-center">
              <span className="hidden sm:inline-block bg-blue-50 rounded-lg mx-auto p-1 text-size-span">x10</span>
            </div>
            <div className="hidden sm:inline-block py-1 text-right text-blue-dark text-sm pr-1">
              $ 150.000,00
            </div>
            <div className="text-left py-1 pl-4 text-grey-30 text-sm">
              Servicio de instalación <button className="text-blue-500 hover:text-blue-800 ml-2">Cambiar</button>
            </div>
            <div className="text-center">
              <span className="hidden sm:inline-block bg-blue-50 rounded-lg mx-auto p-1 text-size-span">x10</span>
            </div>
            <div className="hidden sm:inline-block py-1 text-right text-blue-dark text-sm pr-1">
              $ 150.000,00
            </div>
            <div className="col-start-1 col-end-3 bg-blue-50 mt-3"></div>
            <div className="hidden sm:inline-block mt-3 py-1 text-center text-blue-dark text-md bg-blue-50 font-bold">Total Producto</div>
            <div className="hidden sm:inline-block mt-3 py-1 text-right text-blue-dark text-md bg-blue-50 font-bold pr-1">
              {product.formatted_total_amount}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center">
        {products.length < 1 && (
          <div className="mr-5 mt-6">
            <p>Su compra está vacía</p>
          </div>
        )}
        {!products.length ? (
          <CustomLink
            content={{ urlPath: "/gasodomesticos" }}
            linkClassName="button button-primary mt-6"
          >
            Ir a la tienda
          </CustomLink>
        ) : (
          <button onClick={handleNext} className="mt-6 button button-primary">
            Continuar
          </button>
        )}
      </div>
    </HeadingCard>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 3);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: "Orden - Verificar",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

CheckoutVerify.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutVerify;
