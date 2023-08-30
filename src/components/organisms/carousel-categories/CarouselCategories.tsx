import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import { ICarouselCategoryBlock } from "@/lib/interfaces/content-filter-cf.interface";
import { classNames } from "@/utils/functions";

const CarouselCategories: React.FC<
  IPromoContent & ISelect & ICarouselCategoryBlock
> = (props) => {
  const {
    promoTitle,
    image,
    name,
    promoImage,
    internalLink,
    linkParameters,
    queryParamName = "categoria",
    value = null,
    filterName,
    isLink = true,
  } = props;
  const { asPath } = useRouter();
  const fullPath = asPath.split("?")[0];  
  let link = internalLink?.urlPaths?.[0]
    ? internalLink.urlPaths?.[0]
    : value !== "*"
    ? `${fullPath}?${queryParamName}=${value}`
    : fullPath;

  link = linkParameters ? link + linkParameters : link;
  return (
    <article className="flex justify-center h-full">
      {(link && !!isLink) ? (
        <Link href={link} className="h-full">
          <div
            className={classNames(
              "flex flex-col gap-2 items-center h-full group",
              promoImage || image ? "justify-start" : "justify-center"
            )}
          >
            {(promoImage || image) && (
              <figure className="relative w-[98px] h-[98px]">
                <Image
                  src={promoImage?.url ?? image?.url}
                  alt={promoImage?.title ?? image?.title}
                  width={promoImage?.width ?? image?.width ?? 50}
                  height={promoImage?.height ?? image?.height ?? 50}
                  className={classNames(
                    "object-cover rounded-full w-full h-full border border-neutral-80 group-hover:border-[3px] group-hover:border-neutral-70",
                    filterName !== null &&
                      (filterName?.toLowerCase() ===
                        promoTitle?.toLowerCase() ||
                        filterName?.toLowerCase() === name?.toLowerCase()) &&
                      "border-[4px] border-neutral-70"
                  )}
                />
              </figure>
            )}
            {(promoTitle || name) && (
              <h3
                className={classNames(
                  "text-center text-slate-600 !font-semibold group-hover:underline text-base",
                  filterName !== null &&
                    (filterName?.toLowerCase() === promoTitle?.toLowerCase() ||
                      filterName?.toLowerCase() === name?.toLowerCase()) &&
                    "underline"
                )}
              >
                {promoTitle ?? name}
              </h3>
            )}
          </div>
        </Link>
      ) : (
        <div
          className={classNames(
            "flex flex-col gap-2 items-center h-full group",
            promoImage || image ? "justify-start" : "justify-center"
          )}
        >
          {(promoImage || image) && (
            <figure className="relative w-[98px] h-[98px]">
              <Image
                src={promoImage?.url ?? image?.url}
                alt={promoImage?.title ?? image?.title}
                width={promoImage?.width ?? image?.width ?? 50}
                height={promoImage?.height ?? image?.height ?? 50}
                className={classNames(
                  "object-cover rounded-full w-full h-full border border-neutral-80 group-hover:border-[3px] group-hover:border-neutral-70",
                  filterName !== null &&
                    (filterName?.toLowerCase() === promoTitle?.toLowerCase() ||
                      filterName?.toLowerCase() === name?.toLowerCase()) &&
                    "border-[4px] border-neutral-70"
                )}
              />
            </figure>
          )}
          {(promoTitle || name) && (
            <h3
              className={classNames(
                "text-center text-slate-600 !font-semibold text-base",
              )}
            >
              {promoTitle ?? name}
            </h3>
          )}
        </div>
      )}
    </article>
  );
};

export default CarouselCategories;
