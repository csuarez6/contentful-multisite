import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import { GetStaticProps } from "next";
import Image from "next/image";

import Breadcrumbs from "@/components/blocks/breadcrumbs-block/Breadcrumbs";
import AcceptTerms from "@/components/blocks/callback-vantilisto/accept-terms";
import PersonalData from "@/components/blocks/callback-vantilisto/personal-data";
import Verify from "@/components/blocks/callback-vantilisto/verify";
import { useEffect, useState } from "react";

const defaultValues = {
  contractAccount: "",
  fullName: "",
  cellPhone: "",
  email: "",
  productName: "",
  sku: "",
  urlProduct: "",
  price: "",
  quantity: 1,
  amountOfFees: "12",
};

const getStepContent = (
  step: number,
  handleNext,
  formData,
  setFormData,
  productData,
  quantity,
  setQuantity,
  setCurrentStep
) => {
  switch (step) {
    case 2:
      return (
        <Verify
          handleNext={handleNext}
          formData={formData}
          setFormData={setFormData}
          productData={productData}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      );
    case 3:
      return (
        <AcceptTerms
          formData={formData}
          productData={productData}
          setCurrentStep={setCurrentStep}
        />
      );
    default:
      return (
        <PersonalData
          handleNext={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      );
  }
};

const CallbackPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sku, setSku] = useState(null);
  const [isFetchingSKU, setIsFetchingSKU] = useState(true);
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState(defaultValues);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateFormData = (newData) => setFormData({ ...formData, ...newData });
  const updateAmount = (price) => {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });
    const value = price * quantity;
    setAmount(formatter.format(value));
  };

  const getSKU = () => {
    const params = new URLSearchParams(location.search);
    const _SKU = params.get("sku");
    setSku(_SKU);
    setIsFetchingSKU(false);
    if (!_SKU) setIsLoading(false);
  };

  useEffect(() => {
    updateAmount(productData?._price);
    updateFormData({ quantity });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  useEffect(() => {
    if (sku && !productData) {
      fetch(`/api/product/${sku}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 404) {
            setErrorMessage(`Producto con SKU ${sku} no encontrado.`);
          } else {
            const {
              name,
              promoTitle,
              promoImage,
              price,
              _price,
              productsQuantity,
              urlPaths,
              priceVantiListo,
              priceGasodomestico
            } = res;
            const _product = {
              productName: promoTitle ?? name,
              price,
              _price,
              promoImage,
              sku,
              urlProduct: `${location.origin}${urlPaths?.[0] ?? ''}` ?? null,
              productsQuantity,
              priceVantiListo,
              priceGasodomestico
            };
            setProductData(_product);
            updateFormData(_product);
            updateAmount(_price);
          }
        })
        .catch((err) => {
          console.warn(err);
          if (!navigator.onLine)
            setErrorMessage(
              "Comprueba tu conexión a internet e intenta de nuevo por favor."
            );
          else
            setErrorMessage(
              `Ocurrió un error al obtener información del Producto con SKU ${sku}.`
            );
        })
        .finally(() => setIsLoading(false));
    } else if (!sku && isFetchingSKU) {
      getSKU();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku]);

  const handleNext = () => {
    setCurrentStep((step) => step + 1);
    window.scrollTo({ top: 0 });
  };

  const breadcrumbs = {
    items: [
      {
        promoTitle: "Hogares",
        internalLink: {
          urlPaths: ["/"],
        },
      },
      {
        promoTitle: "Vantilisto",
        internalLink: {
          urlPaths: ["/catalogo-vanti-listo"],
        },
      },
      {
        promoTitle: "Te llamamos",
        internalLink: {
          urlPaths: ["#"],
        },
      },
    ],
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className="main-container">
          <Breadcrumbs ctaCollection={breadcrumbs} />
          <section className="section flex flex-col md:flex-row gap-6">
            {isLoading && (
              <div
                role="status"
                className="w-full h-60 flex justify-center items-center"
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
            {sku && productData && !isLoading && (
              <div className="grid grid-cols-1 gap-6 2md:grid-cols-3">
                <div className="relative 2md:col-span-2">
                  {getStepContent(
                    currentStep,
                    handleNext,
                    formData,
                    setFormData,
                    productData,
                    quantity,
                    setQuantity,
                    setCurrentStep
                  )}
                </div>
                <article className="bg-white rounded-[20px] p-6 shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] w-full h-fit col-span-1">
                  <div className="flex flex-col gap-[17px] w-full h-full text-justify">
                    <h4 className="pb-3 border-b text-blue-dark border-blue-dark">Detalle de tu pedido</h4>
                    <div className="flex flex-col gap-3">
                      <div className="pb-2 mb-2 border-b border-gray-300">
                        <div className="flex items-start gap-2">
                          <figure className="w-16 shrink-0">
                            <Image
                              className="object-contain w-full h-full"
                              src={productData?.promoImage?.url}
                              alt={productData.promoImage.title}
                              width={64}
                              height={64}
                              priority
                            />
                          </figure>
                          <div className="flex-1">
                            <div className="grid grid-cols-1 text-sm mb-2">
                              <p className="font-bold">{productData?.productName}</p>
                              <p className="text-xs text-gray-600 text-right">* IVA incluido</p>
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                              <p>C/U:</p>
                              <p className="text-right text-blue-dark py-0.5 rounded-lg mr-2">1x</p>
                            </div>
                            <div className="grid grid-cols-3 text-sm">
                              <p className="font-bold col-span-1">Subtotal:</p>
                              <span className="text-right text-blue-dark col-span-2 font-bold">
                                {productData?.priceVantiListo ?? productData?.priceGasodomestico}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 mt-2 rounded">
                        <p className="font-semibold text-left">Costo de envío</p>
                        <span className="font-semibold text-right">-</span>
                      </div>
                      <div className="grid grid-cols-2 mt-2 rounded">
                        <p className="font-bold text-left">TOTAL A PAGAR</p>
                        <span className="font-bold text-right">{productData?.priceVantiListo ?? productData?.priceGasodomestico ?? amount}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}
            {!sku && !isLoading && (
              <div
                className="bg-lucuma-80 border border-lucuma rounded-md px-4 py-3 w-full max-w-xs md:max-w-2xl"
                role="alert"
              >
                <p className="text-black text-size-subtitle1 font-bold">¡Alerta!</p>
                <p className="text-black">
                  La URL es invalida, el SKU es obligatorio.
                </p>
              </div>
            )}
            {sku && errorMessage && !isLoading && (
              <div
                className="bg-red-100 border border-red-400 rounded-md px-4 py-3 w-full max-w-xs md:max-w-2xl"
                role="alert"
              >
                <p className="text-red-700 text-size-subtitle1 font-bold">
                  ¡Error!
                </p>
                <p className="text-red-600">{errorMessage}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 3);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  return {
    props: {
      layout: {
        name: "Callback Catálogo VantiListo",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default CallbackPage;
