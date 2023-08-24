import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from "@/utils/functions";
import defaultFormatOptions from "@/lib/richtext/default.formatter";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";

const RichText: React.FC<IPromoBlock & IPromoContent> = ({ title, promoTitle, subtitle, description, promoDescription, sysId, blockId, ctaCollection, view: {textAlign} }) => {
  let descriptionJson = description?.json ?? promoDescription?.json;
  if (descriptionJson && attachLinksToRichtextContent) {
    descriptionJson = attachLinksToRichtextContent(descriptionJson, description?.links ?? promoDescription?.links);
  }

  const onTextAlign = () => {
    switch(textAlign){
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
          <h2 className="text-4xl text-blue-dark text-center font-bold">{promoTitle ?? title}</h2>)
        }
        {subtitle && (
          <p className="text-center text-lg text-grey-30">{subtitle}</p>
        )}
      </div>
      {descriptionJson && (
        <div className={`richtext-container text-lg text-grey-10 ${onTextAlign()}`}>
          {documentToReactComponents(descriptionJson, defaultFormatOptions)}
        </div>
      )}
      {ctaCollection?.items?.length > 0 && (
        <div className="flex gap-3 justify-center">
          {ctaCollection.items.map((item, idx) =>
            (item.externalLink || item.internalLink) && (
              <CustomLink
                content={item}
                key={"richtext-custom-link-" + idx}
                className={
                  classNames(
                    "button w-full sm:w-auto flex justify-center text-center",
                    idx === 0 ? "button-primary" : "button-outline"
                  )
                }
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
            )
          )}
        </div>
      )}
    </section>
  );
};

export default RichText;
