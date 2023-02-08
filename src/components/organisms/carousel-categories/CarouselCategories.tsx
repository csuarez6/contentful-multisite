import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import { ICarouselCategoryBlock } from "@/lib/interfaces/content-filter-cf.interface";

const CarouselCategories: React.FC<
  IPromoContent & ISelect & ICarouselCategoryBlock
> = ({
  promoTitle,
  image,
  name,
  promoImage,
  internalLink,
  queryParamName = "categoria",
  value = null,
}) => {
  const { asPath } = useRouter();
  const fullPath = asPath.split("?")[0];

  if (!promoImage && !promoTitle && internalLink?.urlPath) return;

  return (
    <article className="flex justify-center">
      <Link
        href={
          internalLink?.urlPath
            ? internalLink.urlPath
            : value !== "*"
            ? `${fullPath}?${queryParamName}=${value}`
            : fullPath
        }
      >
        <span className="flex flex-col gap-2 items-center h-full group">
          {(promoImage || image) && (
            <figure className="relative min-w-[98px] min-h-[98px]">
              <Image
                src={promoImage?.url ?? image.url}
                alt={promoImage?.title ?? image.title}
                className="object-cover rounded-full w-full h-full"
                fill
              />
            </figure>
          )}
          {(promoTitle || name) && (
            <p className="text-center text-slate-600 font-semibold group-hover:underline">
              {promoTitle ?? name}
            </p>
          )}
        </span>
      </Link>
    </article>
  );
};

export default CarouselCategories;
