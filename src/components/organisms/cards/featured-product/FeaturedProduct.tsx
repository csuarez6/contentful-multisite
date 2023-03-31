import React from "react";
import Image from "next/image";
import Link from "next/link";

import { IAllyOverviewDetails, IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";

const iconCellphone: IIcon = {
  icon: "cellphone",
  size: 28,
  className: "h-5 w-5",
};

const iconLocation: IIcon = {
  icon: "location",
  size: 28,
  className: "h-5 w-5",
};

const FeaturedProduct: React.FC<IProductOverviewDetails & IAllyOverviewDetails> = ({
  __typename,
  promoTitle,
  state,
  cta,
  price,
  priceBefore,
  rating,
  promotion,
  imagesCollection,
  paymentMethods,
  promoImage,
  urlPath,
  trademark,
  phone,
  address,
  city,
}) => {
  const imageSize = __typename == 'AuxAlly' ? {'w': 384, 'h': 180} : {'w': 336, 'h': 291};

  return (
    <article className="featured-product bg-white p-6 rounded-[10px] shadow-card-overview flex flex-col gap-6 w-full">
      {(state || promotion || imagesCollection?.items || promoImage) && (
        <div className="flex flex-col gap-2">
          {(state || promotion) && (
            <div className="flex gap-1">
              {state && (
                <div className="bg-lucuma-80 text-grey-10 uppercase px-2 py-1 flex items-center text-center rounded-lg text-sm font-medium">
                  <p>{state}</p>
                </div>
              )}
              {promotion && (
                <div className="bg-category-sky-blue text-grey-10 uppercase px-2 py-1 flex items-center text-center rounded-lg text-sm font-medium">
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
                    className="w-full h-full"
                  />
                </figure>
              ) : (
                <figure className={`aspect-[${imageSize.w}/${imageSize.h}]`}>
                  <Image
                    alt={imagesCollection.items[0].title}
                    src={imagesCollection.items[0].url}
                    width={imageSize.w}
                    height={imageSize.h}
                    className="w-full h-full"
                  />
                </figure>
              )}
              {cta ? (
                <Link legacyBehavior href={cta.href}>
                  <a className="absolute bottom-0 left-0 px-[18px] py-[9px] bg-lucuma rounded-[20px] z-10">
                    {cta?.name}
                  </a>
                </Link>
              ) : urlPath && (
                <CustomLink
                  className="absolute bottom-0 left-0 px-[18px] py-[9px] bg-lucuma rounded-[20px] z-10"
                  content={{
                    internalLink: { urlPath, promoTitle: "Conoce más" },
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
            <div className="flex justify-between flex-wrap items-center gap-1">
              <h3 className="text-blue-dark title is-4">{promoTitle}</h3>
              {rating && (
                <div className="flex items-center gap-[13px] mr-1">
                  <figure className="w-[15px]">
                    <Image
                      className="w-full h-full"
                      src="/images/star.png"
                      width={15}
                      height={15}
                      alt="star"
                      priority
                    />
                  </figure>
                  <div className="text-blue-dark text-size-subtitle2 font-bold">
                    <p>{rating}/5</p>
                  </div>
                </div>
              )}
            </div>
            {address && (
              <div className="text-size-small text-blue-dark">
                <Icon {...iconLocation} />
                {address} - {city}
              </div>
            )}
            {phone && (
              <div className="text-size-small text-blue-dark">
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
          {(price || priceBefore) && (
            <div className="flex flex-col gap-[6px]">
              {priceBefore && (
                <p className="title is-4 line-through text-blue-dark">
                  {priceBefore}
                </p>
              )}
              {price && (
                <p className="title is-2 text-blue-dark">
                  {price}
                </p>
              )}
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
                    className="title is-5 text-grey-10 bg-neutral-90 rounded-lg px-2 py-1"
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
