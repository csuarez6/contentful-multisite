import Image from "next/image";
import Link from "next/link";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const VerticalCard: React.FC<IPromoContent> = ({
  promoTitle,
  promoDescription,
  promoImage,
  cta
}) => {
  return (
    <article className="bg-white shadow rounded-xl overflow-hidden w-full max-w-[588px]">
      {promoImage && (
        <figure className="w-full relative aspect-[1280/392]">
          <Image
            src={promoImage.url}
            alt={promoImage.title}
            className="h-full w-full object-cover"
            fill
          />
        </figure>
      )}
      {(promoTitle || promoDescription) && (
        <div className="flex items-center w-full p-6">
          <div className="grid">
            {promoTitle && <h3 className="text-blue-dark">{promoTitle}</h3>}
            {promoDescription && <p className="text-blue-dark-8 text-size-p1">{promoDescription}</p>}
            {cta &&
              <div className="flex gap-3 mt-6">
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

export default VerticalCard;
