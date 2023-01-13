import Image from "next/image";
import {
  IProductDetails,
  PaymentMethodType,
} from "@/lib/interfaces/product-cf.interface";
import Carousel from "@/components/organisms/carousel/Carousel";
import Rating from "@/components/organisms/ratings/Rating";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

const iconSelect: IIcon = {
  icon: "invoice",
  size: 28,
  className: "",
};

const ProductOverview: React.FC<IProductDetails> = ({
  productName,
  price,
  details,
  onBuy,
  features,
  carouselData,
  cta,
  priceBefore,
  productsQuantity,
  promotion,
  referenceCode,
  state,
  rating,
}) => {
  return (
    <section className="bg-white">
      <div className="flex flex-col gap-10 lg:gap-[72px]">
        <section className="flex flex-col lg:flex-row 2xl:gap-9 gap-4">
          {carouselData && (
            <div className="w-full lg:w-1/2 xl:max-w-[595px]">
              <Carousel {...carouselData} />
            </div>
          )}
          <div className="flex xl:flex-grow">
            <div className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-[11px]">
                {referenceCode && (
                  <div className="text-sm text-grey-30">
                    <p>CÓDIGO SKU: {referenceCode}</p>
                  </div>
                )}
                {productName && (
                  <h2 className="text-blue-dark">{productName}</h2>
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
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                <div className="py-[10px] sm:pl-[11px] flex flex-col gap-[57px] min-w-[285px]">
                  <div className="flex flex-col gap-[18px]">
                    <h4 className="text-blue-dark">
                      Caracteristicas del <br /> producto
                    </h4>
                    {details && (
                      <div className="flex flex-col gap-[5px]">
                        {details.map((el, i) => {
                          if (!el) return;
                          const detail = el.split(":");
                          return (
                            <div key={i} className="flex text-blue-dark gap-2">
                              <strong>{detail[0]}:</strong>
                              <p>{detail[1]}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <CustomLink
                      className="underline text-[#035177] text-sm mt-[7px]"
                      content={{ externalLink: "#" }}
                    >
                      Revisa todas las carateristicas
                    </CustomLink>
                  </div>
                  <div className="bg-category-sky-blue-90 p-3 gap-[10px] flex flex-col rounded-xl -m-3 w-fit xl:w-full 2xl:w-fit">
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
                  <div className="mt-[-8px]">
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
                        ${priceBefore} Antes
                      </h4>
                    )}
                    <div className="flex gap-1">
                      <Icon {...iconSelect} />
                      <Icon {...iconSelect} />
                    </div>
                  </div>
                  {price && <h1 className="text-[#035177]">${price} Hoy</h1>}
                  {productsQuantity && (
                    <div className="text-grey-30 text-sm">
                      <p>{productsQuantity} unidades disponibles</p>
                    </div>
                  )}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col gap-[15px]"
                  >
                    <div className="flex flex-col gap-[22px] pt-[5px] my-5">
                      {cta && (
                        <a
                          className="button button-primary 2xl:min-w-[348px] text-center"
                          href={cta.href}
                          onClick={(e) => {
                            e.preventDefault();
                            if (onBuy)
                              onBuy(
                                PaymentMethodType.pse,
                                "TSHIRTMS000000FFFFFFLXXX"
                              );
                          }}
                        >
                          {cta.name}
                        </a>
                      )}
                      <CustomLink
                        className="button button-outline 2xl:min-w-[348px] text-center"
                        content={{ urlPath: "/" }}
                      >
                        Te llamamos
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
                      <li className="flex flex-col gap-2">
                        <p className="text-size-subtitle1 text-blue-dark">Garantía</p>
                        <div className="px-3 py-2">
                          <p className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70 cursor-pointer">
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="expert" className="w-full h-full flex items-center text-neutral-30" />
                            </span>
                            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">1 año con el fabricante</span>
                            <span className="flex items-center w-6 h-6 shrink-0">
                              <Icon icon="arrow-right" className="w-full h-full flex items-center text-neutral-30" />
                            </span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-6">
          {features?.main && (
            <div className="grid gap-9 col-span-2">
              <h2 className="text-blue-dark">Características principales</h2>
              <table className="table-auto">
                <tbody>
                  {features.main.map((item) => (
                    <tr className="odd:bg-neutral-90" key={item.name}>
                      <td className="px-3 py-4 text-grey-30 text-size-subtitle1">
                        {item.name}
                      </td>
                      <td className="px-3 py-4 text-grey-30 text-size-p1">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex">
                <button className="button button-outline">
                  Ver más características
                </button>
              </div>
            </div>
          )}

          {features?.description && (
            <div className="grid gap-9 mt-6">
              <h2 className="text-blue-dark">Descripción</h2>
              <ul className="pl-4">
                {features.description.map((item) => (
                  <li className="list-disc" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {features?.warranty && (
            <div className="grid gap-9 mt-6">
              <h2 className="text-blue-dark">Garantía</h2>
              <ul className="pl-4">
                {features.warranty.map((item) => (
                  <li
                    className="list-disc"
                    key={item}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
