import { useState, useEffect } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import {
  classNames,
  getBackgroundColorClass
} from "@/utils/functions";
import { BLOCKS } from "@contentful/rich-text-types";

const LeftFeaturedBlock: React.FC<IPromoBlock> = ({
  title,
  pretitle,
  subtitle,
  description,
  image,
  ctaCollection,
  blockId,
  sysId,
  view,
}) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  const [hasRoundedImage, setHasRoundedImage] = useState(false);

  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (_node, children) => {
        return <ul className="list-disc list-inside my-6">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (_node, children) => {
        return <ol className="list-decimal list-inside my-6">{children}</ol>;
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
      id={blockId ? blockId : sysId}
      className="section grid gap-7 md:gap-9"
    >
      {title && (
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
        </div>
      )}

      <article
        className={classNames(
          "shadow-[-2px_-2px_0px_rgba(0,0,0,0.04),2px_2px_8px_rgba(0,0,0,0.08)] flex flex-col rounded-xl overflow-hidden",
          view?.roundedImage ? "lg:min-h-[428px]" : "lg:min-h-[400px]",
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
              viewBox="0 0 620 429"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <clipPath id="path-img" clipPathUnits="objectBoundingBox">
                <path
                  d="M1,0.078 V0.002 H0.002 V1 H0.67 L0.701,0.994 L0.725,0.982 L0.74,0.973 L0.757,0.958 L0.767,0.948 L0.78,0.932 L0.797,0.907 L0.811,0.881 L0.823,0.85 L0.83,0.827 L0.842,0.775 L0.893,0.555 L1,0.093 V0.078"
                  fill="black"
                  stroke="black"
                />
              </clipPath>
              <clipPath id="path-img-reverse" clipPathUnits="objectBoundingBox">
                <path
                  d="M0.002,0.078 V0.002 H1 V1 H0.333 L0.302,0.994 L0.278,0.982 L0.264,0.973 L0.246,0.958 L0.236,0.948 L0.223,0.932 L0.206,0.907 L0.192,0.881 L0.18,0.85 L0.173,0.827 L0.161,0.775 L0.11,0.555 L0.002,0.093 V0.078"
                  fill="black"
                  stroke="black"
                />
              </clipPath>
            </svg>

            <figure
              className={classNames(
                "relative w-full md:w-1/2 shrink-0 grow md:h-full aspect-[328/180] overflow-hidden",
                view?.roundedImage
                  ? "md:aspect-[630/428] xl:w-[630px]"
                  : "md:aspect-[488/400] xl:w-[488px]"
              )}
              style={{
                clipPath:
                  hasRoundedImage &&
                  (view?.imageAlign === "Derecha"
                    ? "url(#path-img-reverse)"
                    : "url(#path-img)"),
              }}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover w-full h-full"
              />
            </figure>
          </>
        )}
        {(subtitle || pretitle || description) && (
          <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-6 md:pl-[45px] md:pr-10 md:py-4 grow">
            <div className="grid space-y-3">
              {pretitle && (
                <p className="text-blue-dark text-xs leading-[1.5] md:text-xl md:leading-[1.2] !font-semibold">
                  {pretitle}
                </p>
              )}
              {subtitle && (
                <h3 className="text-lg md:text-4xl text-blue-dark pb-1">
                  {subtitle}
                </h3>
              )}
              {description && (
                <div className="text-grey-30 pb-3 text-sm lg:text-lg">
                  {documentToReactComponents(description.json, options)}
                </div>
              )}

              {ctaCollection?.items?.length > 0 && (
                <div className="flex flex-col md:flex-row gap-3">
                  {ctaCollection.items.map((cta, idx) =>
                    idx === 0
                      ? (cta.externalLink || cta.internalLink) && (
                          <CustomLink
                            content={cta}
                            key={cta.name}
                            className="button button-primary w-full sm:w-auto flex justify-center text-center"
                          >
                            {cta.promoTitle ?? cta.name}
                          </CustomLink>
                        )
                      : (cta.externalLink || cta.internalLink) && (
                          <CustomLink
                            content={cta}
                            key={cta.name}
                            className="button button-outline w-full sm:w-auto flex justify-center text-center"
                          >
                            {cta.promoTitle ?? cta.name}
                          </CustomLink>
                        )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </article>
    </section>
  );
};

export default LeftFeaturedBlock;
