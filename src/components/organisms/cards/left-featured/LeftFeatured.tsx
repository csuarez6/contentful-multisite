import { useState, useEffect } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames, getBackgroundColorClass, getButtonType } from "@/utils/functions";

const LeftFeatured: React.FC<IPromoContent & IPromoBlock> = (props) => {
  const {
    name,
    promoImage,
    promoTitle,
    promoDescription,
    internalLink,
    externalLink,
    subtitle,
    title,
    pretitle,
    description,
    image,
    ctaCollection,
    buttonType,
    view
  } = props;
  const propsLink = {
    name,
    promoTitle,
    internalLink,
    externalLink
  };
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  const [isMediumDevices, setIsMediumDevices] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => window.matchMedia("(min-width: 768px)").matches;
    setIsMediumDevices(checkMediaQuery);
    window.addEventListener('resize', () => setIsMediumDevices(checkMediaQuery));
  }, []);

  return (
    <article className={
      classNames(
        "shadow-[-2px_-2px_0px_rgba(0,0,0,0.04),2px_2px_8px_rgba(0,0,0,0.08)] flex flex-col rounded-xl overflow-hidden",
        view?.roundedImage ? "lg:min-h-[428px]" : "lg:min-h-[400px]",
        view?.imageAlign === 'Derecha' ? "md:flex-row-reverse" : "md:flex-row",
        backgroundColor.background
      )
    }>
      {(promoImage || image) && (
        <>
          <svg className="sr-only" viewBox="0 0 620 429" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="path-img" clipPathUnits="objectBoundingBox">
              <path d="M1,0.078 V0.002 H0.002 V1 H0.67 L0.701,0.994 L0.725,0.982 L0.74,0.973 L0.757,0.958 L0.767,0.948 L0.78,0.932 L0.797,0.907 L0.811,0.881 L0.823,0.85 L0.83,0.827 L0.842,0.775 L0.893,0.555 L1,0.093 V0.078" fill="black" stroke="black" />
            </clipPath>
            <clipPath id="path-img-reverse" clipPathUnits="objectBoundingBox">
              <path d="M0.002,0.078 V0.002 H1 V1 H0.333 L0.302,0.994 L0.278,0.982 L0.264,0.973 L0.246,0.958 L0.236,0.948 L0.223,0.932 L0.206,0.907 L0.192,0.881 L0.18,0.85 L0.173,0.827 L0.161,0.775 L0.11,0.555 L0.002,0.093 V0.078" fill="black" stroke="black" />
            </clipPath>
          </svg>

          <figure
            className={
              classNames(
                "relative w-full md:w-1/2 shrink-0 grow md:h-full aspect-[328/180] overflow-hidden",
                view?.roundedImage ? "md:aspect-[630/428] xl:w-[630px]" : "md:aspect-[488/400] xl:w-[488px]"
              )
            }
            style={{
              clipPath: isMediumDevices && (view?.imageAlign === 'Derecha' ? "url(#path-img-reverse)" : "url(#path-img)")
            }}
          >
            <Image
              className="object-cover w-full h-full"
              src={promoImage?.url ? promoImage.url : image.url}
              alt={promoImage?.title ? promoImage.title : image.title}
              fill
            />
          </figure>
        </>
      )}
      {(subtitle || pretitle || promoTitle || promoDescription || title || description || ctaCollection) && (
        <div className="flex items-center w-full md:w-1/2 lg:w-full px-3 py-6 md:pl-[45px] md:pr-10 md:py-4 grow">
          <div className="grid space-y-1 md:space-y-3">
            {pretitle && (
              <p className="text-blue-dark text-xs leading-[1.5] md:text-xl md:leading-[1.2] !font-semibold">{pretitle}</p>
            )}
            {(promoTitle || title) && (
              <h3 className="text-lg md:text-4x text-blue-dark pb-3 md:pb-6">{promoTitle ?? title}</h3>
            )}
            {subtitle && (
              <p className=" text-blue-dark title is-4">{subtitle}</p>
            )}
            {(promoDescription || description) && (
              <div className="text-grey-30 pb-3 text-sm lg:text-lg">
                {documentToReactComponents(promoDescription?.json ?? description.json)}
              </div>
            )}
            {(internalLink || externalLink) && (
              <div className="flex gap-3">
                <CustomLink content={propsLink} className={classNames("button", getButtonType(buttonType ?? 'Contorno'))}>
                  {promoTitle ?? name}
                </CustomLink>
              </div>
            )}
            {ctaCollection?.items?.length > 0 && (
              <div className="flex gap-3">
                {ctaCollection.items.map((cta) => (
                  <CustomLink key={cta.name} content={cta} className={classNames("button w-full sm:w-auto flex justify-center text-center", getButtonType(buttonType ?? 'Contorno'))}>
                    {cta.promoTitle ?? cta.name}
                  </CustomLink>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default LeftFeatured;
