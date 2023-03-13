import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import { ICarouselCategoryBlock } from "@/lib/interfaces/content-filter-cf.interface";
import { classNames } from "@/utils/functions";

const CarouselCategories: React.FC<
  IPromoContent & ISelect & ICarouselCategoryBlock
> = ({
  promoTitle,
  image,
  name,
  promoImage,
  internalLink,
  linkParameters,
  queryParamName = "categoria",
  value = null,
  filterName
}) => {

    const { asPath } = useRouter();
    const fullPath = asPath.split("?")[0];

    if (!promoImage && !promoTitle && internalLink?.urlPath) return;

    let link = internalLink?.urlPath
      ? internalLink.urlPath
      : value !== "*"
        ? `${fullPath}?${queryParamName}=${value}`
        : fullPath;

    link = linkParameters ? link + linkParameters : link;

    return (
      <article className="flex justify-center">
        <Link href={link}>
          <span className="flex flex-col gap-2 items-center h-full group">
            {(promoImage || image) && (
              <figure className="relative w-[98px] h-[98px]">
                <Image
                  src={promoImage?.url ?? image?.url}
                  alt={promoImage?.title ?? image?.title}
                  width={promoImage?.width ?? image?.width ?? 50}
                  height={promoImage?.height ?? image?.height ?? 50}
                  className={
                    classNames(
                      "object-cover rounded-full w-full h-full border border-neutral-80 group-hover:border-[3px] group-hover:border-neutral-70",
                      (filterName !== null && (filterName?.toLowerCase() === promoTitle?.toLowerCase() || filterName?.toLowerCase() === name?.toLowerCase())) && 'border-[4px] border-neutral-70'
                    )
                  }
                />
              </figure>
            )}
            {(promoTitle || name) && (
              <p className={
                classNames(
                  "text-center text-slate-600 font-semibold group-hover:underline ",
                  (filterName !== null && (filterName?.toLowerCase() === promoTitle?.toLowerCase() || filterName?.toLowerCase() === name?.toLowerCase())) && 'underline'
                )
              }
              >
                {promoTitle ?? name}
              </p>
            )}
          </span>
        </Link>
      </article>
    );
  };

export default CarouselCategories;
