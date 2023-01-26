import Image from "next/image";
import Link from "next/link";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import {
  IProductCategory,
  ITrademark,
} from "@/lib/interfaces/content-filter-cf.interface";

const CarouselCategories: React.FC<
  IPromoContent & ITrademark & IProductCategory
> = ({ promoTitle, image, name, promoImage, internalLink }) => {
  if (!promoImage && !promoTitle && internalLink?.urlPath) return;
  return (
    <article className="flex justify-center">
      <Link
        href={internalLink?.urlPath ? internalLink.urlPath : "#"}
        legacyBehavior
      >
        <a className="flex flex-col gap-2 items-center h-full group">
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
          {promoTitle && (
            <p className="text-center text-slate-600 font-semibold group-hover:underline">
              {promoTitle ?? name}
            </p>
          )}
        </a>
      </Link>
    </article>
  );
};

export default CarouselCategories;
