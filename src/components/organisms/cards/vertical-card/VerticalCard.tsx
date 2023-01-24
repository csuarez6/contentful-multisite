import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { IPage } from "@/lib/interfaces/page-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames, getButtonType } from "@/utils/functions";
import { getLinkProps } from "@/utils/link.utils";

const VerticalCard: React.FC<IPromoContent & IPage> = (props) => {
  const {
    name,
    promoTitle,
    promoDescription,
    promoImage,
    internalLink,
    externalLink,
    buttonType,
    urlPath
  } = props;

  return (
    <article className="bg-white shadow rounded-xl overflow-hidden w-full max-w-[588px]">
      {promoImage && (
        <figure
          className={classNames(
            "w-full relative",
            promoImage.isPortrait ? "aspect-[364/606]" : "aspect-[588/180]"
          )}
        >
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
            {(promoTitle || name) && <h3 className="text-blue-dark">{promoTitle ?? name}</h3>}
            {promoDescription?.json && (
              <div className="text-blue-dark-8 text-size-p1">
                {documentToReactComponents(promoDescription.json)}
              </div>
            )}
            {(internalLink?.urlPath || externalLink || urlPath) && (
              <div className="flex gap-3 mt-6">
                <CustomLink
                  content={props}
                  className={classNames(
                    "button",
                    getButtonType(buttonType ?? "Contorno")
                  )}
                >
                  {getLinkProps(props).textLink}
                </CustomLink>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default VerticalCard;
