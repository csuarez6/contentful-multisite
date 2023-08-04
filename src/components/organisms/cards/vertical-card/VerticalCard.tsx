import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { IPage } from "@/lib/interfaces/page-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames, getAlign, getButtonType } from "@/utils/functions";
import { getLinkProps } from "@/utils/link.utils";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";
import defaultFormatOptions from "@/lib/richtext/default.formatter";

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
    urlPaths,
    content,
    ctaLabel,
    linkView,
    mediaInternalLink,
  } = props;

  return (
    <article className="bg-white shadow rounded-xl overflow-hidden w-full max-w-[588px] flex flex-col">
      {promoImage && (
        <figure className="w-full relative">
          <Image
            src={promoImage.url}
            alt={promoImage.title}
            width={promoImage.width}
            height={promoImage.height}
            className={classNames(
              "h-full w-full object-cover",
              promoImage.isPortrait ? "aspect-[588/536]" : "aspect-[588/180]"
            )}
          />
        </figure>
      )}

      <div className="w-full p-6 flex flex-col flex-grow justify-between">
        {(promoTitle || promoDescription || name) && (
          <div className="grid gap-2">
            {(promoTitle || name) && (
              <h3 className="text-blue-dark">{promoTitle || name}</h3>
            )}
            {promoDescription?.json && (
              <div className="text-blue-dark-8 text-size-p1">
                {documentToReactComponents(promoDescription.json)}
              </div>
            )}
          </div>
        )}
        {(internalLink?.urlPaths?.[0] || externalLink || urlPaths) && (
          <div
            className={classNames(
              "flex mt-6 grow items-end",
              getAlign(alignButton) === "left"
                ? "justify-start"
                : "justify-center"
            )}
          >
            <CustomLink
              content={props}
              className={classNames(
                "button block",
                getButtonType(buttonType ?? "Contorno")
              )}
            >
              {getLinkProps(props).textLink ?? "conoce mas"}
            </CustomLink>
          </div>
        )}
        {linkView === "Modal" && content.json && (
          <div className="flex gap-2">
            <ButtonAtom
              type={linkView}
              text={ctaLabel ?? name}
              classes={getButtonType("Contorno")}
            >
              {documentToReactComponents(
                attachLinksToRichtextContent(content?.json, content?.links),
                defaultFormatOptions
              )}
            </ButtonAtom>
          </div>
        )}
        {mediaInternalLink && (
          <div className="flex items-end mt-3 flex-grow">
            <CustomLink
              content={props}
              className={classNames(
                "button !rounded-full",
                getButtonType(buttonType ?? "Contorno")
              )}
            >
              {ctaLabel ? ctaLabel : promoTitle ? promoTitle : name}
            </CustomLink>
          </div>
        )}
      </div>
    </article>
  );
};

export default VerticalCard;
