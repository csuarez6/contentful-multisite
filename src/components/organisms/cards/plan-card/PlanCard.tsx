import React from "react";
import Image from "next/image";
import {
  IPromoBlock,
  IPromoContent,
} from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames, getButtonType } from "@/utils/functions";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { getLinkProps } from "@/utils/link.utils";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";
import defaultFormatOptions from "@/lib/richtext/default.formatter";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";

const PlanCard: React.FC<IPromoContent & IPromoBlock> = ({
  tags,
  name,
  promoDescription,
  isReverse,
  subtitle,
  promoTitle,
  promoImage,
  internalLink,
  externalLink,
  ctaLabel,
  buttonType,
  ctaCollection,
  title,
  description,
  image,
  view,
  linkView,
  content,
}) => {
  const propsLink = {
    name,
    promoTitle,
    internalLink,
    externalLink,
    ctaLabel,
    linkView
  };

  return (
    <article
      className={classNames(
        "flex flex-col rounded-xl shadow-card gap-[9px] bg-white",
        view?.isReverse || isReverse ? "sm:flex-row-reverse" : "sm:flex-row"
      )}
    >
      {(promoImage?.url || image?.url) && (
        <figure className="relative">
          <Image
            width={230}
            height={230}
            src={promoImage?.url ?? image?.url}
            alt={promoImage?.title ?? image?.title}
            className={classNames(
              "w-full h-full sm:w-auto rounded-t-xl sm:max-w-[230px] object-cover sm:min-h-[233px]",
              view?.isReverse || isReverse
                ? "sm:rounded-l-none sm:rounded-r-xl"
                : "sm:rounded-r-none sm:rounded-l-xl"
            )}
            priority
          />
        </figure>
      )}
      {(promoTitle ||
        subtitle ||
        promoDescription ||
        title ||
        description ||
        tags) && (
          <div className="flex-grow py-6 px-[26px] flex flex-col gap-[30px]">
            {(promoTitle ||
              subtitle ||
              promoDescription ||
              title ||
              description) && (
                <div className="flex flex-col gap-[15px]">
                  {(promoTitle || subtitle) && (
                    <div className="flex flex-col gap-2">
                      {(promoTitle || title) && (
                        <h3 className="text-neutral-30 title is-4">
                          {promoTitle ?? title}
                        </h3>
                      )}
                      {subtitle && <h4 className="text-blue-dark">{subtitle}</h4>}
                    </div>
                  )}
                  {(promoDescription || description) && (
                    <div className="text-grey-30 font-medium">
                      {documentToReactComponents(
                        promoDescription?.json ?? description?.json
                      )}
                    </div>
                  )}
                </div>
              )}
            {tags?.length > 0 && (
              <div className="flex gap-[15px] sm:items-center flex-col xs:flex-row">
                <span>Puedes pagar con:</span>
                <div className="flex gap-x-[18px] flex-wrap gap-y-2">
                  {tags.map((el) => {
                    if (!el.label) return;
                    return (
                      <div
                        className={`bg-neutral-90 py-1 px-2 rounded-lg text-grey-10 text-xs sm:text-sm font-medium text-center`}
                        key={`${promoTitle}-${el.label}`}
                      >
                        <span>{el.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {(internalLink ||
              externalLink ||
              linkView === "Modal" ||
              ctaCollection?.items?.length > 0) && (
                <div className="flex gap-3">
                  {(internalLink || externalLink) && (
                    <div className="flex gap-3">
                      <CustomLink
                        content={propsLink}
                        className={classNames(
                          "button",
                          getButtonType(linkView === "Botón llamada" ? "Primario" : (buttonType ?? "Primario"))
                        )}
                      >
                        {getLinkProps(propsLink).textLink}
                      </CustomLink>
                    </div>
                  )}
                  {ctaCollection?.items?.length > 0 && (
                    <div className="flex gap-3">
                      {ctaCollection.items.map((cta) => {
                        return (
                          <div key={cta.name}>
                            {!cta?.content && (
                              <CustomLink
                                content={cta}
                                className={classNames(
                                  "button",
                                  getButtonType(buttonType ?? "Contorno")
                                )}
                              >
                                {cta.promoTitle ?? cta.name}
                              </CustomLink>
                            )}

                            {cta?.linkView === "Modal" && cta?.content?.json && (
                              <div className="flex gap-2">
                                <ButtonAtom
                                  type={cta?.linkView}
                                  text={cta?.ctaLabel ?? cta?.name}
                                  classes={getButtonType("Contorno")}
                                >
                                  {documentToReactComponents(attachLinksToRichtextContent(cta?.content?.json, cta?.content?.links), defaultFormatOptions)}
                                </ButtonAtom>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {linkView === "Modal" && content.json && (
                    <div className="flex gap-2">
                      <ButtonAtom
                        type={linkView}
                        text={ctaLabel ?? name}
                        classes={getButtonType("Contorno")}
                      >
                        {documentToReactComponents(attachLinksToRichtextContent(content?.json, content?.links), defaultFormatOptions)}
                      </ButtonAtom>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
    </article>
  );
};

export default PlanCard;
