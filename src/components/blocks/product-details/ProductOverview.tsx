import { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useWindowScroll, useWindowSize } from "react-use";

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
  iconPSE,
  logoVantiListo,
  options,
  iconMastercard,
  iconVisa,
} from "./ProductConfig";
import { MARKETPLACE_SLUG } from "@/constants/url-paths.constants";
import { useRouter } from "next/router";

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
  const { addToCart, order, reloadOrder, deleteItemService, getSkuList } =
    useContext(CheckoutContext);
  const baseCallback = isVantilisto(marketId) ? "vantilisto" : "gasodomesticos";
  const callbackURL = `/callback/${baseCallback}?sku=${sku}`;
  const closeModal = () => setIsOpen(false);
  const imagesCollectionLocal = [promoImage, ...imagesCollection.items];
  const [warrantyCheck, setWarrantyCheck] = useState({});
  const [installCheck, setInstallCheck] = useState({});
  const [isFixed, setIsFixed] = useState(false);

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
  const { y } = useWindowScroll();
  const { width } = useWindowSize();
  const [installList, setInstallList] = useState<any>([
    { ...defaultInstallList },
  ]);
  const [warrantyList, setWarrantyList] = useState<any>([
    { ...defaultWarrantyList },
  ]);

  const [showWarranty, setShowWarranty] = useState<boolean>();
  const [showInstallation, setShowInstallation] = useState<boolean>();
  const [widthWidget, setWidthWidget] = useState(null);
  
  const [seeMore, setSeeMore] = useState(true);

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
  const tiendaVirtualPdfPath = "https://assets.ctfassets.net/3brzg7q3bvg1/17lnwGgK0Hkgmn3kf1vsa0/0e453b7b5333111774c70cd5abf1b451/T_rminos_y_Condiciones_de_Uso_del_Sitio.pdf";
  const vantilistoPdfPath = "https://assets.ctfassets.net/3brzg7q3bvg1/6ay3iapxXoEmyJOj8PkFbj/47b963e74d998d957f4092fbf345a250/T_RMINOS-Y-CONDICIONES-DE-USO-PORTAL-VANTI-LISTO-20-11-2023_-_Merpes.pdf";

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

  useEffect(() => {
    (async () => {
      try {
        const warrantyIsActived = !!copyServices.find(
          (i) => i.key === "show.warranty"
        )?.active;
        const installationIsActived = !!copyServices.find(
          (i) => i.key === "show.installation"
        )?.active;

        if (warrantyIsActived && category.clInstallationReference) {
          const infoSkuInstall = await getSkuList(
            category.clInstallationReference
          );
          if (infoSkuInstall && infoSkuInstall.status == 200)
            setInstallList([defaultInstallList, ...infoSkuInstall.data]);
        }

        if (installationIsActived && category.clWarrantyReference) {
          const infoSkuWarra = await getSkuList(category.clWarrantyReference);
          if (infoSkuWarra && infoSkuWarra.status == 200)
            setWarrantyList([defaultWarrantyList, ...infoSkuWarra.data]);
        }

        setShowWarranty(warrantyIsActived);
        setShowInstallation(installationIsActived);
      } catch (error) {
        console.error("Error at: ProductService", error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const footerHeight: any = document?.querySelector("#footer");
    const widgetItemHeight: any = document?.querySelector("#widgetItem");
    const widget: any = document?.querySelector("#widget");
    const bodyHeight: any = document?.body;
    const footerTextHeight: any = document?.querySelector("#footerText");
    //122 = 90px de top + 32 paddingBottom
    const totaltHeight =
      footerHeight?.offsetHeight +
      widgetItemHeight?.offsetHeight +
      (footerTextHeight?.offsetHeight ?? 0) +
      122;
    const elem = bodyHeight?.offsetHeight - totaltHeight;
    setIsFixed(y > elem);
    setWidthWidget(widget?.offsetWidth);
  }, [y]);

  const itemInfoFixed = (x: number, y: number) => {
    if (!x || !y) return;
    if (isFixed) {
      return "lg:absolute lg:bottom-0";
    } else {
      if (x > 1023 && y > 484) return "fixed top-[90px]";
      if (x > 1065 && y > 486) return "fixed top-[90px]";
      if (x > 1096 && y > 403) return "fixed top-[90px]";
      if (x > 1300 && y > 420) return "fixed top-[90px]";
    }
  };

  const { asPath } = useRouter();
  const firstPath = asPath.split("/")?.[1];

  return (
    <section className="bg-white section">
      <div className="flex flex-col relative">
        <section className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 xl:max-w-[595px] flex flex-col gap-6 lg:gap-9 pr-9 pb-5 lg:pb-0">
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
            <div className="md:w-1/2 lg:ml-[72px] leading-none">
              <CustomLink
                className="text-sm underline text-grey-60 !leading-none"
                content={{
                  externalLink: firstPath == MARKETPLACE_SLUG ? tiendaVirtualPdfPath : vantilistoPdfPath
                }}
              >
                Conozca términos y condiciones
              </CustomLink>
            </div>
            {/* END Section - Carousel */}
          </div>
          <div className="flex xl:flex-grow">
            <div className="flex flex-col w-full gap-8">
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
                <div className="py-[2px] flex flex-col gap-5 lg:w-[43%] shrink-0 sm:w-1/2">
                  <div className="flex flex-col gap-[10px] bg-slate-50 p-3 rounded-xl">
                    <h4 className="text-blue-dark">
                      Información a tener en cuenta
                    </h4>
                    <div>
                      <div className={seeMore ? "lg:overflow-hidden lg:max-h-[3rem] xl:max-h-[10.5rem]" : ""}>                        {productFeatures && (
                          <div className="flex flex-col gap-[1.5rem] text-blue-dark">
                            {documentToReactComponents(
                              productFeatures.json,
                              options
                            )}
                          </div>
                        )}
                        {features && (
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
                        )}
                      </div>
                      {seeMore && (
                        <button
                          className="flex text-blue-dark"
                          onClick={() => setSeeMore(!seeMore)}
                          >
                          ... leer más
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bg-category-sky-blue-90 p-3 gap-[10px] flex flex-col rounded-xl w-full xl:w-full 2xl:w-full">
                    <p className="text-base md:text-size-subtitle1">
                      Consulta tu Cupo de Financiación Vanti Listo
                    </p>
                    <div className="flex justify-between">
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
                  <div className="pl-[11px]">
                    <div className="font-medium leading-4 text-blue-dark flex flex-col gap-[10px]">
                      <p>¿Tienes dudas?</p>
                      <CustomLink
                        content={{
                          urlPaths: [
                            "tramites-y-ayuda/preguntas-frecuentes-sobre-pagos-electronicos",
                          ],
                        }}
                        className="text-sm underline text-blue-dark"
                      >
                        Revisa las dudas frecuentes
                      </CustomLink>
                    </div>
                  </div>
                  <div className="pl-[11px] text-sm text-[#424242] font-medium">
                    <p>* Aclaracion</p>
                  </div>
                  <ul className="sm:hidden flex flex-col gap-y-[11px]">
                    {isGasAppliance(marketId) && (
                      <ProductServices
                        key={marketId}
                        warranty={warranty}
                        onEventHandler={servicesHandler}
                        _priceGasodomestico={_priceGasodomestico}
                        showInstallation={showInstallation}
                        showWarranty={showWarranty}
                        installList={installList}
                        warrantyList={warrantyList}
                      />
                    )}
                  </ul>
                </div>
                <div className="hidden sm:flex transition-all grow" id="widget">
                  <div
                    className={classNames(
                      "flex flex-col gap-[10px] sm:flex-grow z-20 h-fit bg-white",
                      itemInfoFixed(width, y)
                    )}
                    id="widgetItem"
                    style={{ width: width > 1023 ? widthWidget : "auto" }}
                  >
                    {isAvailableGasodomestico || isAvailableVantilisto ? (
                      <>
                        <div className="flex justify-between gap-2 flex-col-reverse">
                          {(priceBeforeGasodomestico !== priceGasodomestico ||
                            priceBeforeVantiListo !== priceVantiListo) && (
                            <p className="line-through text-[#035177] text-sm md:text-xl">
                              {
                                (isGasAppliance(marketId)
                                  ? priceBeforeGasodomestico
                                  : priceBeforeVantiListo
                                ).split(",")[0]
                              }{" "}
                              <span>Antes</span>
                            </p>
                          )}
                          {!isVantilisto(marketId) && (
                            <div className="flex gap-1">
                              <figure>
                                <Image
                                  alt="placetopay"
                                  src={ICON_PLACE_TO_PAY_URL}
                                  width={80}
                                  height={28}
                                  className="w-20 h-7"
                                />
                              </figure>
                            </div>
                          )}
                        </div>
                        {/* Main price */}
                        <p className="text-[#035177] max-md:text-2xl title is-3 gap-1 flex">
                          {
                            (isGasAppliance(marketId)
                              ? priceGasodomestico
                              : priceVantiListo
                            ).split(",")[0]
                          }

                          <div className="flex gap-1">
                            {isAvailableGasodomestico && <Icon {...iconPSE} />}
                            {isAvailableGasodomestico && (
                              <Icon {...iconMastercard} />
                            )}
                            {/* <Icon {...iconInvoice} /> */}
                            {isAvailableGasodomestico && <Icon {...iconVisa} />}
                            {isAvailableVantilisto && (
                              <Icon {...logoVantiListo} />
                            )}
                          </div>
                        </p>

                        {/* Secondary price */}
                        {isGasAppliance(marketId) && priceVantiListo && (
                          <p className="text-[#545454] text-sm md:text-xl flex items-center gap-2">
                            <span>{priceVantiListo.split(",")[0]}</span>
                            <Icon {...logoVantiListo} />
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
                          className="hidden sm:flex flex-col"
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
                              onEventHandler={servicesHandler}
                              _priceGasodomestico={_priceGasodomestico}
                              showInstallation={showInstallation}
                              showWarranty={showWarranty}
                              installList={installList}
                              warrantyList={warrantyList}
                            />
                          )}
                        </form>
                      </>
                    ) : (
                      <div
                        className="relative w-full 2xl:min-w-[348px] 2xl:max-w-[348px] px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
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
          </div>
        </section>

        {/* Section - Related products */}
        {relatedProducts?.length > 0 && (
          <section className="flex flex-col lg:w-[71%] gap-4 border-t border-gray-300 mt-3 sm:mt-8 pt-8">
            <div className="grid text-left gap-9">
              <h2 className="text-blue-dark text-3xl">Te puede interesar</h2>
            </div>
            <div className="grid md:gap-6">
              <div className="col-span-3 lg:col-span-2 grid grid-cols-2 md:gap-6">
                <div className="grid grid-cols-1 gap-4 col-span-2 h-fit">
                  <div className="flex -mx-1.5">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={20}
                      breakpoints={{
                        480: {
                          slidesPerView: 1,
                        },
                        600: {
                          slidesPerView: 2,
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
                  {relatedProducts?.length > 1 && (
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
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {/* END Section - Related products */}

        {/* Section - Main features */}
        <div className="flex flex-col lg:w-[71%]">
          {features && (
            <div id="content-features" className="grid col-span-2 gap-4 border-t border-gray-300 mt-8 pt-8">
              <h2 className="text-blue-dark text-3xl">Características principales</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-300 mt-8 pt-8">
              {promoDescription && (
                <div className="flex flex-col w-full gap-4">
                  <h2 className="text-blue-dark text-3xl">Descripción</h2>
                  <div className="">
                    {documentToReactComponents(promoDescription.json, options)}
                  </div>
                </div>
              )}
              {warranty && (
                <div id="content-warranty" className={classNames(
                  "flex flex-col w-full gap-4",
                  (promoDescription && warranty) ? "pt-8 mt-8 border-t sm:pt-0 sm:mt-0 sm:border-t-0 sm:pl-8 sm:ml-8 sm:border-l border-gray-300" : ""
                )}>
                  <h2 className="text-blue-dark text-3xl">Garantía</h2>
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

      <div
        className={classNames(
          "flex flex-col sm:hidden fixed inset-x-0 bottom-0 z-50 mt-[160px] border rounded-t-[20px] px-4 pb-5 pt-[14px] gap-[13px]",
          isAvailableGasodomestico || isAvailableVantilisto
            ? "bg-white"
            : "bg-red-100 border border-red-400"
        )}
      >
        {isAvailableGasodomestico || isAvailableVantilisto ? (
          <>
            <div className="grid grid-cols-2 gap-[10px]">
              <div
                className={classNames(
                  "flex flex-col-reverse gap-x-[10px] justify-start",
                  !isAvailableGasodomestico && "!justify-center"
                )}
              >
                {/* Main price */}
                <div className="flex gap-1 flex-wrap">
                  <p className="text-[#035177] title is-4">
                    {
                      (isGasAppliance(marketId)
                        ? priceGasodomestico
                        : priceVantiListo
                      ).split(",")[0]
                    }
                  </p>
                  <div className="flex gap-1">
                    {isAvailableGasodomestico && (
                      <Icon {...iconPSE} className="w-6 h-6" />
                    )}
                    {isAvailableGasodomestico && (
                      <Icon {...iconMastercard} className="w-6 h-6" />
                    )}
                    {isAvailableGasodomestico && (
                      <Icon {...iconVisa} className="w-6 h-6" />
                    )}
                    {isAvailableVantilisto && <Icon {...logoVantiListo} />}
                  </div>
                </div>
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
                    <Icon {...logoVantiListo} />
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
              Este producto no se encuentra disponible en este momento.
            </span>
          </div>
        )}
      </div>
      {isOpen && <CartModal close={closeModal} />}
    </section>
  );
};

export default ProductOverview;
