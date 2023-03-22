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
    blockId,
    sysId,
    view,
  } = props;

  return (
    <section
      id={blockId ? blockId : sysId}
      className={classNames(
        view?.alignTitle !== "Centrado" ? "lg:grid-cols-3" : null,
        "grid grid-cols-1 section gap-9"
      )}
    >
      {(title || description) && (
        <div
          className={classNames(
            "grid gap-9 auto-rows-min",
            view?.alignTitle !== "Centrado" ? "text-left" : "text-center"
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
            view.alignTitle !== "Centrado"
              ? "lg:col-span-2 lg:grid-cols-2"
              : "lg:grid-cols-3",
            "grid grid-cols-1 gap-5 md:grid-cols-2"
          )}
        >
          {featuredContentsCollection.items.map((content) => (
            <InfoCard
              key={content.promoTitle}
              {...content}
              buttonType={view?.buttonType}
              backgroundColor={view?.backgroundColor}
              showButton={view?.showButton}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default InfoCardBlock;
