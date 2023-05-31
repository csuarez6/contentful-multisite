import React from "react";
import Image from "next/image";
import Link from "next/link";

import { IAllyOverviewDetails, IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";
import { isAvailableGasAppliance, isAvailableVantilisto, isGasAppliance } from "@/utils/functions";

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

const FeaturedProduct: React.FC<IProductOverviewDetails & IAllyOverviewDetails & IAFeaturedProduct> = ({
  __typename,
  promoTitle,
  state,
  cta,
  priceGasodomestico,
  priceBeforeGasodomestico,
  priceVantiListo,
  priceBeforeVantiListo,
  productsQuantityGasodomestico,
  productsQuantityVantiListo,
  rating,
  promotion,
  imagesCollection,
  paymentMethods,
  promoImage,
  urlPaths,
  trademark,
  phone,
  address,
  city,
  hideBeforePrice,
  hideDecimalPrice,
  marketId
}) => {

  const imageSize = __typename == 'AuxAlly' ? { 'w': 384, 'h': 180 } : { 'w': 336, 'h': 291 };
  return (
    <article className="featured-product bg-white p-6 rounded-[10px] shadow-card-overview flex flex-col gap-6 w-full">
      {(state || promotion || imagesCollection?.items || promoImage) && (
        <div className="flex flex-col gap-2">
          {(state || promotion) && (
            <div className="flex gap-1">
              {state && (
                <div className="flex items-center px-2 py-1 text-sm font-medium text-center uppercase rounded-lg bg-lucuma-80 text-grey-10">
                  <p>{state}</p>
                </div>
              )}
              {promotion && (
                <div className="flex items-center px-2 py-1 text-sm font-medium text-center uppercase rounded-lg bg-category-sky-blue text-grey-10">
                  <p>{promotion} de descuento</p>
                </div>
              )}
            </div>
          )}
          {(imagesCollection?.items || cta || promoImage) && (
            <div className={`relative aspect-[${imageSize.w}/${imageSize.h}]`}>
              {promoImage ? (
                <figure className={`aspect-[${imageSize.w}/${imageSize.h}]`}>
                  <Image
                    alt={promoImage.title}
                    src={promoImage.url}
                    width={imageSize.w}
                    height={imageSize.h}
                    className="w-full h-full object-cover"
                  />
                </figure>
              ) : (
                <figure className={`aspect-[${imageSize.w}/${imageSize.h}]`}>
                  <Image
                    alt={imagesCollection.items[0].title}
                    src={imagesCollection.items[0].url}
                    width={imageSize.w}
                    height={imageSize.h}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}
              {cta ? (
                <Link legacyBehavior href={cta.href}>
                  <a className="absolute bottom-0 left-0 px-[18px] py-[9px] bg-lucuma rounded-[20px] z-10">
                    {cta?.name}
                  </a>
                </Link>
              ) : urlPaths && (
                <CustomLink
                  className="absolute bottom-0 left-0 px-[18px] py-[9px] bg-lucuma rounded-[20px] z-10"
                  content={{
                    internalLink: { urlPaths, promoTitle: "Conoce más" },
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
      {promoTitle && (
        <div className="flex flex-col gap-[25px]">
          <div className="flex flex-col gap-[7px]">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <h3 className="group-[.card-mega-menu]:text-lg text-blue-dark title is-4">{promoTitle}</h3>
              {rating && (
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
              {!hideBeforePrice && (
                <p className="line-through title is-4 text-blue-dark before-price">
                  {isGasAppliance(marketId) ? priceBeforeGasodomestico : priceBeforeVantiListo}
                </p>
              )}
              <p className="group-[.card-mega-menu]:text-xl title is-2 text-blue-dark current-price">
                {
                  hideDecimalPrice ? (isGasAppliance(marketId) ? priceGasodomestico : priceVantiListo).split(",")[0] : (isGasAppliance(marketId) ? priceGasodomestico : priceVantiListo)
                }
              </p>
              <div className="text-xs text-grey-30">
                <p>* Precio IVA incluido</p>
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
    </article>
  );
};

export default FeaturedProduct;
