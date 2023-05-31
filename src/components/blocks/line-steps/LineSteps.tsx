import { useRef, useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  IPromoBlock,
  IPromoContent,
} from "@/lib/interfaces/promo-content-cf.interface";
import Image from "next/image";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { classNames } from "@/utils/functions";
import { getLinkProps } from "@/utils/link.utils";

const LineSteps: React.FC<IPromoBlock & IPromoContent> = ({
  title,
  description,
  featuredContentsCollection,
  ctaCollection,
  image,
  blockId,
  sysId,
}) => {
  const [currentImage, setCurrentImage] = useState(null);
  const lineStep = useRef(null);
  useEffect(() => {
    const stepGroup = lineStep.current.querySelectorAll(".step-group");
    stepGroup.forEach((item, index) => {
      const element: IPromoContent = featuredContentsCollection?.items[index];
      const imgCollection = element?.promoImage ?? image ?? null;
      if (index === 0) setCurrentImage(imgCollection);

      const btn = item.querySelector(".step-check");
      btn.onclick = () => {
        stepGroup.forEach((group, i) => {
          group.classList.remove("open");

          i < index
            ? group.classList.add("check")
            : group.classList.remove("check");
        });
        setCurrentImage(imgCollection);
        item.classList.add("open");
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredContentsCollection?.items]);

  return (
    <section
      id={blockId ? blockId : sysId}
      className="section grid gap-7 md:gap-9"
    >
      {(title || description) && (
        <div className="flex flex-col gap-2 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && (
            <div className="text-lg">
              {documentToReactComponents(description.json)}
            </div>
          )}
        </div>
      )}

      {(currentImage || featuredContentsCollection?.items?.length > 0) && (
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {currentImage && (
            <div className="hidden md:flex justify-center md:justify-end grow lg:shrink-0 w-full lg:w-[562px]">
              <figure className="relative rounded-xl w-full aspect-[562/604] overflow-hidden">
                <Image
                  width={562}
                  height={604}
                  className="w-full h-full object-cover object-center"
                  src={currentImage.url}
                  alt={
                    currentImage.title ??
                    currentImage.description ??
                    "Imagen promocional actual"
                  }
                />
              </figure>
            </div>
          )}
          {featuredContentsCollection?.items?.length > 0 && (
            <div className="flex-auto min-w-[50%] grow">
              <div ref={lineStep} className="flex flex-col gap-6">
                {featuredContentsCollection?.items?.map((item, index) => (
                  <div
                    className={classNames(
                      index + 1 === 1 && "open",
                      "group step-group"
                    )}
                    key={item.name}
                  >
                    <div className="flex flex-col gap-8 px-6 py-4 border shadow rounded-xl group-[.open]:border-blue-dark group-[.open]:py-6">
                      <div className="flex gap-4 step-check cursor-pointer">
                        <h3 className="text-2xl text-justify text-blue-dark font-bold w-0 flex-grow">
                          <span className="inline-block mr-1">
                            {index + 1}.
                          </span>
                          {item?.promoTitle}
                        </h3>
                        <div className="ml-auto">
                          <span className="block w-8 aspect-square border border-blue-dark rounded-full">
                            <Icon
                              icon="check-vanti-neutral"
                              className="border-[3px] border-white group-[.open]:bg-blue-dark group-[.check]:bg-blue-dark text-white w-full p-1 rounded-full"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                      {item?.promoImage?.url && (
                        <figure className="hidden group-[.open]:block md:!hidden w-full rounded-xl aspect-[304/124] overflow-hidden">
                          <Image
                            width={item.promoImage.width}
                            height={item.promoImage.height}
                            className="w-full h-full object-cover object-center"
                            src={item.promoImage.url}
                            alt={
                              item.promoImage.title ??
                              item.promoImage.description ??
                              "Imagen promocional"
                            }
                          />
                        </figure>
                      )}
                      {item.promoDescription && (
                        <div className="text-lg text-grey-30 hidden group-[.open]:block">
                          {documentToReactComponents(
                            item.promoDescription.json
                          )}
                        </div>
                      )}
                      {(item?.internalLink?.urlPaths?.[0] || item?.externalLink) && (
                        <div className="hidden gap-3 mt-3 group-[.open]:block self-start">
                          <CustomLink
                            content={item}
                            key={item.name}
                            className="button button-primary"
                          >
                            {getLinkProps(item).textLink}
                          </CustomLink>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {ctaCollection?.items?.length > 0 && (
        <div className="flex gap-3 mt-3 justify-center">
          {ctaCollection.items.map(
            (cta) =>
              (cta.externalLink || cta.internalLink?.urlPaths?.[0]) && (
                <CustomLink
                  content={cta}
                  key={cta.name}
                  className="button button-primary"
                >
                  {cta.promoTitle ?? cta.name}
                </CustomLink>
              )
          )}
        </div>
      )}
    </section>
  );
};

export default LineSteps;
