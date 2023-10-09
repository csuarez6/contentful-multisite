import InfoCard from "@/components/organisms/cards/info-card/InfoCard";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames } from "@/utils/functions";
import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";

const InfoCardBlock: React.FC<IPromoBlock & IContentFilter> = (props) => {
  const {
    title,
    description,
    featuredContentsCollection,
    listedContentsCollection,
    footerText,
    blockId,
    sysId,
    view,
  } = props;

  return (
    <section
      id={blockId ?? sysId}
      className={classNames(
        "grid grid-cols-1 section gap-9",
        view?.alignTitle !== "Centrado" && "lg:grid-cols-3"
      )}
    >
      {(title || description) && (
        <div
          className={classNames(
            "grid grid-cols-1 gap-9 auto-rows-min",
            view?.alignTitle === "Centrado" ? "text-center" : "text-left"
          )}
        >
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && (
            <div className="text-blue-dark">
              {documentToReactComponents(description.json)}
            </div>
          )}
        </div>
      )}
      {featuredContentsCollection?.items?.length > 0 && (
        <div
          className={classNames(
            "grid grid-cols-1 gap-5 md:grid-cols-2",
            view?.alignTitle !== "Centrado" && "lg:col-span-2 lg:grid-cols-2",
            view?.alignTitle === "Centrado" && "lg:grid-cols-3",
            view?.alignTitle === "Centrado" &&
              view?.columnsSize === 4 &&
              "xl:grid-cols-4"
          )}
        >
          {featuredContentsCollection.items.map((content) => (
            <InfoCard
              key={content.sys.id}
              {...content}
              buttonType={view?.buttonType}
              backgroundColor={view?.backgroundColor}
              showButton={view?.showButton}
            />
          ))}
        </div>
      )}

      {listedContentsCollection?.items?.length > 0 && (
        <div className="grid lg:grid-cols-4 col-span-3 gap-4">
          {listedContentsCollection.items.map((content) => (
            <InfoCard
              key={content?.promoTitle?.es ?? content?.name}
              {...content}
            />
          ))}
        </div>
      )}

      {footerText && (
        <div className="text-neutral-30 text-size-p2 richtext-container col-span-full">
          {documentToReactComponents(footerText.json)}
        </div>
      )}
    </section>
  );
};

export default InfoCardBlock;
