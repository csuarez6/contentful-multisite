import { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import {
  IProductOverviewDetails,
  PaymentMethodType,
} from "@/lib/interfaces/product-cf.interface";
import { apiResponse } from "@/lib/interfaces/api-response.interface";

import { IAdjustments } from "@/lib/services/commerce-layer.service";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import FeaturedProduct from "@/components/organisms/cards/featured-product/FeaturedProduct";
import Carousel from "@/components/organisms/carousel/Carousel";
import Icon from "@/components/atoms/icon/Icon";
import Rating from "@/components/organisms/ratings/Rating";
import ProductServices from "@/components/organisms/product-services/ProductServices";
import ProductActions from "@/components/organisms/product-actions/ProductActions";
import CartModal from "@/components/organisms/cart-modal/CartModal";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import CheckoutContext from "@/context/Checkout";
import { LineItem } from "@commercelayer/sdk";

import {
  classNames,
  isAvailableGasAppliance,
  isAvailableVantilisto as isAvailableVantilistoAppliance,
  isGasAppliance,
  isVantilisto,
  scrollContent,
} from "@/utils/functions";

import {
  ICON_PLACE_TO_PAY_URL,
  iconInvoice,
  iconPSE,
  options,
} from "./ProductConfig";

const ProductOverview: React.FC<IProductOverviewDetails> = ({
  name,
  promoTitle,
  promoDescription,
  priceGasodomestico,
  _priceGasodomestico,
  priceBeforeGasodomestico,
  priceVantiListo,
  priceBeforeVantiListo,
  productsQuantityGasodomestico,
  productsQuantityVantiListo,
  productFeatures,
  onBuy,
  features,
  promoImage,
  imagesCollection,
  sku,
  marketId,
  rating,
  warranty,
  category,
  relatedProducts,
  isNew,
  discount,
  copyServices,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, order, reloadOrder, deleteItemService } =
    useContext(CheckoutContext);
  const baseCallback = isVantilisto(marketId) ? "vantilisto" : "gasodomesticos";
  const callbackURL = `/callback/${baseCallback}?sku=${sku}`;
  const closeModal = () => setIsOpen(false);
  const imagesCollectionLocal = [promoImage, ...imagesCollection.items];
  const [warrantyCheck, setWarrantyCheck] = useState({});
  const [installCheck, setInstallCheck] = useState({});
  const orderLocalRef = useRef<LineItem[]>();
  const nextSlideId = `nextSlide_${marketId}`;
  const prevSlideId = `prevSlide_${marketId}`;

  const isAvailableGasodomestico = isAvailableGasAppliance(
    marketId,
    priceGasodomestico,
    productsQuantityGasodomestico
  );
  const isAvailableVantilisto = isAvailableVantilistoAppliance(
    marketId,
    priceVantiListo,
    productsQuantityVantiListo
  );

  useEffect(() => {
    orderLocalRef.current = order?.line_items;
  }, [order]);

  const servicesHandler = (type: string, params) => {
    if (type === "warranty") setWarrantyCheck(params);
    if (type === "installation") setInstallCheck(params);
  };

  const requestService = (
    data: IAdjustments,
    orderId: string,
    quantity: string
  ) => {
    fetch("/api/product/service-adition", {
      method: "POST",
      body: JSON.stringify({
        data,
        orderId,
        quantity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200 && json.data != null) {
          reloadOrder();
        } else {
          console.error("Error requestService");
        }
      });
  };

  const buyHandlerMap = {
    [PaymentMethodType.pse]: () => {
      setIsOpen(true);
    },
  };

  const onBuyHandler = async (type: PaymentMethodType) => {
    try {
      // Add to cart- product
      const res: apiResponse = await addToCart(
        sku,
        promoImage.url,
        promoTitle,
        category
      );
      if (res.status === 200) {
        const itemProduct = orderLocalRef.current
          ? orderLocalRef.current.filter(
            (item) => item.item_type === "skus" && item.id === res.data["id"]
          )
          : [];
        // validate and add to cart a service (Installation)
        if (
          Object.keys(installCheck).length > 0 &&
          installCheck["id"] != "defInstall1"
        ) {
          const dataAdjustment: IAdjustments = {
            name: installCheck["name"] + " - " + sku,
            amount_cents: installCheck["price_amount_float"],
            type: "installation",
            sku_id: res.data["id"] ?? "",
            sku_code: sku,
            sku_name: name,
            sku_option_id: installCheck["id"],
            sku_option_name: installCheck["name"],
            categoryReference: category.clInstallationReference ?? null,
          };

          if (
            itemProduct.length > 0 &&
            itemProduct[0]["installlation_service"].length > 0
          ) {
            const idTmp = [itemProduct[0]["installlation_service"][0]["id"]];
            await deleteItemService(idTmp);
          }
          requestService(dataAdjustment, order.id, res.data["quantity"] ?? "1");
          // if (itemProduct.length > 0) {
          //   updateItemQuantity(
          //     sku,
          //     res.data["quantity"]
          //   );
          // }
        } else {
          if (
            itemProduct.length > 0 &&
            itemProduct[0]["installlation_service"].length > 0
          ) {
            const idTmp = [itemProduct[0]["installlation_service"][0]["id"]];
            await deleteItemService(idTmp);
          }
        }
        // validate and add to cart a service (Warranty)
        if (
          Object.keys(warrantyCheck).length > 0 &&
          warrantyCheck["id"] != "defWarranty1"
        ) {
          const dataAdjustment: IAdjustments = {
            name: warrantyCheck["name"] + " - " + sku,
            amount_cents: (
              (Number(warrantyCheck["price_amount_float"]) *
                Number(_priceGasodomestico)) /
              100
            ).toString(),
            type: "warranty",
            sku_id: res.data["id"] ?? "",
            sku_code: sku,
            sku_name: name,
            sku_option_id: warrantyCheck["id"],
            sku_option_name: warrantyCheck["name"],
            categoryReference: category.clWarrantyReference ?? null,
          };
          if (
            itemProduct.length > 0 &&
            itemProduct[0]["warranty_service"].length > 0
          ) {
            const idTmp = [itemProduct[0]["warranty_service"][0]["id"]];
            await deleteItemService(idTmp);
          }
          requestService(dataAdjustment, order.id, res.data["quantity"] ?? "1");
          // if (itemProduct.length > 0) {
          //   updateItemQuantity(
          //     sku,
          //     res.data["quantity"]
          //   );
          // }
        } else {
          if (
            itemProduct.length > 0 &&
            itemProduct[0]["warranty_service"].length > 0
          ) {
            const idTmp = [itemProduct[0]["warranty_service"][0]["id"]];
            await deleteItemService(idTmp);
          }
        }
      }
      if (buyHandlerMap[type] && res.status === 200) buyHandlerMap[type]();
      if (onBuy) onBuy(type, sku, promoImage.url, promoTitle);
      return res;
    } catch (e) {
      console.error("error on buy handler", e);
      return { status: 402, data: "error on buy handler" };
    }
  };
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
                  {isNew && (
                    <div className="flex px-2 py-1 uppercase bg-yellow-100 rounded-lg h-fit">
                      <span className="title is-5">nuevo</span>
                    </div>
                  )}
                  {discount && (
                    <div className="flex px-2 py-1 text-center uppercase rounded-lg bg-blue-100 h-fit">
                      <span className="title is-5">
                        {discount} de descuento
                      </span>
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
                  externalLink : "https://assets.ctfassets.net/3brzg7q3bvg1/17lnwGgK0Hkgmn3kf1vsa0/0e453b7b5333111774c70cd5abf1b451/T_rminos_y_Condiciones_de_Uso_del_Sitio.pdf",
                }}
              >
                Conozca términos y condiciones
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
                    {isNew && (
                      <div className="flex px-2 py-1 uppercase bg-yellow-100 rounded-lg h-fit">
                        <span className="title is-5">nuevo</span>
                      </div>
                    )}
                    {discount && (
                      <div className="flex px-2 py-1 text-center uppercase rounded-lg bg-blue-100 h-fit">
                        <span className="title is-5">
                          {discount} de descuento
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Caracteristicas */}
              <div className="w-full flex flex-col-reverse sm:flex-row gap-[22px]">
                <div className="py-[2px] flex flex-col gap-[32px] lg:w-[43%] shrink-0 sm:w-1/2">
                  <div className="flex flex-col gap-[14px] bg-slate-50 p-3 rounded-xl">
                    <h4 className="text-blue-dark">
                      Información a tener en cuenta
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
                      Consulta tu Cupo de Financiación Vanti Listo
                    </p>
                    <div className="flex justify-between pl-[6px]">
                      <CustomLink
                        className="underline text-[#035177] text-sm mt-[7px]"
                        content={{
                          urlPaths: ["vantilisto/consulta-tu-cupo"],
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
                          urlPaths: ["tramites-y-ayuda/preguntas-frecuentes-sobre-pagos-electronicos"],
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
                  <ul className="sm:hidden flex flex-col gap-y-[11px]">
                    {isGasAppliance(marketId) && (
                      <ProductServices
                        key={marketId}
                        warranty={warranty}
                        category={category}
                        onEventHandler={servicesHandler}
                        _priceGasodomestico={_priceGasodomestico}
                        copyServices={copyServices}
                      />
                    )}
                  </ul>
                </div>
                <div className="hidden sm:flex flex-col gap-[10px] sm:flex-grow">
                  {isAvailableGasodomestico || isAvailableVantilisto ? (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        {(priceBeforeGasodomestico !== priceGasodomestico ||
                          priceBeforeVantiListo !== priceVantiListo) && (
                            <p className="line-through text-[#035177] text-sm md:text-xl">
                              {
                                (isGasAppliance(marketId)
                                  ? priceBeforeGasodomestico
                                  : priceBeforeVantiListo
                                ).split(",")[0]
                              }{" "}
                              Antes
                            </p>
                          )
                        }
                        <div className="flex gap-1">
                          {isGasAppliance(marketId) && <Icon {...iconPSE} />}
                          <Icon {...iconInvoice} />
                          {!isVantilisto(marketId) && (
                            <figure>
                              <Image
                                alt="placetopay"
                                src={ICON_PLACE_TO_PAY_URL}
                                width={80}
                                height={28}
                                className="w-20 h-7"
                              />
                            </figure>
                          )}
                        </div>
                      </div>
                      {/* Main price */}
                      <p className="text-[#035177] max-md:text-2xl title is-3">
                        {
                          (isGasAppliance(marketId)
                            ? priceGasodomestico
                            : priceVantiListo
                          ).split(",")[0]
                        }
                      </p>
                      {/* Secondary price */}
                      {isGasAppliance(marketId) && priceVantiListo && (
                        <p className="text-[#545454] text-sm md:text-xl flex items-center gap-2">
                          <span>{priceVantiListo.split(",")[0]}</span>
                          <span className="inline-block text-size-small font-bold bg-cyan-300 py-0.5 px-1 rounded border">
                            Vanti Listo
                          </span>
                        </p>
                      )}

                      {/* IVA Price */}
                      <div className="text-xs text-grey-30">
                        <p>* IVA incluido</p>
                        <p>** Debes tener cupo Vanti Listo disponible</p>
                      </div>

                      {/* Product stock */}
                      <div className="text-sm text-grey-30">
                        <p>
                          {isGasAppliance(marketId)
                            ? productsQuantityGasodomestico
                            : productsQuantityVantiListo}{" "}
                          unidades disponibles
                        </p>
                      </div>

                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="hidden sm:flex flex-col gap-[15px]"
                      >
                        <ProductActions
                          sku={sku}
                          _priceGasodomestico={_priceGasodomestico}
                          priceGasodomestico={priceGasodomestico}
                          productsQuantityGasodomestico={
                            productsQuantityGasodomestico
                          }
                          marketId={marketId}
                          callbackURL={callbackURL}
                          onBuyHandler={onBuyHandler}
                        />
                        {isGasAppliance(marketId) && (
                          <ProductServices
                            warranty={warranty}
                            category={category}
                            onEventHandler={servicesHandler}
                            _priceGasodomestico={_priceGasodomestico}
                            copyServices={copyServices}
                          />
                        )}
                      </form>
                    </>
                  ) : (
                    <div
                      className="relative w-full 2xl:min-w-[348px] px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      <strong className="font-bold">¡Lo sentimos! </strong>
                      <span className="block sm:inline">
                        Este producto no se encuentra disponible en este
                        momento.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section - Related products */}
        {relatedProducts?.length > 0 && (
          <section className="grid section gap-9">
            <div className="grid text-left gap-9">
              <h2 className="text-blue-dark">Te puede interesar</h2>
            </div>
            <div className="hidden md:grid md:gap-6 md:grid-cols-2 2lg:grid-cols-3">
              {relatedProducts.map((el) => (
                <FeaturedProduct {...el} key={el.name} />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 md:hidden">
              <div className="flex -mx-1.5">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
                  breakpoints={{
                    480: {
                      slidesPerView: 1.2,
                    },
                    600: {
                      slidesPerView: 1.35,
                    },
                  }}
                  modules={[Navigation]}
                  navigation={{
                    nextEl: `#${nextSlideId}`,
                    prevEl: `#${prevSlideId}`,
                    disabledClass:
                      "swiper-button-disabled opacity-50 !cursor-default",
                  }}
                  className="relative w-full p-1.5"
                >
                  {relatedProducts.map((el) => (
                    <SwiperSlide
                      key={el?.name + "_" + el?.sys?.id}
                      className="w-full h-full shrink-0"
                    >
                      <FeaturedProduct {...el} key={el.name} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex justify-center gap-6">
                <div
                  id={prevSlideId}
                  className="w-6 h-6 text-neutral-20 cursor-pointer"
                >
                  <Icon icon="arrow-left" className="w-full h-full" />
                </div>
                <div
                  id={nextSlideId}
                  className="w-6 h-6 text-neutral-20 cursor-pointer"
                >
                  <Icon icon="arrow-right" className="w-full h-full" />
                </div>
              </div>
            </div>
          </section>
        )}
        {/* END Section - Related products */}

        {/* Section - Main features */}
        <div className="flex flex-col 2md:w-3/5 gap-y-12">
          {features && (
            <div id="content-features" className="grid col-span-2 gap-9">
              <h2 className="text-blue-dark">Características principales</h2>
              <div className="">
                {documentToReactComponents(
                  attachLinksToRichtextContent(
                    features.json,
                    features?.links ?? []
                  ),
                  options
                )}
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
      {/* ********* Buttons - Flow payment (mobile) ************ */}

      <div className={classNames(
        "flex flex-col sm:hidden fixed inset-x-0 bottom-0 z-50 mt-[160px] border rounded-t-[20px] px-4 pb-5 pt-[14px] gap-[13px]",
        isAvailableGasodomestico || isAvailableVantilisto ? "bg-white" : "bg-red-100 border border-red-400"
        )}>
        {isAvailableGasodomestico || isAvailableVantilisto ? (
          <>
            <div className="flex gap-[10px] items-start xxs:items-center justify-between">
              <div className="flex flex-col-reverse gap-x-[10px]">
                {/* Main price */}
                <p className="text-[#035177] title is-4">
                  {
                    (isGasAppliance(marketId)
                      ? priceGasodomestico
                      : priceVantiListo
                    ).split(",")[0]
                  }
                </p>
                {/* Before price */}
                {(priceBeforeGasodomestico !== priceGasodomestico ||
                  priceBeforeVantiListo !== priceVantiListo) && (
                    <p className="line-through text-[#035177] text-size-small flex items-center">
                      {
                        (isGasAppliance(marketId)
                          ? priceBeforeGasodomestico
                          : priceBeforeVantiListo
                        ).split(",")[0]
                      }{" "}
                      Antes
                    </p>
                  )}
              </div>
              <div className="flex flex-col gap-x-[10px] gap-y-2 xxs:gap-y-0">
                {/* Secondary price */}
                {isGasAppliance(marketId) && priceVantiListo && (
                  <p className="text-[#545454] text-sm md:text-xl flex flex-col-reverse xxs:flex-row items-start xxs:items-center gap-2">
                    <span>{priceVantiListo.split(",")[0]}</span>
                    <span className="inline-block text-size-small font-bold bg-cyan-300 py-0.5 px-1 rounded border">
                      Vanti Listo
                    </span>
                  </p>
                )}
                {/* Product stock */}
                <div className="text-sm tracking-tighter xxs:tracking-normal text-grey-30">
                  <p>
                    {isGasAppliance(marketId)
                      ? productsQuantityGasodomestico
                      : productsQuantityVantiListo}{" "}
                    unidades disponibles
                  </p>
                </div>
              </div>
            </div>
            <ProductActions
              sku={sku}
              _priceGasodomestico={_priceGasodomestico}
              priceGasodomestico={priceGasodomestico}
              priceVantiListo={priceVantiListo}
              productsQuantityGasodomestico={productsQuantityGasodomestico}
              productsQuantityVantiListo={productsQuantityVantiListo}
              marketId={marketId}
              callbackURL={callbackURL}
              onBuyHandler={onBuyHandler}
            />
          </>
        ) : (
          <div className="relative w-full text-red-700" role="alert">
            <strong className="font-bold">¡Lo sentimos! </strong>
            <span className="block">
              Este producto no se encuentra disponible en este
              momento.
            </span>
          </div>
        )}
      </div>
      {isOpen && <CartModal close={closeModal} />}
    </section>
  );
};

export default ProductOverview;
