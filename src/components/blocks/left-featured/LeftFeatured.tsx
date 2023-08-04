import { useState, useEffect } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import {
  classNames,
  getBackgroundColorClass,
  getButtonType,
} from "@/utils/functions";
import { BLOCKS } from "@contentful/rich-text-types";
import { getLinkProps } from "@/utils/link.utils";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";
import defaultFormatOptions from "@/lib/richtext/default.formatter";

const options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (_node, children) => {
      return <ul className="my-6 list-disc list-inside">{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (_node, children) => {
      return <ol className="my-6 list-decimal list-inside">{children}</ol>;
    },
    [BLOCKS.LIST_ITEM]: (_node, children) => {
      return (
        <li>
          <div className="inline-block w-fit max-w-[calc(100%-50px)] align-top">
            {children}
          </div>
        </li>
      );
    },
  },
};

const LeftFeaturedBlock: React.FC<IPromoBlock> = ({
  title,
  pretitle,
  subtitle,
  description,
  image,
  ctaCollection,
  footerText,
  blockId,
  sysId,
  view,
}) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  const [hasRoundedImage, setHasRoundedImage] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () =>
      window.matchMedia("(min-width: 768px)").matches;
    setHasRoundedImage(checkMediaQuery() && view?.roundedImage);
    window.addEventListener("resize", () =>
      setHasRoundedImage(checkMediaQuery() && view?.roundedImage)
    );
  }, [view?.roundedImage]);
  return (
    <section
      id={blockId ?? sysId}
      className="grid section gap-7 md:gap-9"
    >
      {title && (
        <div className="grid text-center gap-9">
          {title && <h2 className="text-blue-dark">{title}</h2>}
        </div>
      )}

      <div
        className={view?.bannerWidth === "Largo" ? "-mx-[50vw]" : "relative"}
      >
        <div
          className={
            view?.bannerWidth === "Largo" ? "w-screen mx-auto" : "relative"

          }
        >
          <article
            className={classNames(
              "shadow-[-2px_-2px_0px_rgba(0,0,0,0.04),2px_2px_8px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden",
              view?.bannerWidth !== "Largo" && "rounded-xl",
              view?.roundedImage || view?.bannerWidth === "Largo"
                ? "lg:min-h-[428px]"
                : "lg:min-h-[400px]",
              view?.imageAlign === "Derecha"
                ? "md:flex-row-reverse"
                : "md:flex-row",
              backgroundColor.background
            )}
          >
            {image && (
              <>
                <svg
                  className="sr-only"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <clipPath
                    id={`path-img-${sysId}`}
                    clipPathUnits="objectBoundingBox"
                  >
                    <path
                      d="M1,0.006 V0.002 H0.002 V1 H0.024 H0.654 L0.662,1 L0.676,0.998 L0.69,0.993 L0.702,0.987 L0.716,0.979 L0.732,0.967 L0.746,0.954 L0.756,0.944 L0.765,0.932 L0.777,0.916 L0.789,0.895 L0.795,0.882 L0.8,0.871 L0.804,0.862 L0.807,0.853 L0.81,0.846 L0.813,0.836 L0.823,0.794 L0.837,0.731 L0.853,0.661 L0.864,0.612 L0.877,0.556 L0.89,0.5 L0.901,0.451 L0.91,0.409 L0.92,0.367 L0.934,0.304 L0.946,0.251 L0.968,0.153 L1,0.009 L1,0.006"
                      fill="black"
                      stroke="black"
                    />
                  </clipPath>
                  <clipPath
                    id={`path-img-reverse-${sysId}`}
                    clipPathUnits="objectBoundingBox"
                  >
                    <path
                      d="M0.002,0.999 V1 H1 V0.002 H0.979 H0.349 L0.341,0.004 L0.327,0.007 L0.313,0.012 L0.302,0.018 L0.287,0.026 L0.271,0.037 L0.257,0.05 L0.248,0.061 L0.238,0.072 L0.226,0.089 L0.214,0.11 L0.208,0.123 L0.203,0.133 L0.199,0.143 L0.196,0.152 L0.194,0.159 L0.19,0.168 L0.18,0.21 L0.166,0.273 L0.15,0.343 L0.139,0.393 L0.126,0.449 L0.113,0.505 L0.102,0.554 L0.093,0.596 L0.083,0.638 L0.069,0.701 L0.057,0.754 L0.035,0.852 L0.002,0.995 L0.002,0.999"
                      fill="black"
                      stroke="black"
                    />
                  </clipPath>
                </svg>

                <figure
                  className={classNames(
                    "relative w-full md:w-1/2 shrink-0 grow md:h-full overflow-hidden",
                    view?.bannerWidth === "Largo" && !view?.roundedImage && "xl:w-[630px]",
                    view?.bannerWidth !== "Largo" && !view?.roundedImage && "xl:w-[488px]",
                    view?.roundedImage && "xl:w-[630px] !h-auto"
                  )}
                  style={{
                    clipPath:
                      hasRoundedImage &&
                      (view?.imageAlign === "Derecha"
                        ? `url(#path-img-reverse-${sysId})`
                        : `url(#path-img-${sysId})`),
                  }}
                >
                  <Image
                    src={image?.url}
                    alt={image?.title ?? image?.description}
                    width={image?.width}
                    height={image?.height}
                    className={classNames(
                      "object-cover w-full h-full aspect-[328/180]",
                      view?.bannerWidth === "Largo" && !view?.roundedImage && "md:aspect-[630/428] xl:w-[630px]",
                      view?.bannerWidth !== "Largo" && !view?.roundedImage && "md:aspect-[488/400] xl:w-[488px]",
                      view?.roundedImage && "xl:w-[630px]"
                    )}
                  />
                </figure>
              </>
            )}
            {(subtitle || pretitle || description) && (
              <div
                className={classNames(
                  "flex items-center w-full md:w-1/2 lg:w-full px-3 py-6 md:pl-[45px] md:pr-10 md:py-4 grow",
                  !image && "justify-center"
                )}
              >
                <div className={classNames("grid space-y-3 w-full md:p-0", view?.bannerWidth === "Largo" && "px-[18px] sm:px-6 md:p-0")}>
                  {pretitle && (
                    <p
                      className={classNames(
                        "text-xs leading-[1.5] md:text-xl md:leading-[1.2] !font-semibold",
                        view?.backgroundColor == "Azul" ||
                          view?.backgroundColor == "Transparente"
                          ? "text-blue-dark"
                          : backgroundColor.title,
                        !image && "flex items-center justify-center"
                      )}
                    >
                      {pretitle}
                    </p>
                  )}
                  {subtitle && (
                    <h3
                      className={classNames(
                        "pb-1 text-lg md:text-4xl",
                        view?.backgroundColor == "Azul" ||
                          view?.backgroundColor == "Transparente"
                          ? "text-blue-dark"
                          : backgroundColor.title,
                        !image && "flex items-center justify-center"
                      )}
                    >
                      {subtitle}
                    </h3>
                  )}
                  {description && (
                    <div
                      className={classNames(
                        "richtext-container pb-3 text-sm lg:text-lg",
                        view?.backgroundColor == "Azul" ||
                          view?.backgroundColor == "Transparente"
                          ? "text-grey-30"
                          : backgroundColor.text,
                        !image && "flex items-center justify-center"
                      )}
                    >
                      {documentToReactComponents(description.json, options)}
                    </div>
                  )}

                  {ctaCollection?.items?.length > 0 && (
                    <div
                      className={classNames(
                        "flex flex-col gap-3 md:flex-row",
                        view?.backgroundColor == "Azul" ||
                          view?.backgroundColor == "Transparente"
                          ? "text-grey-30"
                          : backgroundColor.text,
                        !image && "justify-center"
                      )}
                    >
                      {ctaCollection.items.map((cta, idx) => {
                        return (
                          <div key={cta.name + "+" + idx}>
                            {(cta.externalLink ||
                              cta.internalLink ||
                              cta.__typename == CONTENTFUL_TYPENAMES.PAGE) && (
                                <CustomLink
                                  content={cta}
                                  className={classNames(
                                    "button w-full sm:w-auto flex justify-center text-center",
                                    view?.buttonType
                                      ? getButtonType(view?.buttonType)
                                      : idx === 0
                                        ? "button-primary"
                                        : "button-outline"
                                  )}
                                >
                                  {getLinkProps(cta).textLink}
                                </CustomLink>
                              )
                            }
                            {cta?.linkView === "Modal" && cta?.content?.json && (
                              <div className="flex gap-2">
                                <ButtonAtom
                                  type={cta?.linkView}
                                  text={cta?.ctaLabel ?? cta?.name}
                                  classes={getButtonType("Contorno")}
                                  modalClass="w-auto max-w-7xl"
                                >
                                  {documentToReactComponents(
                                    attachLinksToRichtextContent(
                                      cta?.content?.json,
                                      cta?.content?.links
                                    ),
                                    defaultFormatOptions
                                  )}
                                </ButtonAtom>
                              </div>
                            )}
                            {cta?.mediaInternalLink && (
                              <CustomLink
                                content={cta}
                                className={classNames(
                                  "button w-full sm:w-auto flex justify-center text-center",
                                  getButtonType("Contorno")
                                )}
                              >
                                {cta?.ctaLabel ?? cta?.promoTitle ?? cta?.name}
                              </CustomLink>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
      {footerText && (
        <div className="text-neutral-30 text-size-p2 richtext-container">
          {documentToReactComponents(footerText.json)}
        </div>
      )}
    </section>
  );
};

export default LeftFeaturedBlock;
