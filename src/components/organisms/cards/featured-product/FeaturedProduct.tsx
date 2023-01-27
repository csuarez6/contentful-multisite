import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import useSWR from "swr";

import { IProductOverviewDetails } from "@/lib/interfaces/product-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";



const FeaturedProduct: React.FC<IProductOverviewDetails> = ({
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
  sku,
  trademark
}) => {
  
  const [productPrices, setProductPrices] = useState<any>({
    price,
    priceBefore,
  });

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/product/prices/${sku}`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading && !error && data) {
      setProductPrices({
        price: data.price,
        data: data.priceBefore,
      });
    }
  }, [data, isLoading, error]);

  return (
    <article className="bg-white p-6 rounded-[10px] shadow-card-overview flex flex-col gap-6 w-full">
      {(state || promotion || imagesCollection?.items) && (
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
            <div className="relative aspect-[336/291]">
              {promoImage ? (
                <figure className="aspect-[336/291]">
                  <Image
                    alt={promoImage.title || "card"}
                    src={promoImage.url}
                    fill
                    className="w-full h-full"
                  />
                </figure>
              ) : (
                <figure className="aspect-[336/291]">
                  <Image
                    alt={imagesCollection.items[0].title || "card"}
                    src={imagesCollection.items[0].url}
                    fill
                    className="w-full h-full"
                  />
                </figure>
              )}
              {cta ? (
                <Link href={cta.href}>
                  <a className="absolute bottom-0 left-0 px-[18px] py-[9px] bg-lucuma rounded-[20px] z-10">
                    {cta?.name}
                  </a>
                </Link>
              ) : (
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
              {promoTitle && (
                <h3 className="text-blue-dark title is-4">{promoTitle}</h3>
              )}
              <div className="flex items-center gap-[13px] mr-1">
                <figure>
                  <Image
                    src="/images/star.png"
                    width={15}
                    height={15}
                    alt="star"
                    priority
                  />
                </figure>
                {rating && (
                  <div className="text-blue-dark text-size-subtitle2 font-bold">
                    <p>{rating}/5</p>
                  </div>
                )}
              </div>
            </div>
            {trademark && (
              <div className="text-size-small text-blue-dark">
                {trademark.name}
              </div>
            )}
          </div>
          {(productPrices.price || productPrices.priceBefore) && (
            <div className="flex flex-col gap-[6px]">
              {priceBefore && (
                <p className="title is-4 line-through text-blue-dark">
                  {productPrices.priceBefore}
                </p>
              )}
              {productPrices.price && (
                <p className="title is-2 text-blue-dark">
                  {productPrices.price}
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
