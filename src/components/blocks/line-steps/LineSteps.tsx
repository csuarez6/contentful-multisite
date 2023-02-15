import { useRef, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { classNames } from "@/utils/functions";

const LineSteps: React.FC<IPromoBlock> = ({
  featuredContentsCollection,
  description,
  title,
  subtitle,
  ctaCollection,
  blockId,
  sysId
}) => {
  const lineStep = useRef(null);
  useEffect(() => {
    const stepGroup = lineStep.current.querySelectorAll(".step-group");
    stepGroup.forEach((item, index) => {
      const btn = item.querySelector(".step-check");
      btn.onclick = () => {
        stepGroup.forEach((group, i) => {
          group.classList.remove("open");

          i < index ?
            group.classList.add("check") :
            group.classList.remove("check");

        });
        item.classList.add("open");
      };
    });
  }, []);

  return (
    <section id={blockId ? blockId : sysId} className="grid gap-10 md:flex">
      <div className="flex flex-col gap-2">
        {title && (<p className="text-4xl text-blue-dark-8 font-bold">{title}</p>)}
        {subtitle && <p className="text-lg text-blue-dark gap-4">{subtitle}</p>}
        {description && (
          <div className="text-lg">
            {documentToReactComponents(description.json)}
          </div>
        )}
        {ctaCollection?.items?.length > 0 && (
          <div className="flex gap-3 mt-3">
            {ctaCollection.items.map(
              (cta) =>
                (cta.externalLink || cta.internalLink?.urlPath) && (
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
      </div>
      <div className="flex-auto">
        {featuredContentsCollection && (
          <>
            <div ref={lineStep} className="flex flex-col gap-6">
              {
                featuredContentsCollection?.items?.map((item, index) => (
                  <div className={classNames(
                    (index + 1) == 1 ? "open" : null,
                    "group step-group"
                  )} key={`key_step_${index}`}>
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
                      {
                        item.promoDescription && (
                          <div className="text-lg text-grey-30 hidden group-[.open]:block">
                            {documentToReactComponents(
                              item.promoDescription.json
                            )}
                          </div>
                        )
                      }
                      {
                        item.ctaCollection?.items?.length > 0 && (
                          <div className="flex gap-3 mt-3">
                            {item.ctaCollection.items.map(
                              (cta) =>
                                (cta.externalLink || cta.internalLink?.urlPath) && (
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
                        )
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LineSteps;
