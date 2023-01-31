import InformativeGridCard from "@/components/organisms/cards/informative-grid/InformativeGridCard";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames, getButtonType, getBackgroundColorClass } from "@/utils/functions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

function classColumns(columns = 1) {
  const classes = ["grid-cols-1"];
  if (columns > 1) classes.push("md:grid-cols-2");
  if (columns > 2) classes.push("lg:grid-cols-3");
  return classes.join(" ");
}

function classBorder(columns = 1, idx = 0) {
  const classes = [];
  if (columns === 2) classes.push("odd:!border-transparent");
  if (columns === 3 && idx % 3 === 0) classes.push("!border-transparent");
  return classes.join(" ");
}

const InformativeGridBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  featuredContentsCollection,
  view,
  ctaCollection,
  blockId,
  sysId
}) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  return (
    <section id={blockId? blockId: sysId} className="section grid gap-9">
      {view?.backgroundColor && (
        <div className="absolute inset-0 -mx-[50vw] -z-10">
          <div className={classNames("w-screen h-full mx-auto", backgroundColor.background)}></div>
        </div>
      )}
      {(title || description) && (
        <div className="grid gap-9 text-center">
          {title && <h2 className={classNames("text-4xl", backgroundColor.title)}>{title}</h2>}
          {description && (
            <div className={classNames("text-lg", backgroundColor.text)}>
              {documentToReactComponents(description.json)}
            </div>
          )}
        </div>
      )}
      {featuredContentsCollection?.items?.length > 0 && (
        <div
          className={classNames(
            "grid divide-x divide-neutral-80",
            classColumns(view.columnsSize)
          )}
        >
          {featuredContentsCollection.items.map((content, idx) => (
            <div
              className={classNames(
                "flex justify-center px-3",
                classBorder(view.columnsSize, idx)
              )}
              key={content.promoTitle}
            >
              <InformativeGridCard key={content.promoTitle} {...content} buttonType={view.buttonType} backgroundColor={view.backgroundColor}/>
            </div>
          ))}
        </div>
      )}
      {ctaCollection?.items?.map(
        (item) =>
          (item.externalLink || item.internalLink?.urlPath) && (
            <div className="flex justify-center" key={item.name}>
              <CustomLink
                content={item}
                className={classNames("w-fit button", getButtonType(view.buttonType ?? "Contorno"))}
              >
                {item.promoTitle ?? item.name}
              </CustomLink>
            </div>
          )
      )}
    </section>
  );
};

export default InformativeGridBlock;
