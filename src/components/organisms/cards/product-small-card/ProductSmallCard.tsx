import Image from "next/image";
import Link from "next/link";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from "@/utils/functions";
import { getUrlPath } from "@/utils/link.utils";

const VerticalCard: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    promoImage,
    ctaLabel,
    internalLink,
    externalLink,
  } = props;

  const isPortrait = promoImage?.isPortrait;
  return (
    <article
      className={classNames(
        isPortrait
          ? "flex-col-reverse gap-6 pt-[70px] min-h-[492px]"
          : "min-h-[152px] py-6 items-center",
        "bg-neutral-90 shadow rounded-[18px] px-7 relative flex overflow-hidden"
      )}
    >
      {promoImage && (
        <div
          className={classNames(
            isPortrait
              ? "aspect-[377/300] -mx-7 -mb-6"
              : "absolute top-0 right-0 w-1/2",
            "h-full"
          )}
        >
          <figure className="w-full h-full relative">
            <Image
              src={promoImage.url}
              alt={promoImage.title}
              className="object-cover"
              fill
            />
          </figure>
        </div>
      )}
      {(promoTitle || ctaLabel) && (
        <div
          className={classNames(
            isPortrait ? "max-w-full" : "max-w-[55%]",
            "relative flex items-center w-full"
          )}
        >
          <div className="grid space-y-[18px]">
            {promoTitle && <h3 className="text-blue-dark">{promoTitle}</h3>}
            {(externalLink || internalLink?.urlPath) && (
              <div className="flex gap-3">
                <Link href={getUrlPath(props)} legacyBehavior>
                  <a
                    className="button button-primary"
                    target={externalLink ? "_blank" : "_self"}
                  >
                    {ctaLabel ?? name}
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default VerticalCard;
