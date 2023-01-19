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
  size: 28,
  className: "",
};

const ProductOverview: React.FC<IProductOverviewDetails> = ({
  promoTitle,
  promoDescription,
  price,
  productFeatures,
  onBuy,
  features,
  imagesCollection,
  priceBefore,
  productsQuantity,
  promotion,
  sku,
  state,
  rating,
  warranty
}) => {
  return (

    <section className="section bg-white">
      <div className="flex flex-col gap-10 lg:gap-[72px]">
        <section className="flex flex-col lg:flex-row 2xl:gap-9 gap-4">
          {imagesCollection?.items?.length && (
            <div className="w-full lg:w-1/2 xl:max-w-[595px]">
              <Carousel content={imagesCollection.items} />
              <div className="mt-9 w-1/2">
                <CustomLink
                  className="text-sm underline text-grey-60"
                  content={{ externalLink: "#" }}
                >
                  Ten en cuenta nuestra política de cambios y devoluciones y derecho de retracto
                </CustomLink>
              </div>
            </div>
          )}
          <div className="flex xl:flex-grow">
            <div className="flex flex-col gap-9 w-full">
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
                  <div className="flex gap-[11px]">
                    {rating && <Rating numberStar={rating} />}
                    <CustomLink
                      className="text-sm underline text-blue-dark"
                      content={{ externalLink: "#" }}
                    >
                      Lée mas opiniones
                    </CustomLink>
                  </div>
                  <div className="flex gap-3">
                    {state && (
                      <div className="uppercase bg-category-orange-light flex h-fit py-1 px-2 rounded-lg">
                        <h5>{state}</h5>
                      </div>
                    )}
                    {promotion && (
                      <div className="uppercase bg-category-sky-blue flex h-fit py-1 px-2 rounded-lg text-center">
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
                        {documentToReactComponents(productFeatures.json)}
                      </div>
                    )}
                    <CustomLink
                      className="underline text-[#035177] text-sm mt-[7px]"
                      content={{ externalLink: "#" }}
                    >
                      Revisa todas las carateristicas
                    </CustomLink>
                  </div>
                  <div className="bg-category-sky-blue-90 p-3 gap-[10px] flex flex-col rounded-xl w-fit xl:w-full 2xl:w-full">
                    <h4>
                      ¿Aún no tienes crédito <br /> con Vanti?
                    </h4>
                    <div className="flex justify-between">
                      <p>Conóce mas</p>
                      <Image
                        width={48}
                        height={34}
                        src="/images/VantiListo.png"
                        alt="vanti"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="font-medium text-blue-dark leading-4">
                      <div>
                        <p>¿Tienes dudas?</p>
                      </div>
                      <CustomLink
                        content={{ externalLink: "#" }}
                        className="text-sm text-blue-dark underline"
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
                  <div className="flex gap-2 justify-between">
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
                  <h1 className="text-[#035177]">{price ?? 0} Hoy</h1>

                  <div className="text-grey-30 text-sm">
                    <p>{productsQuantity ?? 0} unidades disponibles</p>
                  </div>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col gap-[15px]"
                  >
                    <div className="flex flex-col gap-[22px] pt-[5px] my-5">
                      {sku && (
                        <a
                          className="button button-primary 2xl:min-w-[348px] text-center"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onBuy)
                              onBuy(
                                PaymentMethodType.pse,
                                sku
                              );
                          }}
                        >
                          Comprar con PSE
                        </a>
                      )}
                      <CustomLink
                        className="button button-outline 2xl:min-w-[348px] text-center block"
                        content={{ urlPath: "/" }}
                      >
                        Te llamamos
                        <span className="p-1">
                          <Icon {...iconCallback} />
                        </span>
                      </CustomLink>
                    </div>
                    <ul className='flex flex-col gap-[22px]'>
                      <li className="flex flex-col gap-2">
                        <p className="text-size-subtitle1 text-blue-dark">Instala tu gasodoméstico</p>
                        <div className="px-3 py-2">
                          <p className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer">
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="expert" className="w-full h-full flex items-center text-neutral-30" />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">Contrata el servicio</span>
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="arrow-right" className="w-full h-full flex items-center text-neutral-30" />
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="flex flex-col gap-2">
                        <p className="text-size-subtitle1 text-blue-dark">Tipo de envío</p>
                        <div className="px-3 py-2">
                          <p className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer">
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="expert" className="w-full h-full flex items-center text-neutral-30" />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">Estándar (5 a 10 dias hábiles)</span>
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="arrow-right" className="w-full h-full flex items-center text-neutral-30" />
                            </span>
                          </p>
                        </div>
                      </li>
                      {warranty && (
                        <li className="flex flex-col gap-2">
                          <p className="text-size-subtitle1 text-blue-dark">Garantía</p>
                          <div className="px-3 py-2">
                            <p className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer">
                              <span className="flex items-center w-6 h-6 shrink-0">
                                <Icon icon="expert" className="w-full h-full flex items-center text-neutral-30" />
                              </span>
                              <span className="text-size-p2 leading-[1.2] text-grey-30 grow">{warranty.name}</span>
                              <span className="flex items-center w-6 h-6 shrink-0">
                                <Icon icon="arrow-right" className="w-full h-full flex items-center text-neutral-30" />
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

        <div className="flex flex-col gap-y-12 w-3/5">
          {features && (
            <div className="grid gap-9 col-span-2">
              <h2 className="text-blue-dark">Características principales</h2>
              <div className="features-productOverview">
                {documentToReactComponents(features.json)}
              </div>
              <div className="flex">
                <button className="button button-outline">
                  Ver más características
                </button>
              </div>
            </div>
          )}

          {(promoDescription || warranty) &&
            <div className="grid grid-cols-2 gap-6">
              {promoDescription && (
                <div className="grid gap-8">
                  <h2 className="text-blue-dark">Descripción</h2>
                  <div className="promoDescription-productOverview">
                    {documentToReactComponents(promoDescription.json)}
                  </div>
                </div>
              )}

              {warranty && (
                <div className="grid gap-8">
                  <h2 className="text-blue-dark">Garantía</h2>
                  {documentToReactComponents(warranty.description.json)}
                </div>
              )}
            </div>
          }

        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
