import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import CheckoutContext from "@/context/Checkout";
import { useLastPath } from "@/hooks/utils/useLastPath";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { defaultLayout } from "../../_app";
import { VantiOrderMetadata } from "@/constants/checkout.constants";
import AuthContext from "@/context/Auth";
import InformationModal from "@/components/organisms/Information-modal/InformationModal";
import { classNames } from "@/utils/functions";
import { ModalIntall } from "@/components/blocks/product-details/ProductConfig";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";

const CheckoutVerify = () => {
  const router = useRouter();
  const lastPath = useLastPath();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    icon: "",
    type: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isActivedModal, setIsActivedModal] = useState(false);
  const [paramModal, setParamModal] = useState<IPromoContent>();
  const [modalChild, setmodalChild] = useState<any>();
  const [installCurrent, setinstallCurrent] = useState<any>();
  // const [warrantyCheck, setWarrantyCheck] = useState({});
  // const [installCheck, setInstallCheck] = useState({});
  const defaultInstallList = {
    id: "defInstall1",
    name: "Sin intalación",
    formatted_price_amount: "$0"
  };
  // const defaultWarrantyList = {
  //   id: "defWarranty1",
  //   name: "Sin garantia",
  //   formatted_price_amount: "$0"
  // };
  const [installList, setInstallList] = useState<any>([{ ...defaultInstallList }]);
  // const [warrantyList, setWarrantyList] = useState<any>([{ ...defaultWarrantyList }]);

  const servicesHandler = (type: string, params) => {
    console.info(params);
    if (type === "warranty") {
      // setWarrantyCheck(params);
    }
    if (type === "installation") {
      // setInstallCheck(params);
    }
  };

  const updateInstallCurrent = (value) => {
    setinstallCurrent(value);
  };

  const { isLogged } = useContext(AuthContext);
  const { order, flow, updateMetadata, updateItemQuantity, addLoggedCustomer } =
    useContext(CheckoutContext);

  const products = useMemo(() => {
    if (!order?.line_items) return [];
    const adjustmentsList = (order.line_items).filter(item => item.item_type === "adjustments");
    const productsList = (order.line_items)
      .filter(item => item.item_type === "skus")
      .map((item) => {
        const installAdjItem = (adjustmentsList).filter(adjItem => adjItem.item.metadata.sku_id === item.id && adjItem.item.metadata.type === "installation");
        const warrantyAdjItem = (adjustmentsList).filter(adjItem => adjItem.item.metadata.sku_id === item.id && adjItem.item.metadata.type === "warranty");
        item["installlation_service"] = installAdjItem;
        item["warranty_service"] = warrantyAdjItem;
        return item;
      });
    return productsList;
  }, [order]);

  //   useEffect(() => {
  //     (async () => {
  //         try {
  //             if (category.clInstallationReference) {
  //                 const infoSkuInstall = await getSkuList(category.clInstallationReference);
  //                 if (infoSkuInstall) {
  //                     setInstallList([defaultInstallList, infoSkuInstall.data]);
  //                 }
  //             }
  //             if (category.clWarrantyReference) {
  //                 const infoSkuWarra = await getSkuList(category.clWarrantyReference);
  //                 if (infoSkuWarra) {
  //                     setWarrantyList([defaultInstallList, infoSkuWarra.data]);
  //                 }
  //             }
  //         } catch (error) {
  //             console.error("Error at: ProductService", error);
  //         }
  //     })();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category]);

  const isCompleted = useMemo(
    () => !!order?.metadata?.[VantiOrderMetadata.HasPersonalInfo],
    [order]
  );

  const PATH_BASE = useMemo(
    () => `/checkout/${router.query.paymentType}`,
    [router.query]
  );

  const openModal = (optionsList?: any) => {
    setParamModal({
      promoTitle: "Instala tu gasodoméstico",
    });
    setmodalChild(
      <ModalIntall
        optionsList={optionsList}
        onEventHandler={servicesHandler}
        installCurrent={installCurrent}
        upInstallCurrent={updateInstallCurrent}
      />
    );
    setIsActivedModal(false);
    setTimeout(() => {
      setIsActivedModal(true);
    }, 200);
  };

  const handleNext = async () => {
    try {
      if (!products.length) {
        setError(true);
        setErrorMessage({
          icon: "alert",
          type: "warning",
          title: "No hay productos en el carrito",
        });
        return;
      }

      const meta = {
        [VantiOrderMetadata.IsVerified]: true,
      };

      if (isLogged) {
        await addLoggedCustomer();

        meta[VantiOrderMetadata.HasPersonalInfo] = true;
      }

      await updateMetadata(meta);

      router.push(`${PATH_BASE}/${flow.getNextStep(lastPath, isLogged)}`);
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: "Algo a salido mal",
      });
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setInstallList([{ ...defaultInstallList }]);
  }, []);

  return (
    <HeadingCard
      classes="col-span-2"
      title="1. Verificar tu compra"
      icon="verify-purchase"
      isCheck={isCompleted}
    >
      <div className="flex flex-col sm:-mx-6 md:mx-0">
        {/* Start Heading */}
        <div className="grid font-bold border-b grid-template-product text-blue-dark border-grey-60 text-md">
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

        {products.map((product) => {
          return (<div
            className="grid border-b grid-template-product-details"
            key={product.id}
          >
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
              <CustomLink
                content={{ urlPath: `/api/showproduct/${encodeURIComponent(product?.sku_code ?? "")}` }}
              >
                {product?.name}
              </CustomLink>
            </div>
            <div className="hidden sm:inline-block py-3.5 pb-0 px-3 text-blue-dark mx-auto">
              <div className="w-32 custom-number-input h-9">
                <div className="relative flex flex-row w-full h-full bg-transparent rounded-lg">
                  <button
                    data-action="decrement"
                    className="w-20 h-full border border-r-0 outline-none cursor-pointer rounded-l-3xl"
                    disabled={product?.quantity == 1}
                    onClick={() => {
                      setIsLoading(true);
                      updateItemQuantity(
                        product?.sku_code,
                        product?.quantity - 1
                      ).then(result => {
                        if (result.status !== 200) {
                          setError(true);
                          setErrorMessage({
                            icon: "alert",
                            type: "warning",
                            title: `Ocurrió un error con el producto seleccionado, por favor intente nuevamente.`,
                          });
                        }
                      }).finally(() => setIsLoading(false));
                    }}
                  >
                    <span className={classNames(
                      "m-auto",
                      product?.quantity == 1 ? "opacity-25" : ""
                    )}>−</span>
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
                    onClick={() => {
                      setIsLoading(true);
                      updateItemQuantity(
                        product?.sku_code,
                        product.quantity + 1
                      ).then(result => {
                        if (result.status !== 200) {
                          const message = result.status === 422 ? `No hay más unidades disponibles para el producto seleccionado.` : 'Ocurrió un error al agregar más unidades al producto, por favor intente nuevamente';
                          setError(true);
                          setErrorMessage({
                            icon: "alert",
                            type: "warning",
                            title: message,
                          });
                        }
                      }).finally(() => setIsLoading(false));
                    }}
                  >
                    <span className="m-auto">+</span>
                  </button>
                </div>
              </div>
              <button
                className="text-xs text-blue-500 hover:text-blue-800"
                onClick={() => {
                  setIsLoading(true);
                  updateItemQuantity(
                    product?.sku_code,
                    0
                  ).then(result => {
                    if (result.status !== 200) {
                      setError(true);
                      setErrorMessage({
                        icon: "alert",
                        type: "warning",
                        title: `Ocurrió un error al eliminar el producto seleccionado, por favor intente nuevamente.`,
                      });
                    }
                  }).finally(() => setIsLoading(false));
                }}>Eliminar</button>
            </div>
            <div className="inline-block py-3.5 text-right text-blue-dark text-md pr-1">
              {product.formatted_unit_amount}
            </div>
            {/* ********* Services ******** */}
            <div className="py-1 pl-4 text-sm text-left text-grey-30">
              Garantía extendida{" "}
              {product["warranty_service"].length > 0 &&
                <>
                  <br /><b>{product["warranty_service"][0]["name"]}</b>
                </>
              }
              <button className="ml-2 text-xs text-blue-500 hover:text-blue-800">
                Cambiar
              </button>
            </div>
            <div className="px-3 text-right">
              <span className="inline-block p-1 mx-auto rounded-lg bg-blue-50 text-size-span">
                {(product["warranty_service"].length > 0) ? product["warranty_service"][0]["quantity"] : "0"}x
              </span>
            </div>
            <div className="inline-block py-1 pr-1 text-sm text-right text-blue-dark">
              {(product["warranty_service"].length > 0) ? product["warranty_service"][0]["formatted_total_amount"] : "$0"}
            </div>
            <div className="py-1 pl-4 text-sm text-left text-grey-30">
              Servicio de instalación{" "}
              {product["installlation_service"].length > 0 &&
                <>
                  <br /><b>{product["installlation_service"][0]["name"]}</b>
                </>
              }
              <button
                className="ml-2 text-xs text-blue-500 hover:text-blue-800"
                onClick={() => openModal(installList)}
              >
                Cambiar
              </button>
            </div>
            <div className="px-3 text-right">
              <span className="inline-block p-1 mx-auto rounded-lg bg-blue-50 text-size-span">
                {(product["installlation_service"].length > 0) ? product["installlation_service"][0]["quantity"] : "0"}x
              </span>
            </div>
            <div className="inline-block py-1 pr-1 text-sm text-right text-blue-dark">
              {(product["installlation_service"].length > 0) ? product["installlation_service"][0]["formatted_total_amount"] : "$0"}
            </div>
            {/* ********* End Services ******** */}
            <div className="col-start-1 col-end-3 mt-3 bg-blue-50"></div>
            <div className="inline-block py-1 mt-3 font-bold text-center text-blue-dark text-md bg-blue-50">
              Total Producto
            </div>
            <div className="inline-block py-1 pr-1 mt-3 font-bold text-right text-blue-dark text-md bg-blue-50">
              {product.formatted_total_amount}
            </div>
          </div>);
        })}
      </div>
      <div className="flex items-center justify-end">
        {products.length < 1 && (
          <div className="mt-6 mr-5">
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
      {error && (
        <InformationModal
          icon={errorMessage.icon}
          type={errorMessage.type}
          title={errorMessage.title}
          close={() => setError(false)}
        />
      )}
      {isLoading && (
        <div
          role="status"
          className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-25"
        >
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-gray-200 animate-spin fill-blue-dark"
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
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {isActivedModal && (
        <ModalSuccess {...paramModal} isActive={isActivedModal}>
          {modalChild}
        </ModalSuccess>
      )}
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
  const footerInfo = await getMenu(
    DEFAULT_FOOTER_ID,
    context.preview ?? false,
    3
  );
  const helpButton = await getMenu(
    DEFAULT_HELP_BUTTON_ID,
    context.preview ?? false
  );

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
