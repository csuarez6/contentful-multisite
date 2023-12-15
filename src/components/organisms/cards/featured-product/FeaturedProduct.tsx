import React from "react";
import Image from "next/image";
import { event as gTagEvent } from "nextjs-google-analytics";

import { IAllyOverviewDetails, IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";
import { isAvailableGasAppliance, isAvailableVantilisto, isGasAppliance } from "@/utils/functions";
import { logoVantiListo } from "@/components/blocks/product-details/ProductConfig";

const iconCellphone: IIcon = {
  icon: "cellphone",
  size: 28,
  className: "h-5 w-5",
};

const iconLocation: IIcon = {
  icon: "place",
  size: 28,
  className: "h-5 w-5",
};

interface IAFeaturedProduct {
  hideBeforePrice?: boolean,
  hideDecimalPrice?: boolean
}

const FeaturedProduct: React.FC<IProductOverviewDetails & IAllyOverviewDetails & IAFeaturedProduct> = (props) => {
  const {
    __typename,
    name,
    promoTitle,
    cta,
    priceGasodomestico,
    priceBeforeGasodomestico,
    priceVantiListo,
    priceBeforeVantiListo,
    productsQuantityGasodomestico,
    productsQuantityVantiListo,
    rating,
    imagesCollection,
    paymentMethods,
    promoImage,
    trademark,
    category,
    phone,
    address,
    city,
    hideBeforePrice,
    hideDecimalPrice = true,
    marketId,
    isNew,
    discount,
    sku
  } = props;
  const onClick = () => {
    const isGasodomestico = isGasAppliance(marketId);

    gTagEvent("select_item", {
      items: [{
        item_id: `SKU_${sku}`,
        item_name: promoTitle ?? name,
        coupon: '',
        discount: discount,
        index: 0,
        item_list_name: isGasodomestico ? "Gasodoméstico" : "Catálogo VantiListo",
        item_list_id: isGasodomestico ? "Lista_Gasodomésticos" : "Catálogo_VantiListo",
        affiliation: isGasodomestico ? 'Marketplace Gasodoméstico' : 'Marketplace VantiListo',
        item_brand: trademark?.name ?? '',
        item_category: category?.name ?? "",
        item_variant: '',
        price: isGasodomestico ? priceGasodomestico : priceVantiListo,
        currency: 'COP',
        quantity: 1
      }],
      item_list_name: isGasodomestico ? "Gasodoméstico" : "Catálogo VantiListo",
      item_list_id: isGasodomestico ? "Lista_Gasodomésticos" : "Catálogo_VantiListo"
    });

    gTagEvent("ProductInfo", {
      'product': {
        'id': `SKU_${sku}`,
        'name': promoTitle ?? name,
        'category': category?.name ?? "",
        'brand': trademark?.name ?? ''
      }
    });
  };

  const imageSize = __typename == 'AuxAlly' ? { 'w': 384, 'h': 180 } : { 'w': 336, 'h': 291 };

  return (
    <CustomLink
      onClick={onClick}
      linkClassName="w-full h-full"
      className="w-full h-full"
      content={cta
        ? { externalLink: cta.href }
        : { ...props }
      }
    >
      <article className="relative w-full h-full group">
        {(isNew || discount) && (
          <div className="flex text-sm leading-none flex-wrap gap-2 absolute top-6 left-6 z-10 group-[.card-mega-menu]:left-0 group-[.card-mega-menu]:top-0">
            {isNew && <span className="p-2 uppercase rounded-md bg-yellow-100 leading-none group-[.card-mega-menu]:p-1.5 group-[.card-mega-menu]:text-[10px]">nuevo</span>}
            {discount && <span className="p-2 uppercase rounded-md bg-blue-100 leading-none group-[.card-mega-menu]:p-1.5 group-[.card-mega-menu]:text-[10px]">{discount} de descuento</span>}
          </div>
        )}
        <div className="featured-product bg-white p-6 rounded-[10px] shadow-card-overview flex flex-col gap-[45px] w-full h-full justify-between">
          {(imagesCollection?.items || promoImage) && (
            <div className="flex flex-col gap-2 h-full">
              {(imagesCollection?.items || cta || promoImage) && (
                <div className={`relative mt-5 h-fit`}>
                  {promoImage ? (
                    <figure className="relative h-full max-h-[350px] min-h-[350px]">
                      <Image
                        alt={promoImage.title}
                        src={promoImage.url}
                        width={imageSize.w}
                        height={imageSize.h}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                  ) : (
                    <figure className="relative h-full md:max-h-[350px]">
                      <Image
                        alt={imagesCollection?.items[0]?.title}
                        src={imagesCollection?.items[0]?.url}
                        width={imageSize?.w}
                        height={imageSize?.h}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                  )}
                  <span className="absolute bottom-0 left-0 button button-primary w-fit z-10 group-[.card-mega-menu]:leading-none group-[.card-mega-menu]:text-[13px]">
                    {cta ? cta.name : "Conoce más"}
                  </span>
                </div>
              )}
            </div>
          )}
          {promoTitle && (
            <div className="flex flex-col gap-[25px] h-full justify-center">
              <div className="flex flex-col gap-[7px] w-full">
                <div className="flex flex-wrap items-center  gap-1">
                  <h3 className="group-[.card-mega-menu]:text-lg text-blue-dark title is-4  group-hover:text-category-blue-dark group-hover:-translate-y-1 transition-[color,transform] duration-500">{promoTitle}</h3>
                  {!!rating && (
                    <div className="flex items-center gap-[13px] mr-1">
                      <figure className="w-[15px]">
                        <Image
                          className="w-full h-full object-cover"
                          src="/images/star.png"
                          width={15}
                          height={15}
                          alt="star"
                          priority
                        />
                      </figure>
                      <div className="font-bold text-blue-dark text-size-subtitle2">
                        <p>{rating}/5</p>
                      </div>
                    </div>
                  )}
                </div>
                {address && (
                  <div className="flex gap-1 text-size-small text-blue-dark">
                    <Icon {...iconLocation} />
                    {address} - {city}
                  </div>
                )}
                {phone && (
                  <div className="flex gap-1 text-size-small text-blue-dark">
                    <Icon {...iconCellphone} />
                    {phone}
                  </div>
                )}
                {trademark && (
                  <div className="text-size-small text-blue-dark">
                    {trademark.name}
                  </div>
                )}
              </div>
              {(isAvailableGasAppliance(marketId, priceGasodomestico, productsQuantityGasodomestico) || isAvailableVantilisto(marketId, priceVantiListo, productsQuantityVantiListo)) && (
                <div className="flex flex-col gap-[6px]">
                  {/* Price before */}
                  {(priceBeforeGasodomestico !== priceGasodomestico || priceBeforeVantiListo !== priceBeforeVantiListo) && !hideBeforePrice && (
                    <p className="line-through title is-4 text-blue-dark before-price">
                      {isGasAppliance(marketId) ? priceBeforeGasodomestico : priceBeforeVantiListo}
                    </p>
                  )}

                  {/* Main price */}
                  <p className="group-[.card-mega-menu]:text-xl title is-2 text-blue-dark current-price">
                    {hideDecimalPrice ? (isGasAppliance(marketId) ? priceGasodomestico : priceVantiListo).split(",")[0] : (isGasAppliance(marketId) ? priceGasodomestico : priceVantiListo)}
                  </p>

                  {/* Secondary price */}
                  {isGasAppliance(marketId) && priceVantiListo && (
                    <p className="group-[.card-mega-menu]:text-xs text-[#545454] text-sm md:text-xl flex items-center gap-2">
                      <span>{hideDecimalPrice ? priceVantiListo.split(",")[0] : priceVantiListo}</span>
                      <Icon {...logoVantiListo} />
                    </p>
                  )}

                  {/* IVA price */}
                  <div className="text-xs text-grey-30">
                    <p>* IVA incluido</p>
                  </div>
                </div>
              )}
              {paymentMethods && (
                <div className="flex flex-col gap-2">
                  <div className="text-size-p2">
                    <p>Puedes pagar con:</p>
                  </div>
                  <div className="flex gap-1">
                    {paymentMethods?.map((el) => (
                      <p
                        className="px-2 py-1 rounded-lg title is-5 text-grey-10 bg-neutral-90"
                        key={`${el.name}-${promoTitle}`}
                      >
                        {el.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </CustomLink>
  );
};

export default FeaturedProduct;
