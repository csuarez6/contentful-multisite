import Image from "next/image";
import Link from "next/link";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";


const CarouselCategories: React.FC<IPromoContent> = ({ promoTitle, promoImage, internalLink }) => {
  if (!promoImage && !promoTitle && internalLink?.urlPath) return ;
  return (
    <article className="flex justify-center">
      <Link href={internalLink.urlPath} legacyBehavior>
        <a className="flex flex-col gap-2 items-center h-full group">
          {promoImage && (
            <figure className="relative min-w-[98px] min-h-[98px]">
              <Image
                src={promoImage.url}
                alt={promoImage.title}
                className="object-cover rounded-full w-full h-full"
                fill
              />
            </figure>
          )}
          {promoTitle && <p className="text-center text-slate-600 font-semibold group-hover:underline">{promoTitle}</p>}
        </a>
      </Link>
    </article>
  );
};

export default CarouselCategories;
