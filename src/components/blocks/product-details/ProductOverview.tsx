import Image from "next/image";
import {
  IProductOverviewDetails,
  PaymentMethodType,
} from "@/lib/interfaces/product-cf.interface";
import Carousel from "@/components/organisms/carousel/Carousel";
import Rating from "@/components/organisms/ratings/Rating";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ModalSuccess from "@/components/organisms/modal-success/ModalSuccess";
import { useState } from 'react';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import RadioBox from "@/components/atoms/input/radiobox/RadioBox";
import { BLOCKS } from "@contentful/rich-text-types";

const iconInvoice: IIcon = {
  icon: "invoice",
  size: 28,
  className: "",
};

const iconPSE: IIcon = {
  icon: "pse",
  size: 28,
  className: "",
};

const iconCallback: IIcon = {
  icon: "callback",
  size: 18,
  className: "",
};

const scrollContent = (idContainer: string) => {
  document.querySelector("#" + idContainer).scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const ModalIntall = () => {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-left">
        Antes de empezar, queremos informarte que puedes adquirir la instalación de tu gasodoméstico en esta compra.<br />
        Si aún no sabes qué incluye, puedes informarte en la landing de instalación.
      </p>
      <div className="flex justify-end gap-2">
        <CustomLink
          className="button button-primary"
          content={{ urlPath: "/" }}
        >
          Ir a comprar
        </CustomLink>
        <CustomLink
          className="border button border-blue-dark rounded-3xl text-blue-dark"
          content={{ urlPath: "/" }}
        >
          Conocer sobre instalación
        </CustomLink>
      </div>
    </div>
  );
};

const ModalShipping = () => {
  return (
    <div>
      <p className="text-blue-dark">Para llevar su producto, elija un tipo de envío:</p>
      <form>
        <div className="w-full">
          <RadioBox
            name="servicio"
            label="Estándar (5 a 10 días hábiles)"
          />
        </div>
        <div className="w-full">
          <RadioBox
            name="servicio"
            label="Express (1 día hábil)"
          />
        </div>
      </form>
      <div className="flex justify-end gap-2">
        <CustomLink
          className="button button-primary"
          onClick={(e) => {
            e.preventDefault();
          }}
          content={{ externalLink: "#" }}
        >
          Aceptar
        </CustomLink>
      </div>
    </div>
  );
};

const options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (_node: any, children: any) => {
      return <ul className="list-disc list-inside">{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (_node: any, children: any) => {
      return <ol className="list-decimal list-inside">{children}</ol>;
    },
    [BLOCKS.LIST_ITEM]: (_node: any, children: any) => {
      return (
        <li>
          <div className="inline-block w-fit max-w-[calc(100%-50px)] align-top">
            {children}
          </div>
        </li>
      );
    },
    [BLOCKS.TABLE]: (_node: any, children: any) => (
      <table className="w-full table-auto">
        <tbody>{children}</tbody>
      </table>
    ),
    [BLOCKS.TABLE_ROW]: (_node: any, children: any) => <tr className="odd:bg-neutral-90">{children}</tr>,
    [BLOCKS.TABLE_CELL]: (_node: any, children: any) => <td className="px-3 py-4 text-grey-30 text-size-subtitle1">{children}</td>,
  },
};

const ProductOverview: React.FC<IProductOverviewDetails> = ({
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
  state,
  rating,
  warranty
}) => {
  const imagesCollectionLocal = [promoImage, ...imagesCollection.items];
  const [isActivedModal, setIsActivedModal] = useState(false);
  const [paramModal, setParamModal] = useState<IPromoContent>();
  const [modalChild, setmodalChild] = useState<any>();

  const openModal = (service: string) => {
    if (service === "shipping") {
      setParamModal({
        promoTitle: 'Tipo de envío'
      });
      setmodalChild(<ModalShipping />);
    } else {
      setParamModal({
        promoTitle: 'Instala tu gasodoméstico'
      });
      setmodalChild(<ModalIntall />);
    }
    setmodalChild(service === "shipping" ? <ModalShipping /> : <ModalIntall />);
    setIsActivedModal(false);
    setTimeout(() => {
      setIsActivedModal(true);
    }, 200);
  };

  return (
    <section className="bg-white section">
      <div className="flex flex-col gap-10 lg:gap-[72px]">
        <section className="flex flex-col gap-4 lg:flex-row 2xl:gap-9">
          {imagesCollectionLocal?.length && (
            <div className="w-full lg:w-1/2 xl:max-w-[595px]">
              <Carousel content={imagesCollectionLocal} enableLoop={false} />
              <div className="w-1/2 mt-9">
                <CustomLink
                  className="text-sm underline text-grey-60"
                  content={{
                    urlPath: "politica-de-cambios-devoluciones-y-derecho-de-retracto"
                  }}
                >
                  Ten en cuenta nuestra política de cambios y devoluciones y derecho de retracto
                </CustomLink>
              </div>
            </div>
          )}
          <div className="flex xl:flex-grow">
            <div className="flex flex-col w-full gap-9">
              <div className="flex flex-col gap-[11px]">
                {sku && (
                  <div className="text-sm text-grey-30">
                    <p>CÓDIGO SKU: {sku}</p>
                  </div>
                )}
                {promoTitle && (
                  <h2 className="text-blue-dark">{promoTitle}</h2>
                )}
                <h4 className="text-blue-dark">Marca y detalles generales</h4>
                <div className="flex flex-col sm:flex-row gap-[34px] md:items-center mt-[-1px] ml-1">
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
                        <h5>{state}</h5>
                      </div>
                    )}
                    {promotion && (
                      <div className="flex px-2 py-1 text-center uppercase rounded-lg bg-category-sky-blue h-fit">
                        <h5>{promotion} de descuento</h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Caracteristicas */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                <div className="py-[10px] flex flex-col gap-6 min-w-[285px]">
                  <div className="flex flex-col gap-[18px] bg-slate-50 p-3 rounded-xl">
                    <h4 className="text-blue-dark">
                      Características del <br /> producto
                    </h4>
                    {productFeatures && (
                      <div className="flex flex-col gap-[5px] text-blue-dark">
                        {documentToReactComponents(productFeatures.json, options)}
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
                  <div className="bg-category-sky-blue-90 p-3 gap-[10px] flex flex-col rounded-xl w-fit xl:w-full 2xl:w-full">
                    <h4>
                      ¿Aún no tienes crédito <br /> con Vanti?
                    </h4>
                    <div className="flex justify-between">
                      <CustomLink
                        className="underline text-[#035177] text-sm mt-[7px]"
                        content={{
                          urlPath: "financiacion/vanti-listo"
                        }}
                      >
                        Conóce mas
                      </CustomLink>
                      <Image
                        width={48}
                        height={34}
                        src="/images/VantiListo.png"
                        alt="vanti"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="font-medium leading-4 text-blue-dark">
                      <div>
                        <p>¿Tienes dudas?</p>
                      </div>
                      <CustomLink
                        content={{
                          urlPath: "centro-de-ayuda/preguntas-frecuentes"
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
                </div>
                <div className="sm:pl-[13px] flex flex-col gap-[8px]">
                  <div className="flex justify-between gap-2">
                    {priceBefore && (
                      <h4 className="line-through text-[#035177]">
                        {priceBefore} Antes
                      </h4>
                    )}
                    <div className="flex gap-1">
                      <Icon {...iconPSE} />
                      <Icon {...iconInvoice} />
                    </div>
                  </div>
                  {(price == undefined || productsQuantity == undefined || Number(productsQuantity) <= 0) && (
                    <div className="relative w-full 2xl:min-w-[348px] px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                      <strong className="font-bold">Info! </strong>
                      <span className="block sm:inline">Este producto no se encuentra disponible en este momento.</span>
                    </div>
                  )}
                  {(price && productsQuantity && Number(productsQuantity) > 0) ?
                    <>
                      <h1 className="text-[#035177]">{price} Hoy</h1>
                      <div className="text-sm text-grey-30">
                        <p>{productsQuantity} unidades disponibles</p>
                      </div>
                    </>
                    : ''}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col gap-[15px]"
                  >
                    <div className="flex flex-col gap-[22px] pt-[5px] my-5">
                      {(sku && price && (productsQuantity && Number(productsQuantity) > 0)) ?
                        <a
                          className="button button-primary 2xl:min-w-[348px] text-center border border-solid border-lucuma"
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
                        : ''}
                      <CustomLink
                        className="button button-outline 2xl:min-w-[348px] text-center block"
                        content={{ urlPath: "gasodomesticos" }}
                      >
                        Te llamamos
                        <Icon {...iconCallback} />
                      </CustomLink>
                    </div>
                    <ul className='flex flex-col gap-[22px]'>
                      <li className="flex flex-col gap-2">
                        <p className="text-size-subtitle1 text-blue-dark">Instala tu gasodoméstico</p>
                        <div className="px-3 py-2">
                          <p onClick={() => openModal('install')} className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer">
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="expert" className="flex items-center w-full h-full text-neutral-30" />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">Contrata el servicio</span>
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="arrow-right" className="flex items-center w-full h-full text-neutral-30" />
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="flex flex-col gap-2">
                        <p className="text-size-subtitle1 text-blue-dark">Tipo de envío</p>
                        <div className="px-3 py-2">
                          <p onClick={() => openModal('shipping')} className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer">
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="expert" className="flex items-center w-full h-full text-neutral-30" />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">Estándar (5 a 10 dias hábiles)</span>
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="arrow-right" className="flex items-center w-full h-full text-neutral-30" />
                            </span>
                          </p>
                        </div>
                      </li>
                      {warranty && (
                        <li className="flex flex-col gap-2">
                          <p className="text-size-subtitle1 text-blue-dark">Garantía</p>
                          <div className="px-3 py-2">
                            <p
                              onClick={() => { scrollContent("content-warranty"); }}
                              className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer">
                              <span className="flex items-center w-6 h-6 shrink-0">
                                <Icon icon="expert" className="flex items-center w-full h-full text-neutral-30" />
                              </span>
                              <span className="text-size-p2 leading-[1.2] text-grey-30 grow">{warranty.name}</span>
                              <span className="flex items-center w-6 h-6 shrink-0">
                                <Icon icon="arrow-right" className="flex items-center w-full h-full text-neutral-30" />
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

        <div className="flex flex-col w-3/5 gap-y-12">
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

          {(promoDescription || warranty) &&
            <div className="grid items-baseline grid-cols-2 gap-6">
              {promoDescription && (
                <div className="grid gap-8">
                  <h2 className="text-blue-dark">Descripción</h2>
                  <div className="">
                    {documentToReactComponents(promoDescription.json, options)}
                  </div>
                </div>
              )}

              {warranty && (
                <div id="content-warranty" className="grid gap-8">
                  <h2 className="text-blue-dark">Garantía</h2>
                  {documentToReactComponents(warranty.description.json, options)}
                </div>
              )}
            </div>
          }

        </div>
      </div>
      {isActivedModal &&
        <ModalSuccess {...paramModal} isActive={isActivedModal}>
          {modalChild}
        </ModalSuccess>
      }
    </section>

  );
};

export default ProductOverview;
