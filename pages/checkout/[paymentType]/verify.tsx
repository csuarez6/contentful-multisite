import {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import CheckoutContext from "@/context/Checkout";
import { useLastPath } from "@/hooks/utils/useLastPath";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
  DEFAULT_WARRANTY_COPY,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import CheckoutLayout from "@/components/templates/checkout/Layout";
import HeadingCard from "@/components/organisms/cards/heading-card/HeadingCard";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { defaultLayout } from "../../_app";
import {
  PSE_STEPS_TO_VERIFY,
  VantiOrderMetadata,
} from "@/constants/checkout.constants";
import AuthContext from "@/context/Auth";
import InformationModal from "@/components/organisms/Information-modal/InformationModal";
import { classNames, formatPrice, showProductTotal } from "@/utils/functions";
import {
  ModalIntall,
  ModalWarranty,
} from "@/components/blocks/product-details/ProductConfig";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { IAdjustments } from "@/lib/services/commerce-layer.service";
import Link from "next/link";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import { getDataContent } from "@/lib/services/richtext-references.service";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import { IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import Spinner from "@/components/atoms/spinner/Spinner";

const CheckoutVerify = (props: IPage & IProductOverviewDetails) => {
  const { copyServices } = props;
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
  const defaultInstallList = {
    id: "defInstall1",
    name: "Sin servicio de instalación",
    formatted_price_amount: "$0",
  };
  const defaultWarrantyList = {
    id: "defWarranty1",
    name: "Sin garantía extendida",
    formatted_price_amount: "$0",
  };
  const [skuOptionsGlobal, setSkuOptionsGlobal] = useState<any>([]);
  const [shippingMethodGlobal, setShippingMethodGlobal] = useState<any>([]);
  const productSelected = useRef(null);
  const fechRequestStatus = useRef(false);
  const [showWarranty, setShowWarranty] = useState<boolean>(true);
  const [showInstallation, setShowInstallation] = useState<boolean>(true);

  const { isLogged, user } = useContext(AuthContext);
  const {
    order,
    flow,
    updateMetadata,
    updateItemQuantity,
    addLoggedCustomer,
    getSkuList,
    changeItemService,
    getShippingMethods,
    hasShipment
  } = useContext(CheckoutContext);

  const products = useMemo(() => {
    setIsLoading(false);
    if (!order?.line_items) return [];
    return order.line_items;
  }, [order]);

  const servicesHandler = async (type: string, params) => {
    const productItem = productSelected.current;
    const itemService = order.line_items
      .filter((item) => item.id === productItem)
      .map((item) => {
        return item;
      });
    const dataAdjustment: IAdjustments = {
      name: params.name + " - " + itemService?.[0]?.["sku_code"],
      amount_cents:
        type === "warranty"
          ? (
            (Number(params["price_amount_float"]) *
              Number(itemService[0]["unit_amount_float"])) /
            100
          ).toString()
          : params["price_amount_float"],
      type: type === "warranty" ? "warranty" : "installation",
      sku_id: itemService?.[0]?.["id"],
      sku_code: itemService?.[0]?.["sku_code"],
      sku_name: itemService?.[0]?.["name"],
      sku_option_id: params.id,
      sku_option_name: params.name,
      categoryReference: params.reference,
    };
    if (fechRequestStatus.current) return;
    fechRequestStatus.current = true;
    if (type === "warranty")
      await changeItemService(
        itemService?.[0]?.["warranty_service"]?.[0]?.["id"],
        dataAdjustment,
        itemService?.[0]?.["quantity"],
        productItem
      );
    if (type === "installation")
      await changeItemService(
        itemService?.[0]?.["installlation_service"]?.[0]?.["id"],
        dataAdjustment,
        itemService?.[0]?.["quantity"],
        productItem
      );
    setTimeout(() => {
      fechRequestStatus.current = false;
    }, 1000);
    setIsActivedModal(false);
  };

  const updateInstallCurrent = (value) => {
    console.info(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const infoSkus = await getSkuList();
        const shippingMethod = await getShippingMethods();
        if (shippingMethod) setShippingMethodGlobal(shippingMethod);
        if (infoSkus) {
          setSkuOptionsGlobal(infoSkus.data);
        }
      } catch (error) {
        console.error("Error at: ProductService", error);
      }
    })();
    setShowWarranty(
      !!copyServices.find((i) => i.key === "show.warranty")?.active
    );
    setShowInstallation(
      !!copyServices.find((i) => i.key === "show.installation")?.active
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCompleted = useMemo(
    () =>
      order &&
      PSE_STEPS_TO_VERIFY.map((step) => !!order.metadata?.[step]).every(
        (i) => i
      ),
    [order]
  );

  const PATH_BASE = useMemo(
    () => `/checkout/${router.query.paymentType}`,
    [router.query]
  );

  const openModal = (
    category?: string,
    type?: string,
    idService?: string,
    idProduct?: string,
    productCategory?: string
  ) => {
    productSelected.current = idProduct;
    const productPriceItem = order?.line_items.find(
      (i) => i.id === idProduct
    )?.unit_amount_float;
    const compareCategory = category ?? productCategory;
    const skusOptions = skuOptionsGlobal.filter(
      (item) => item.reference === compareCategory
    );
    const posSkuIdService = skusOptions.findIndex((x) => x.id === idService);
    setParamModal({
      promoTitle:
        type === "installlation_service"
          ? "Instala tu gasodoméstico"
          : "Servicio Garantía",
    });
    if (type === "installlation_service") {
      setmodalChild(
        <ModalIntall
          optionsList={[defaultInstallList, ...skusOptions]}
          onEventHandler={servicesHandler}
          installCurrent={posSkuIdService + 1}
          upInstallCurrent={updateInstallCurrent}
        />
      );
    } else {
      setmodalChild(
        <ModalWarranty
          optionsList={[defaultWarrantyList, ...skusOptions]}
          onEventHandler={servicesHandler}
          installCurrent={posSkuIdService + 1}
          upInstallCurrent={updateInstallCurrent}
          productPrice={productPriceItem}
        />
      );
    }
    setIsActivedModal(false);
    setTimeout(() => {
      setIsActivedModal(true);
    }, 200);
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
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
        meta["name"] = user.metadata?.name;
        meta["lastName"] = user.metadata?.lastName;
        meta["cellPhone"] = user.metadata?.cellPhone;
        meta["documentType"] = user.metadata?.documentType;
        meta["documentNumber"] = user.metadata?.documentNumber;
      }

      await updateMetadata(meta);

      router.push(`${PATH_BASE}/${flow.getNextStep(lastPath)}`);
    } catch (error) {
      setIsLoading(true);
      console.error(error);
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: "Algo a salido mal",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const dropServices = (product) => {
    if (product) {
      if (!showWarranty && product["warranty_service"]?.length > 0) {
        productSelected.current = product.id;
        servicesHandler("warranty", [defaultWarrantyList][0]);
      }
      if (!showInstallation && product["installlation_service"]?.length > 0) {
        productSelected.current = product.id;
        servicesHandler("installation", [defaultInstallList][0]);
      }
    }
  };

  const increDecreQuantity = (product, operator) => {
    const quantityTemp = (operator == "plus") ? product?.quantity + 1 : product?.quantity - 1;
    setIsLoading(true);
    if (quantityTemp > 90) {
      setError(true);
      setErrorMessage({
        icon: "alert",
        type: "warning",
        title: "Cantidad de productos no permitida.",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    }
    updateItemQuantity(
      product?.sku_code,
      quantityTemp
    )
      .then((result) => {
        if (result.status !== 200) {
          const messageMinus = "Ocurrió un error con el producto seleccionado, por favor intente nuevamente.";
          const messagePlus =
            result.status === 422
              ? `No hay más unidades disponibles para el producto seleccionado.`
              : "Ocurrió un error al agregar más unidades al producto, por favor intente nuevamente";
          setError(true);
          setErrorMessage({
            icon: "alert",
            type: "warning",
            title: (operator == "plus") ? messagePlus : messageMinus,
          });
        }
      })
      .catch((err) => console.error({ err }))
      .finally(() => setIsLoading(false));
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

        {products.map((product: any) => {
          return (
            <div
              className="flex flex-wrap border-b sm:grid grid-template-product-details"
              key={`cart-product-${product.id}`}
            >
              <div className="row-start-1 row-end-5 py-3.5">
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
              <div className="w-[calc(100%_-_70px)] flex-grow sm:w-auto text-left py-3.5 pl-4 text-grey-30 text-md font-bold">
                <Link
                  href={`/api/showproduct/${encodeURIComponent(
                    product?.sku_code ?? ""
                  )}`}
                >
                  {product?.name}
                </Link>
                <p className="text-xs text-left text-grey-60">
                  * Precio IVA incluido
                </p>
              </div>
              <div className="inline-block py-3.5 pb-0 sm:px-3 text-blue-dark sm:mx-auto">
                <div className="w-32 custom-number-input h-9">
                  <div className="relative flex flex-row w-full h-full bg-transparent rounded-lg">
                    <button
                      data-action="decrement"
                      className="w-20 h-full border border-r-0 outline-none cursor-pointer rounded-l-3xl"
                      disabled={product?.quantity == 1}
                      onClick={() => {
                        increDecreQuantity(product, "minus");
                      }}
                    >
                      <span
                        className={classNames(
                          "m-auto",
                          product?.quantity == 1 ? "opacity-25" : ""
                        )}
                      >
                        −
                      </span>
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
                        increDecreQuantity(product, "plus");
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
                    updateItemQuantity(product?.sku_code, 0)
                      .then((result) => {
                        if (result.status !== 200) {
                          setError(true);
                          setErrorMessage({
                            icon: "alert",
                            type: "warning",
                            title: `Ocurrió un error al eliminar el producto seleccionado, por favor intente nuevamente.`,
                          });
                        }
                      })
                      .finally(() => setIsLoading(false));
                  }}
                >
                  Eliminar
                </button>
              </div>
              <div className="inline-block py-3.5 text-right ml-auto font-bold sm:m-0 text-blue-dark text-md pr-1">
                {product.formatted_unit_amount}
              </div>
              {/* Shipping */}
              <div className="w-full sm:hidden"></div>
              <>
                <div className="flex flex-col items-start py-1 text-sm text-left sm:block sm:pl-4 text-grey-30">
                  Costo Envío{" "}
                  {Object.entries(product.item.shipping_category).length > 0 && (
                    <>
                      <br />
                      <b>{product.item.shipping_category.name}</b>
                    </>
                  )}
                </div>
                <div className="px-3 text-right">
                  <span className="inline-block p-1 mx-auto rounded-lg bg-blue-50 text-size-span">
                    {Object.entries(product.item.shipping_category).length > 0 && hasShipment ? "1x" : "-"}
                  </span>
                </div>
                <div className="flex-grow inline-block py-1 pr-1 text-sm text-right ms:flex-grow-0 text-blue-dark">
                  {Object.entries(product.item.shipping_category).length > 0 && hasShipment
                    ? (shippingMethodGlobal.find((x) => x.name === product.item.shipping_category.name))?.formatted_price_amount
                    : "-"
                  }
                </div>
              </>
              {/* ********* Services ******** */}
              <div className="w-full mt-3 sm:hidden"></div>
              {showWarranty ? (
                <>
                  <div className="flex flex-col items-start py-1 text-sm text-left sm:block sm:pl-4 text-grey-30">
                    Garantía extendida{" "}
                    {product["warranty_service"]?.length > 0 && (
                      <>
                        <br />
                        <b>{product["warranty_service"][0]["name"]}</b>
                      </>
                    )}
                    <button
                      className="ml-2 text-xs text-blue-500 hover:text-blue-800"
                      onClick={() =>
                        openModal(
                          product["warranty_service"]?.[0]?.["item"]?.[
                          "metadata"
                          ]?.["categoryReference"] ??
                          product["clWarrantyReference"],
                          "warranty_service",
                          product["warranty_service"]?.[0]?.["item"]?.[
                          "metadata"
                          ]?.["sku_option_id"],
                          product.id,
                          product.metadata.clWarrantyReference
                        )
                      }
                    >
                      {product["warranty_service"]?.length > 0
                        ? "Cambiar"
                        : "Agregar"}
                    </button>
                  </div>
                  <div className="px-3 text-right">
                    <span className="inline-block p-1 mx-auto rounded-lg bg-blue-50 text-size-span">
                      {product["warranty_service"]?.length > 0
                        ? product["warranty_service"][0]["quantity"]
                        : "0"}
                      x
                    </span>
                  </div>
                  <div className="flex-grow inline-block py-1 pr-1 text-sm text-right text-blue-dark">
                    {product["warranty_service"]?.length > 0
                      ? product["warranty_service"][0]["formatted_unit_amount"]
                      : "$0"}
                  </div>
                </>
              ) : (
                <>
                  {dropServices(product)}
                </>
              )}
              <div className="w-full sm:hidden"></div>
              {showInstallation ? (
                <>
                  <div className="flex flex-col items-start py-1 text-sm text-left sm:block sm:pl-4 text-grey-30">
                    Servicio de instalación{" "}
                    {product["installlation_service"]?.length > 0 && (
                      <>
                        <br />
                        <b>{product["installlation_service"][0]["name"]}</b>
                      </>
                    )}
                    <button
                      className="ml-2 text-xs text-blue-500 hover:text-blue-800"
                      onClick={() =>
                        openModal(
                          product["installlation_service"]?.[0]?.["item"]?.[
                          "metadata"
                          ]?.["categoryReference"] ??
                          product["clInstallationReference"],
                          "installlation_service",
                          product["installlation_service"]?.[0]?.["item"]?.[
                          "metadata"
                          ]?.["sku_option_id"],
                          product.id,
                          product.metadata.clInstallationReference
                        )
                      }
                    >
                      {product["installlation_service"]?.length > 0
                        ? "Cambiar"
                        : "Agregar"}
                    </button>
                  </div>
                  <div className="px-3 text-right">
                    <span className="inline-block p-1 mx-auto rounded-lg bg-blue-50 text-size-span">
                      {product["installlation_service"]?.length > 0
                        ? product["installlation_service"][0]["quantity"]
                        : "0"}
                      x
                    </span>
                  </div>
                  <div className="flex-grow inline-block py-1 pr-1 text-sm text-right ms:flex-grow-0 text-blue-dark">
                    {product["installlation_service"]?.length > 0
                      ? product["installlation_service"][0][
                      "formatted_unit_amount"
                      ]
                      : "$0"}
                  </div>
                </>
              ) : (
                <>
                  {dropServices(product)}
                </>
              )}
              {/* ********* End Services ******** */}
              <div className="w-full col-start-1 col-end-3 mt-3 sm:w-auto bg-blue-50"></div>
              <div className="inline-block py-1 mt-3 font-bold text-center text-blue-dark text-md bg-blue-50">
                Total Producto
              </div>
              <div className="flex-grow inline-block py-1 pr-1 mt-3 font-bold text-right text-blue-dark text-md bg-blue-50">
                {/* {formatPrice(
                  showProductTotal(
                    product?.total_amount_float,
                    product?.["installlation_service"],
                    product?.["warranty_service"]
                  )
                )} */}
                {Object.entries(product.item["shipping_category"]).length > 0
                  ? formatPrice(
                    showProductTotal(
                      product?.total_amount_float,
                      product?.["installlation_service"],
                      product?.["warranty_service"]
                    ) +
                    (shippingMethodGlobal.find((x) => x.name === product.item["shipping_category"].name))?.price_amount_float
                  )
                  : formatPrice(
                    showProductTotal(
                      product?.total_amount_float,
                      product?.["installlation_service"],
                      product?.["warranty_service"]
                    )
                  )
                }
              </div>
            </div>
          );
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
            content={{ urlPaths: ["/gasodomesticos"] }}
            linkClassName="button button-primary mt-6"
          >
            Ir a la tienda
          </CustomLink>
        ) : (
          <button onClick={handleNext} className={classNames("mt-6 button button-primary relative flex items-center")} disabled={isLoading}>
            Continuar
            {isLoading && <Spinner position="absolute" />}
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

  const info = {
    __typename: CONTENTFUL_TYPENAMES.COPY_SET,
    sys: {
      id: DEFAULT_WARRANTY_COPY,
    },
  };
  const copyRes = await getDataContent(info);
  const copyServices = copyRes?.copiesCollection?.items;

  return {
    props: {
      layout: {
        name: "Carrito de compras",
        footerInfo,
        headerInfo,
        helpButton,
      },
      copyServices,
    },
    revalidate,
  };
};

CheckoutVerify.getLayout = (page: ReactElement, pageProps: any) => {
  return defaultLayout(<CheckoutLayout>{page}</CheckoutLayout>, pageProps);
};

export default CheckoutVerify;
