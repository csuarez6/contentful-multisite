import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { BLOCKS } from "@contentful/rich-text-types";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames, getButtonType } from "@/utils/functions";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";
import defaultFormatOptions from "@/lib/richtext/default.formatter";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return <p>{children}</p>;
    },
    [BLOCKS.HEADING_3]: (_node, children) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (_node, children) => {
      return <h4 className="font-bold">{children}</h4>;
    },
    [BLOCKS.HR]: () => {
      return <hr className="my-5 border-lucuma w-1/2" />;
    },
  },
};

const InfoCard: React.FC<IPromoContent> = (props) => {
  const {
    name,
    promoTitle,
    promoDescription,
    ctaLabel,
    promoIcon,
    externalLink,
    internalLink,
    buttonType,
    backgroundColor,
    showButton,
    mediaInternalLink,
    linkView,
    content,
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
  return (
    <article
      className={classNames(
        "p-6 border rounded-xl",
        backgroundColor === "Azul Claro"
          ? "bg-neutral-90 border-neutral-90"
          : "bg-white border-neutral-70"
      )}
    >
      <div className="flex flex-col gap-1 h-full">
        {promoIcon && (
          <Icon
            icon={promoIcon}
            className="w-9 h-9 text-blue-dark"
            aria-hidden="true"
          />
        )}
        {promoTitle && (
          <h3
            className={
              backgroundColor === "Azul Claro" ? "text-[#035177]" : "text-black"
            }
          >
            {promoTitle}
          </h3>
        )}
        {promoDescription && (
          <div className="text-size-p1 text-grey-30">
            {documentToReactComponents(promoDescription.json, options)}
          </div>
        )}
        {linkView !== "Modal" && (externalLink || internalLink?.urlPaths?.[0]) && showButton && (
          <div className="flex justify-start mt-3">
            <CustomLink
              content={props}
              className={classNames(
                "button !rounded-full",
                getButtonType(buttonType ?? "Secundario")
              )}
            >
              {ctaLabel ? ctaLabel : promoTitle ? promoTitle : name}
            </CustomLink>
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
        {linkView === "Modal" && (
          <ButtonAtom
            key={name}
            type="Modal"
            classes={classNames("button w-fit !rounded-full", getButtonType(buttonType ?? "Secundario"))}
            modalClass={hasBlocks ? "main-container" : null}
            text={ctaLabel ?? promoTitle ?? name}
          >
            {promoDescription?.json && (
              <div>
                {documentToReactComponents(contentJson, defaultFormatOptions)}
              </div>
            )}
          </ButtonAtom>
        )}
      </div>
    </article>
  );
};

export default InfoCard;
