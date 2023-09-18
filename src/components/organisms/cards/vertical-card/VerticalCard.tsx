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

const RenderCard: React.FC<IPromoContent & IPage> = (props) => {
  const {
    name,
    promoTitle,
    promoDescription,
    promoImage,
    children = null,
  } = props;

  return (
    <article className="bg-white overflow-hidden w-full h-full flex flex-col">
      {promoImage && (
        <figure className={classNames(
          "w-full relative overflow-hidden",
          promoImage.isPortrait ? "aspect-[588/536]" : "aspect-[588/180]"
        )}>
          <Image
            src={promoImage.url}
            alt={promoImage.title}
            width={promoImage.width}
            height={promoImage.height}
            className={classNames(
              "h-full w-full object-cover group-hover:scale-110 transition-transform duration-500",
              promoImage.isPortrait ? "aspect-[588/536]" : "aspect-[588/180]"
            )}
          />
        </figure>
      )}

      <div className="w-full p-6 flex flex-col flex-grow justify-between">
        {(promoTitle || promoDescription || name) && (
          <div className="grid gap-2">
            {(promoTitle || name) && (
              <h3 className="text-blue-dark group-hover:text-category-blue-dark transition-colors duration-500">{promoTitle || name}</h3>
            )}
            {promoDescription?.json && (
              <div className="text-blue-dark-8 text-size-p1">
                {documentToReactComponents(promoDescription.json)}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </article>
  );
};

const VerticalCard: React.FC<IPromoContent & IPage> = (props) => {
  const {
    name,
    promoTitle,
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

  const isModalView = linkView === "Modal" && content.json;

  return (
    <CustomLink
      content={props}
      linkClassName="max-w-[588px] w-full h-full overflow-hidden shadow rounded-xl group"
      className="w-full h-full"
    >
      <RenderCard {...props}>
        {isModalView
          ? (
            <div className="flex gap-2">
              <ButtonAtom
                type={linkView}
                text={ctaLabel ?? name}
                classes={getButtonType("Contorno")}
                modalClass="w-auto max-w-7xl"
              >
                {documentToReactComponents(
                  attachLinksToRichtextContent(content?.json, content?.links),
                  defaultFormatOptions
                )}
              </ButtonAtom>
            </div>
          )
          : (<>
            {(internalLink?.urlPaths?.[0] || externalLink || urlPaths) && (
              <div
                className={classNames(
                  "flex mt-6 grow items-end",
                  getAlign(alignButton) === "left"
                    ? "justify-start"
                    : "justify-center"
                )}
              >
                <span
                  className={classNames(
                    "button block",
                    getButtonType(buttonType ?? "Contorno")
                  )}
                >
                  {getLinkProps(props).textLink ?? "conoce mas"}
                </span>
              </div>
            )}
            {mediaInternalLink && (
              <div className="flex items-end mt-3 flex-grow">
                <span
                  className={classNames(
                    "button !rounded-full",
                    getButtonType(buttonType ?? "Contorno")
                  )}
                >
                  {ctaLabel ?? promoTitle ?? name}
                </span>
              </div>
            )}
          </>)
        }
      </RenderCard>
    </CustomLink>
  );
};

export default VerticalCard;
