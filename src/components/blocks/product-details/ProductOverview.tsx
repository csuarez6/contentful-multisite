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
import { useContext, useEffect, useState, useRef } from "react";
import CheckoutContext from "@/context/Checkout";
import FeaturedProduct from "@/components/organisms/cards/featured-product/FeaturedProduct";
import {
  isAvailableGasAppliance,
  isAvailableVantilisto,
  isGasAppliance,
  scrollContent,
} from "@/utils/functions";
import { iconInvoice, iconPSE, options } from "./ProductConfig";
import ProductServices from "@/components/organisms/product-services/ProductServices";
import ProductActions from "@/components/organisms/product-actions/ProductActions";
import CartModal from "@/components/organisms/cart-modal/CartModal";
import { IAdjustments } from "@/lib/services/commerce-layer.service";
import { apiResponse } from "@/lib/interfaces/api-response.interface";
import { LineItem } from "@commercelayer/sdk";

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
  promotion,
  sku,
  marketId,
  state,
  rating,
  warranty,
  category,
  relatedProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { addToCart, order, reloadOrder, deleteItemService } = useContext(CheckoutContext);
  const currentSlug = router.query?.slug?.length > 0 ? router.query.slug[0] : "/";
  const baseCallback = currentSlug === "catalogo-vanti-listo" ? "vantilisto" : "gasodomesticos";
  const callbackURL = `/callback/${baseCallback}?sku=${sku}`;
  const closeModal = () => setIsOpen(false);
  const imagesCollectionLocal = [promoImage, ...imagesCollection.items];
  const [warrantyCheck, setWarrantyCheck] = useState({});
  const [installCheck, setInstallCheck] = useState({});
  const orderLocalRef = useRef<LineItem[]>();

  useEffect(() => {
    orderLocalRef.current = order?.line_items;
  }, [order?.line_items]);

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
        const itemProduct = orderLocalRef.current.filter(item => item.item_type === "skus" && item.id === res.data["id"]);
        // validate and add to cart a service (Installation)
        if (
          Object.keys(installCheck).length > 0 &&
          installCheck["id"] != "defInstall1"
        ) {
          const dataAdjustment: IAdjustments = {
            name: installCheck["name"] + " - " + sku,
            amount_cents: installCheck["price_amount_cents"],
            type: "installation",
            sku_id: res.data["id"] ?? "",
            sku_code: sku,
            sku_name: name,
            sku_option_id: installCheck["id"],
            sku_option_name: installCheck["name"],
            categoryReference: category.clInstallationReference ?? null,
          };
          if (itemProduct.length > 0 && itemProduct[0]["installlation_service"].length > 0) {
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
          if (itemProduct.length > 0 && itemProduct[0]["installlation_service"].length > 0) {
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
            amount_cents: (Number(warrantyCheck["price_amount_float"]) * Number(_priceGasodomestico) / 100).toString() + "00",
            type: "warranty",
            sku_id: res.data["id"] ?? "",
            sku_code: sku,
            sku_name: name,
            sku_option_id: warrantyCheck["id"],
            sku_option_name: warrantyCheck["name"],
            categoryReference: category.clWarrantyReference ?? null,
          };
          if (itemProduct.length > 0 && itemProduct[0]["warranty_service"].length > 0) {
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
          if (itemProduct.length > 0 && itemProduct[0]["warranty_service"].length > 0) {
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
                  urlPaths: [
                    "politica-de-cambios-devoluciones-y-derecho-de-retracto",
                  ],
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
                <div className="py-[2px] flex flex-col gap-[32px] lg:w-[43%] shrink-0 sm:w-1/2">
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
                          urlPaths: ["financiacion/vanti-listo"],
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
                          urlPaths: ["centro-de-ayuda/preguntas-frecuentes"],
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
                      />
                    )}
                  </ul>
                </div>
                <div className="hidden sm:flex flex-col gap-[10px] sm:flex-grow">
                  {isAvailableGasAppliance(
                    marketId,
                    priceGasodomestico,
                    productsQuantityGasodomestico
                  ) ||
                    isAvailableVantilisto(
                      marketId,
                      priceVantiListo,
                      productsQuantityVantiListo
                    ) ? (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <p className="line-through text-[#035177] text-sm md:text-xl">
                          {isGasAppliance(marketId)
                            ? priceBeforeGasodomestico
                            : priceBeforeVantiListo}{" "}
                          Antes
                        </p>
                        <div className="flex gap-1">
                          {isGasAppliance(marketId) && <Icon {...iconPSE} />}
                          <Icon {...iconInvoice} />
                        </div>
                      </div>
                      {/* Main price */}
                      <p className="text-[#035177] max-md:text-2xl title is-3">
                        {isGasAppliance(marketId)
                          ? priceGasodomestico
                          : priceVantiListo}
                      </p>
                      {/* Secondary text */}
                      {isGasAppliance(marketId) && priceVantiListo && (
                        <p className="text-[#545454] text-sm md:text-xl flex items-center gap-2">
                          <span>{priceVantiListo}</span>
                          <span className="inline-block text-size-small font-bold bg-blue-100 py-0.5 px-1 rounded border">
                            Vanti Listo
                          </span>
                        </p>
                      )}
                      <div className="text-xs text-grey-30">
                        <p>* Precio IVA incluido</p>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2lg:grid-cols-3">
              {relatedProducts.map((el) => (
                <FeaturedProduct {...el} key={el.name} />
              ))}
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
      {/* ********* Buttons - Flow payment (mobile) ************ */}
      {(isAvailableGasAppliance(
        marketId,
        priceGasodomestico,
        productsQuantityGasodomestico
      ) ||
        isAvailableVantilisto(
          marketId,
          priceVantiListo,
          productsQuantityVantiListo
        )) && (
          <div className="flex flex-col sm:hidden fixed inset-x-0 bottom-0 z-50 mt-[160px] border rounded-t-[20px] bg-white px-4 pb-5 pt-[14px] gap-[13px]">
            <div className="flex gap-[10px] items-start xxs:items-center justify-between">
              <div className="flex flex-col-reverse gap-x-[10px]">
                {/* Main price */}
                <p className="text-[#035177] title is-4">
                  {isGasAppliance(marketId)
                    ? priceGasodomestico
                    : priceVantiListo}
                </p>
                {/* Before price */}
                <p className="line-through text-[#035177] text-size-small flex items-center">
                  {isGasAppliance(marketId)
                    ? priceBeforeGasodomestico
                    : priceBeforeVantiListo}{" "}
                  Antes
                </p>
              </div>
              <div className="flex flex-col gap-x-[10px] gap-y-2 xxs:gap-y-0">
                {/* Secondary price */}
                {isGasAppliance(marketId) && priceVantiListo && (
                  <p className="text-[#545454] text-sm md:text-xl flex flex-col-reverse xxs:flex-row items-start xxs:items-center gap-2">
                    <span>{priceVantiListo}</span>
                    <span className="inline-block text-size-small font-bold bg-blue-100 py-0.5 px-1 rounded border">
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
              priceGasodomestico={priceGasodomestico}
              priceVantiListo={priceVantiListo}
              productsQuantityGasodomestico={productsQuantityGasodomestico}
              productsQuantityVantiListo={productsQuantityVantiListo}
              marketId={marketId}
              callbackURL={callbackURL}
              onBuyHandler={onBuyHandler}
            />
          </div>
        )}
      {isOpen && <CartModal close={closeModal} />}
    </section>
  );
};

export default ProductOverview;
