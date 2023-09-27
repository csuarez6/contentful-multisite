import { Options, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import {
  IPromoBlock,
  IPromoContent,
} from "@/lib/interfaces/promo-content-cf.interface";

import defaultFormatOptions from "@/lib/richtext/default.formatter";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";
import { classNames, getButtonType } from "@/utils/functions";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";

const pageFormatOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node, children) => {
      return <h1 className="text-center">{children}</h1>;
    },
  }
};

const richtextFormatOptions = {
  renderNode: {
    ...defaultFormatOptions.renderNode,
    ...pageFormatOptions.renderNode
  }
};

const RichText: React.FC<IPromoBlock & IPromoContent> = ({
  title,
  promoTitle,
  subtitle,
  description,
  promoDescription,
  sysId,
  blockId,
  ctaCollection,
  view: { textAlign, buttonType },
}) => {
  let descriptionJson = description?.json ?? promoDescription?.json;
  if (descriptionJson && attachLinksToRichtextContent) {
    descriptionJson = attachLinksToRichtextContent(
      descriptionJson,
      description?.links ?? promoDescription?.links
    );
  }

  const onTextAlign = () => {
    switch (textAlign) {
      case "Centrado":
        return "text-center";
      default:
        return "text-left";
    }
  };

  return (
    <section id={blockId ?? sysId} className="section">
      <div className="grid gap-2 mb-6">
        {(promoTitle || title) && (
          <h2 className="text-blue-dark text-center font-bold">
            {promoTitle ?? title}
          </h2>
        )}
        {subtitle && (
          <p className="text-center text-lg text-grey-30">{subtitle}</p>
        )}
      </div>
      {descriptionJson && (
        <div className={`richtext-container text-lg text-grey-10 ${onTextAlign()}`}>
          {documentToReactComponents(descriptionJson, richtextFormatOptions)}
        </div>
      )}
      {ctaCollection?.items?.length > 0 && (
        <div className="flex gap-3 justify-center">
          {ctaCollection.items.map((item, idx) => {
            return (
              <div key={"richtext-custom-link-" + idx}>
                {(item.externalLink || item.internalLink) && (
                  <CustomLink
                    content={item}
                    className={classNames(
                      "button w-full sm:w-auto flex justify-center text-center",
                      idx === 0 ? "button-primary" : "button-outline"
                    )}
                  >
                    {item.ctaLabel
                      ? item.ctaLabel
                      : item.promoTitle
                      ? item.promoTitle
                      : item.name}

                    {item.externalLink && (
                      <Icon
                        icon="arrow-right"
                        className="w-6 h-6 ml-1"
                        aria-hidden="true"
                      />
                    )}
                  </CustomLink>
                )}
                {item?.linkView === "Modal" && item?.content?.json && (
                  <div className="flex gap-2">
                    <ButtonAtom
                      type={item?.linkView}
                      text={item?.ctaLabel ?? item?.name}
                      classes={getButtonType(buttonType ?? "Primario")}
                      modalClass="w-auto max-w-7xl"
                    >
                      {documentToReactComponents(
                        attachLinksToRichtextContent(
                          item?.content?.json,
                          item?.content?.links
                        ),
                        defaultFormatOptions
                      )}
                    </ButtonAtom>
                  </div>
                )}
                {item?.mediaInternalLink && (
                  <CustomLink
                    content={item}
                    className={classNames(
                      "button w-full sm:w-auto flex justify-center text-center",
                      getButtonType("Contorno")
                    )}
                  >
                    {item?.ctaLabel ?? item?.promoTitle ?? item?.name}
                  </CustomLink>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RichText;
