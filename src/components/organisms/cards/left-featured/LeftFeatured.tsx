import Image from "next/image";
import Link from "next/link";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const LeftFeatured: React.FC<IPromoContent> = ({
  promoTitle,
  subtitle,
  promoDescription,
  cta,
  promoImage,
}) => {
  return (
    <article className="bg-white shadow md:flex min-h-[400px] rounded-xl overflow-hidden">
      {promoImage && (
        <figure className="w-full md:w-1/2 xl:w-[488px] shrink-0 grow relative object-cover">
          <Image
            src={promoImage.url}
            alt={promoImage.title}
            fill
          />
        </figure>
      )}
      {(subtitle || promoTitle || promoDescription) && (
        <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-8 md:pl-[52px] md:pr-9 md:py-4 grow">
          <div className="grid space-y-3">
            {subtitle && (
              <p className=" text-blue-dark title is-4">{subtitle}</p>
            )}
            {promoTitle && (
              <h3 className="title is-2 text-blue-dark pb-6">{promoTitle}</h3>
            )}
            {promoDescription && <p className="text-grey-60 pb-3">{promoDescription}</p>}
            {cta &&
              <div className="flex gap-3">
                <Link href={cta.href}>
                  <a className={`button ${cta.buttonType ?? 'button-outline'}`}>{cta.name}</a>
                </Link>
              </div>
            }
          </div>
        </div>
      )}
    </article>
  );
};

export default LeftFeatured;
