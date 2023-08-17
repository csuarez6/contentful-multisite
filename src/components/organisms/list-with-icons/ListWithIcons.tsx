import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { classNames, getButtonType } from "@/utils/functions";
import defaultFormatOptions from "@/lib/richtext/default.formatter";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";

const ListWithIcons: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    promoIcon,
    promoDescription,
    iconPosition,
    iconSize,
    iconBackgroundColor,
    buttonType,
    ctaLabel,
    externalLink,
    internalLink,
    linkView,
    content,
    mediaInternalLink,
  } = props;
  const hasBlocks = content?.json?.content?.some(el => {
    return ["embedded-entry-block", "embedded-asset-block"].includes(el.nodeType);
  });
  let contentJson = content?.json;
  if (attachLinksToRichtextContent && contentJson) {
    contentJson = attachLinksToRichtextContent(
      contentJson,
      content?.links ?? []
    );
  }
  const iconBackgroundClasses = () => {
    switch (iconBackgroundColor) {
      case "Azul Claro":
        return "bg-neutral-90 text-neutral-30";
      case "Azul Oscuro":
        return "bg-blue-dark text-white";
      case "Blanco":
        return "bg-white text-[#035177]";
      case "Transparente":
        return "bg-transparent text-blue-dark";
      default:
        return "bg-white text-blue-dark";
    }
  };

  let iconSizeLocal = "w-[68px] h-[68px]";
  if (iconBackgroundColor)
    iconSizeLocal = `w-20 h-20 p-4 rounded-full ${iconBackgroundClasses()}`;
  if (iconSize) {
    if (iconSize.toLowerCase() === "pequeño") iconSizeLocal = "w-7 h-7";
    if (iconSize.toLowerCase() === "pequeño" && iconBackgroundColor)
      iconSizeLocal = `w-12 h-12 p-2 rounded-full ${iconBackgroundClasses()}`;
    if (iconSize.toLowerCase() === "mediano") iconSizeLocal = "w-10 h-10";
    if (iconSize.toLowerCase() === "mediano" && iconBackgroundColor)
      iconSizeLocal = `w-20 h-20 p-3 rounded-full ${iconBackgroundClasses()}`;
  }

  if (!iconBackgroundColor) iconSizeLocal += " text-blue-dark";
  return (
    <div
      className={classNames(
        "flex group",
        iconPosition && iconPosition === "Izquierda"
          ? "flex-row gap-5"
          : "flex-col text-center gap-3 items-center"
      )}
    >
      {promoIcon && (
        <div className={`flow-root shrink-0 ${iconSizeLocal}`}>
          <Icon icon={promoIcon} className="mx-auto w-full h-full" />
        </div>
      )}
      {(promoTitle || promoDescription || ctaLabel) && (
        <div
          className={classNames(
            "flex flex-col gap-6",
            iconPosition !== "Izquierda" ? "items-center" : "items-start"
          )}
        >
          {promoTitle && (
            <h3 className="title is-4 pt-1 text-blue-dark">{promoTitle}</h3>
          )}
          {promoDescription && (
            <div className="text-lg text-grey-30 richtext-container">
              {documentToReactComponents(
                promoDescription.json,
                defaultFormatOptions
              )}
            </div>
          )}
          {(internalLink?.urlPaths?.[0] || externalLink) && (
            <CustomLink
              content={props}
              className={classNames("button w-fit", getButtonType(buttonType))}
            >
              {ctaLabel ?? name}
            </CustomLink>
          )}
          {linkView === "Modal" && (
          <ButtonAtom
            key={name}
            type="Modal"
            classes={classNames("button w-fit !rounded-full", getButtonType(buttonType ?? "Secundario"))}
            modalClass={hasBlocks ? "main-container" : null}
            text={ctaLabel ?? promoTitle ?? name}
          >
            {promoDescription?.json && (
              <div className="richtext-container">
                {documentToReactComponents(contentJson, defaultFormatOptions)}
              </div>
            )}
          </ButtonAtom>
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
      )}
    </div>
  );
};

export default ListWithIcons;
