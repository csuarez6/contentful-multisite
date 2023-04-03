import Image from "next/image";
import { useRouter } from "next/router";
import {
  IProductOverviewDetails,
  PaymentMethodType,
} from "@/lib/interfaces/product-cf.interface";
import Carousel from "@/components/organisms/carousel/Carousel";
import Rating from "@/components/organisms/ratings/Rating";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { useContext, useEffect, useState } from "react";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { COMMERLAYER_MARKET_IDS } from "@/constants/commerceLayer.constants";
import CheckoutContext from "@/context/Checkout";
import FeaturedProduct from "@/components/organisms/cards/featured-product/FeaturedProduct";
import { scrollContent } from "@/utils/functions";
import { iconCallback, iconInvoice, iconPSE, ModalIntall, ModalShipping, options } from "./ProductConfig";

const ProductOverview: React.FC<IProductOverviewDetails> = ({
  name,
  promoTitle,
  promoDescription,
  price,
  productFeatures,
  onBuy,
  features,
  promoImage,
  imagesCollection,
  priceBefore,
  productsQuantity,
  promotion,
  sku,
  marketId,
  state,
  rating,
  warranty,
  relatedProducts
}) => {
  const router = useRouter();
  const { addToCart, reloadOrder } = useContext(CheckoutContext);
  const currentSlug = router.query?.slug?.length > 0 ? router.query.slug[0] : "/";
  const baseCallback = currentSlug === "catalogo-vanti-listo" ? "vantilisto" : "gasodomesticos";
  const callbackURL = `/callback/${baseCallback}?sku=${sku}`;

  const imagesCollectionLocal = [promoImage, ...imagesCollection.items];
  const [isActivedModal, setIsActivedModal] = useState(false);
  const [paramModal, setParamModal] = useState<IPromoContent>();
  const [modalChild, setmodalChild] = useState<any>();

  const openModal = (service: string) => {
    if (service === "shipping") {
      setParamModal({
        promoTitle: "Tipo de envío",
      });
      setmodalChild(<ModalShipping />);
    } else {
      setParamModal({
        promoTitle: "Instala tu gasodoméstico",
      });
      setmodalChild(<ModalIntall />);
    }
    setmodalChild(service === "shipping" ? <ModalShipping /> : <ModalIntall />);
    setIsActivedModal(false);
    setTimeout(() => {
      setIsActivedModal(true);
    }, 200);
  };

  const buyHandlerMap = {
    [PaymentMethodType.pse]: () => {
      router.push("/checkout/pse/verify");
    },
  };

  const onBuyHandler = async (type: PaymentMethodType) => {
    try {
      await addToCart(sku, promoImage.url, promoTitle);
      if (buyHandlerMap[type]) buyHandlerMap[type]();
    } catch (e) {
      const params = new URLSearchParams(location.search);
      const retry = params.get("retry");

      if (!retry) {
        localStorage.removeItem("orderId");
        await reloadOrder();
        router.push(`${router.asPath}?retry=1&payment_method=${type}`);
      }
    }
    if (onBuy) onBuy(type, sku, promoImage.url, promoTitle);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const retry = params.get("retry");
    const paymentMethod = params.get("payment_method");
    if (retry && paymentMethod) {
      onBuyHandler(paymentMethod as PaymentMethodType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <section className="bg-white section">
      <div className="flex flex-col gap-10 lg:gap-[72px]">
        <section className="flex flex-col gap-5 sm:gap-4 lg:flex-row xl:gap-9">
          <div className="w-full lg:w-1/2 xl:max-w-[595px] flex flex-col gap-6">

            {/* Section - Info product */}
            <div className="flex flex-col lg:hidden">
              {sku && (
                <div className="text-sm text-grey-30">
                  <p>CÓDIGO SKU: {sku}</p>
                </div>
              )}
              <h1 className="text-blue-dark title is-3">
                {promoTitle ?? name}
              </h1>
              <h2 className="text-blue-dark text-size-subtitle2">
                Marca y detalles generales
              </h2>
              <div className="flex flex-col sm:flex-row gap-[15px] md:items-center mt-[-1px]">
                {rating && (
                  <div className="flex gap-[11px] mt-[14px] pl-1">
                    <Rating numberStar={rating} />
                    <CustomLink
                      className="text-sm underline text-blue-dark"
                      content={{ externalLink: "#" }}
                    >
                      Lée mas opiniones
                    </CustomLink>
                  </div>
                )}
                <div className="flex gap-3">
                  {state && (
                    <div className="flex px-2 py-1 uppercase rounded-lg bg-category-orange-light h-fit">
                      <span className="title is-5">{state}</span>
                    </div>
                  )}
                  {promotion && (
                    <div className="flex px-2 py-1 text-center uppercase rounded-lg bg-category-sky-blue h-fit">
                      <span className="title is-5">{promotion}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* END Section - Info product */}

            {/* Section - Carousel */}
            {imagesCollectionLocal?.length > 0 && (
              <Carousel content={imagesCollectionLocal} enableLoop={false} />
            )}
            <div className="md:w-1/2 lg:mt-[30px] lg:ml-[70px] leading-none">
              <CustomLink
                className="text-sm underline text-grey-60 !leading-none"
                content={{
                  urlPath:
                    "politica-de-cambios-devoluciones-y-derecho-de-retracto",
                }}
              >
                Ten en cuenta nuestra política de cambios y devoluciones y
                derecho de retracto
              </CustomLink>
            </div>
            {/* END Section - Carousel */}

          </div>
          <div className="flex xl:flex-grow">
            <div className="flex flex-col w-full gap-9">
              <div className="hidden lg:flex flex-col gap-[10.5px]">
                {sku && (
                  <div className="text-sm text-grey-30">
                    <p>CÓDIGO SKU: {sku}</p>
                  </div>
                )}
                <h1 className="text-blue-dark title is-2">
                  {promoTitle ?? name}
                </h1>
                <h2 className="text-blue-dark text-size-subtitle1">
                  Marca y detalles generales
                </h2>
                <div className="flex flex-col sm:flex-row gap-[29px] md:items-center mt-[-1px] ml-1">
                  {rating && (
                    <div className="flex gap-[11px]">
                      <Rating numberStar={rating} />
                      <CustomLink
                        className="text-sm underline text-blue-dark"
                        content={{ externalLink: "#" }}
                      >
                        Lée mas opiniones
                      </CustomLink>
                    </div>
                  )}
                  <div className="flex gap-3">
                    {state && (
                      <div className="flex px-2 py-1 uppercase rounded-lg bg-category-orange-light h-fit">
                        <span className="title is-5">{state}</span>
                      </div>
                    )}
                    {promotion && (
                      <div className="flex px-2 py-1 text-center uppercase rounded-lg bg-category-sky-blue h-fit">
                        <span className="title is-5">
                          {promotion} de descuento
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Caracteristicas */}
              <div className="w-full flex flex-col-reverse sm:flex-row gap-[22px]">
                <div className="py-[2px] flex flex-col gap-[32px] lg:w-[43%] sm:w-1/2">
                  <div className="flex flex-col gap-[14px] bg-slate-50 p-3 rounded-xl">
                    <h4 className="text-blue-dark">
                      Características del producto
                    </h4>
                    {productFeatures && (
                      <div className="flex flex-col gap-[5px] text-blue-dark">
                        {documentToReactComponents(
                          productFeatures.json,
                          options
                        )}
                      </div>
                    )}
                    {features && (
                      <>
                        <CustomLink
                          className="underline text-[#035177] text-sm mt-[7px]"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollContent("content-features");
                          }}
                          content={{ externalLink: "#" }}
                        >
                          Revisa todas las carateristicas
                        </CustomLink>
                      </>
                    )}
                  </div>
                  <div className="bg-category-sky-blue-90 p-3 gap-[10px] flex flex-col rounded-xl w-full xl:w-full 2xl:w-full">
                    <p className="text-base md:text-size-subtitle1">
                      ¿Aún no tienes crédito con Vanti?
                    </p>
                    <div className="flex justify-between pl-[6px]">
                      <CustomLink
                        className="underline text-[#035177] text-sm mt-[7px]"
                        content={{
                          urlPath: "financiacion/vanti-listo",
                        }}
                      >
                        Conóce más
                      </CustomLink>
                      <figure className="w-[48px] h-[34px]">
                        <Image
                          className="w-full h-full"
                          width={48}
                          height={34}
                          src="/images/VantiListo.png"
                          alt="Conóce más - VantiListo"
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="pl-[11px] pt-1">
                    <div className="font-medium leading-4 text-blue-dark">
                      <div>
                        <p>¿Tienes dudas?</p>
                      </div>
                      <CustomLink
                        content={{
                          urlPath: "centro-de-ayuda/preguntas-frecuentes",
                        }}
                        className="text-sm underline text-blue-dark"
                      >
                        Revisa las dudas frecuentes
                      </CustomLink>
                    </div>
                    <div className="text-sm text-[#424242] font-medium mt-[37px] ml-[-11px]">
                      <p>*Aclaracion</p>
                    </div>
                  </div>
                  <ul className="sm:hidden  flex flex-col gap-y-[11px]">
                    <li className="flex flex-col gap-3">
                      <p className="text-size-subtitle1 text-blue-dark">
                        Instala tu gasodoméstico
                      </p>
                      <div className="px-3 py-2">
                        <p
                          onClick={() => openModal("install")}
                          className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
                        >
                          <span className="flex items-center w-6 h-6 shrink-0">
                            <Icon
                              icon="expert"
                              className="flex items-center w-full h-full text-neutral-30"
                            />
                          </span>
                          <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                            Contrata el servicio
                          </span>
                          <span className="flex items-center w-6 h-6 shrink-0">
                            <Icon
                              icon="arrow-right"
                              className="flex items-center w-full h-full text-neutral-30"
                            />
                          </span>
                        </p>
                      </div>
                    </li>
                    <li className="flex flex-col gap-3">
                      <p className="text-size-subtitle1 text-blue-dark">
                        Tipo de envío
                      </p>
                      <div className="px-3 py-2">
                        <p
                          onClick={() => openModal("shipping")}
                          className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
                        >
                          <span className="flex items-center w-6 h-6 shrink-0">
                            <Icon
                              icon="expert"
                              className="flex items-center w-full h-full text-neutral-30"
                            />
                          </span>
                          <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                            Estándar (5 a 10 dias hábiles)
                          </span>
                          <span className="flex items-center w-6 h-6 shrink-0">
                            <Icon
                              icon="arrow-right"
                              className="flex items-center w-full h-full text-neutral-30"
                            />
                          </span>
                        </p>
                      </div>
                    </li>
                    {warranty && (
                      <li className="flex flex-col gap-3">
                        <p className="text-size-subtitle1 text-blue-dark">
                          Garantía
                        </p>
                        <div className="px-3 pb-2 pt-[10px]">
                          <p
                            onClick={() => {
                              scrollContent("content-warranty");
                            }}
                            className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
                          >
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon
                                icon="expert"
                                className="flex items-center w-full h-full text-neutral-30"
                              />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                              {warranty.name}
                            </span>
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon
                                icon="arrow-right"
                                className="flex items-center w-full h-full text-neutral-30"
                              />
                            </span>
                          </p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex flex-col gap-[10px] sm:flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    {priceBefore && (
                      <p className="line-through text-[#035177] text-sm md:text-xl">
                        {priceBefore} Antes
                      </p>
                    )}
                    <div className="flex gap-1">
                      {marketId &&
                        marketId === COMMERLAYER_MARKET_IDS.GASODOMESTICOS && (
                          <Icon {...iconPSE} />
                        )}
                      <Icon {...iconInvoice} />
                    </div>
                  </div>
                  {(price == undefined ||
                    productsQuantity == undefined ||
                    Number(productsQuantity) <= 0) && (
                      <div
                        className="relative w-full 2xl:min-w-[348px] px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                        role="alert"
                      >
                        <strong className="font-bold">Info! </strong>
                        <span className="block sm:inline">
                          Este producto no se encuentra disponible en este
                          momento.
                        </span>
                      </div>
                    )}
                  {price &&
                    productsQuantity &&
                    Number(productsQuantity) > 0 ? (
                    <>
                      <p className="text-[#035177] max-md:text-2xl title is-3">
                        {price} Hoy
                      </p>
                      <div className="text-sm text-grey-30">
                        <p>{productsQuantity} unidades disponibles</p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="hidden sm:flex flex-col gap-[15px]"
                  >
                    <div className=" hidden sm:flex flex-col gap-[22px] pt-[5px] my-5">
                      {sku &&
                        price &&
                        productsQuantity &&
                        Number(productsQuantity) > 0 &&
                        marketId &&
                        marketId === COMMERLAYER_MARKET_IDS.GASODOMESTICOS ? (
                        <button
                          className="button button-primary 2xl:min-w-[348px] text-center border border-solid border-lucuma"
                          type="button"
                          onClick={() => onBuyHandler(PaymentMethodType.pse)}
                        >
                          Comprar con PSE
                        </button>
                      ) : (
                        ""
                      )}
                      <CustomLink
                        className="button button-outline w-full 2xl:min-w-[348px] text-center block"
                        content={{ urlPath: callbackURL }}
                      >
                        Te llamamos
                        <Icon {...iconCallback} />
                      </CustomLink>
                    </div>
                    <ul className="hidden sm:flex flex-col gap-y-[11px]">
                      {marketId &&
                        marketId === COMMERLAYER_MARKET_IDS.GASODOMESTICOS && (
                          <li className="flex flex-col gap-3">
                            <p className="text-size-subtitle1 text-blue-dark">
                              Instala tu gasodoméstico
                            </p>
                            <div className="px-3 py-2">
                              <p
                                onClick={() => openModal("install")}
                                className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
                              >
                                <span className="flex items-center w-6 h-6 shrink-0">
                                  <Icon
                                    icon="expert"
                                    className="flex items-center w-full h-full text-neutral-30"
                                  />
                                </span>
                                <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                                  Contrata el servicio
                                </span>
                                <span className="flex items-center w-6 h-6 shrink-0">
                                  <Icon
                                    icon="arrow-right"
                                    className="flex items-center w-full h-full text-neutral-30"
                                  />
                                </span>
                              </p>
                            </div>
                          </li>
                        )}
                      <li className="flex flex-col gap-3">
                        <p className="text-size-subtitle1 text-blue-dark">
                          Tipo de envío
                        </p>
                        <div className="px-3 py-2">
                          <p
                            onClick={() => openModal("shipping")}
                            className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
                          >
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon
                                icon="expert"
                                className="flex items-center w-full h-full text-neutral-30"
                              />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                              Estándar (5 a 10 dias hábiles)
                            </span>
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon
                                icon="arrow-right"
                                className="flex items-center w-full h-full text-neutral-30"
                              />
                            </span>
                          </p>
                        </div>
                      </li>
                      {warranty && (
                        <li className="flex flex-col gap-3">
                          <p className="text-size-subtitle1 text-blue-dark">
                            Garantía
                          </p>
                          <div className="px-3 pb-2 pt-[10px]">
                            <p
                              onClick={() => {
                                scrollContent("content-warranty");
                              }}
                              className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer"
                            >
                              <span className="flex items-center w-6 h-6 shrink-0">
                                <Icon
                                  icon="expert"
                                  className="flex items-center w-full h-full text-neutral-30"
                                />
                              </span>
                              <span className="text-size-p2 leading-[1.2] text-grey-30 grow">
                                {warranty.name}
                              </span>
                              <span className="flex items-center w-6 h-6 shrink-0">
                                <Icon
                                  icon="arrow-right"
                                  className="flex items-center w-full h-full text-neutral-30"
                                />
                              </span>
                            </p>
                          </div>
                        </li>
                      )}
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section - Related products */}
        {
          relatedProducts?.length > 0 && (
            <section className="grid section gap-9">
              <div className="grid text-left gap-9">
                <h2 className="text-blue-dark">Te puede interesar</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2lg:grid-cols-3">
                {relatedProducts.map((el) => (
                  <FeaturedProduct {...el} key={el.name} />
                ))}
              </div>
            </section>
          )
        }
        {/* END Section - Related products */}

        {/* Section - Main features */}
        <div className="flex flex-col 2md:w-3/5 gap-y-12">
          {features && (
            <div id="content-features" className="grid col-span-2 gap-9">
              <h2 className="text-blue-dark">Características principales</h2>
              <div className="">
                {documentToReactComponents(features.json, options)}
              </div>
              <div className="flex">
                <button className="button button-outline">
                  Ver más características
                </button>
              </div>
            </div>
          )}
          {/* END Section - Main features */}

          {/* Section - promoDescription and  warranty */}
          {(promoDescription || warranty) && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {promoDescription && (
                <div className="w-full gap-8">
                  <h2 className="text-blue-dark">Descripción</h2>
                  <div className="">
                    {documentToReactComponents(promoDescription.json, options)}
                  </div>
                </div>
              )}
              {warranty && (
                <div id="content-warranty" className="w-full gap-8">
                  <h2 className="text-blue-dark">Garantía</h2>
                  {documentToReactComponents(
                    warranty.description.json,
                    options
                  )}
                </div>
              )}
            </div>
          )}
          {/* END Section - promoDescription and  warranty */}
        </div>
      </div>
      {isActivedModal && (
        <ModalSuccess {...paramModal} isActive={isActivedModal}>
          {modalChild}
        </ModalSuccess>
      )}
      {/* ********* Buttons - Flow payment (mobile) ************ */}
      <div className="flex flex-col sm:hidden fixed inset-x-0 bottom-0 z-50 mt-[160px] border rounded-t-[20px] bg-white px-4 pb-5 pt-[14px] gap-[13px]">
        <div className="flex gap-[10px] items-center">
          {price && <p className="text-[#035177] title is-4">{price} Hoy</p>}
          {priceBefore && (
            <p className="line-through text-[#035177] text-size-small">
              {priceBefore} Antes
            </p>
          )}
        </div>
        <div className="flex gap-4">
          {sku &&
            price &&
            productsQuantity &&
            Number(productsQuantity) > 0 &&
            marketId &&
            marketId === COMMERLAYER_MARKET_IDS.GASODOMESTICOS ? (
            <a
              className="button button-primary w-1/2 sm:shrink-0 sm:grow flex items-center justify-center text-center text-[13px]"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onBuy)
                  onBuy(
                    PaymentMethodType.pse,
                    sku,
                    promoImage.url,
                    promoTitle
                  );
              }}
            >
              Comprar con PSE
            </a>
          ) : (
            ""
          )}
          <CustomLink
            linkClassName="button button-outline w-1/2 sm:shrink-0 sm:grow flex items-center justify-center text-center text-[13px] gap-1"
            content={{ urlPath: callbackURL }}
          >
            Te llamamos
            <span>
              <Icon {...iconCallback} />
            </span>
          </CustomLink>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
