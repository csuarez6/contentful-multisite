import SearchCard from "@/components/organisms/cards/search-card/SearchCard";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames } from "@/utils/functions";
import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";

const SearchCardBlock: React.FC<IPromoBlock & IContentFilter> = (props) => {
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
    <section id={blockId ?? sysId} className="section grid grid-cols-1 gap-9">
      {(title || description || featuredContentsCollection?.items?.length > 0 || listedContentsCollection?.items?.length > 0) && (
        <div className={classNames(
          view?.alignTitle !== "Centrado" ? "lg:grid-cols-3" : null,
          "grid grid-cols-1 gap-9"
        )}>
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
                <SearchCard
                  key={content.promoTitle}
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
              {listedContentsCollection.items.map(content => (
                <SearchCard
                  key={content?.promoTitle?.es ?? content?.name}
                  {...content}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {footerText && (
        <div className="text-neutral-30 text-size-p2 richtext-container">
          {documentToReactComponents(footerText.json)}
        </div>
      )}
    </section>
  );
};

export default SearchCardBlock;
