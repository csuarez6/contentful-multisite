import Image from "next/image";
import Link from "next/link";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames, getButtonType } from "@/utils/functions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getUrlPath } from "@/utils/link.utils";

const VerticalCard: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    promoDescription,
    promoImage,
    ctaLabel,
    internalLink,
    externalLink,
    buttonType
  } = props;

  return (
    <article className="bg-white shadow rounded-xl overflow-hidden w-full max-w-[588px]">
      {promoImage && (
        <figure className={classNames("w-full relative", promoImage.isPortrait ? 'aspect-[364/606]' : 'aspect-[588/180]')}>
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
            {promoDescription?.json && <div className="text-blue-dark-8 text-size-p1">{documentToReactComponents(promoDescription.json)}</div>}
            {(internalLink?.urlPath || externalLink) && (
              <div className="flex gap-3 mt-6">
                <Link href={getUrlPath(props)} legacyBehavior>
                  <a
                    target={externalLink ? "_blank" : "_self"}
                    className={classNames("button", getButtonType(buttonType ?? "Contorno"))}>
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
