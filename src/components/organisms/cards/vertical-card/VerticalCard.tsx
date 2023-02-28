import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { IPage } from "@/lib/interfaces/page-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames, getAlign, getButtonType } from "@/utils/functions";
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
    alignButton,
    urlPath
  } = props;

  return (
    <article className="bg-white shadow rounded-xl overflow-hidden w-full max-w-[588px] flex flex-wrap">
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
            width={promoImage.width}
            height={promoImage.height}
            className="h-full w-full object-cover"
            fill
          />
        </figure>
      )}

      <div className="w-full p-6 flex flex-col justify-end">
        {(promoTitle || promoDescription || name) && (
          <div className="grid">
            {(promoTitle || name) && <h3 className="text-blue-dark">{promoTitle || name}</h3>}
            {promoDescription?.json && (
              <div className="text-blue-dark-8 text-size-p1">
                {documentToReactComponents(promoDescription.json)}
              </div>
            )}
          </div>
        )}
        {(internalLink?.urlPath || externalLink || urlPath) && (
          <div className={classNames("flex mt-6", getAlign(alignButton) === 'left' ? 'justify-start' : 'justify-center')}>
            <CustomLink
              content={props}
              className={classNames(
                "button block",
                getButtonType(buttonType ?? "Contorno")
              )}
            >
              {getLinkProps(props).textLink}
            </CustomLink>
          </div>
        )}
      </div>

    </article>
  );
};

export default VerticalCard;
