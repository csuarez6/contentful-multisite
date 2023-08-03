import ProductSmallCard from '@/components/organisms/cards/product-small-card/ProductSmallCard';
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames, getBackgroundColorClass } from '@/utils/functions';

function gridClasses(
  listedContent: IPromoContent[] = [],
  featuredContent: IPromoContent[] = [],
  isReverse = false
) {
  const classes = ["grid-cols-1"];
  if (featuredContent?.length > 1 && listedContent?.length > 0)
    classes.push("2md:grid-cols-2");
  else if (featuredContent?.length === 1 && listedContent?.length > 0)
    classes.push("md:grid-cols-2 2lg:grid-cols-3");

  if (isReverse) classes.push("grid-flow-dense");
  return classes.join(" ");
}

function featuredClasses(
  listedContent: IPromoContent[] = [],
  featuredContent: IPromoContent[] = [],
  isReverse = false
) {
  const classes = [];
  if (featuredContent?.length > 1) classes.push("2lg:grid-cols-2");
  if (featuredContent?.length > 1 && listedContent?.length > 0 && isReverse)
    classes.push("2md:col-start-2");
  else if (
    featuredContent?.length === 1 &&
    listedContent?.length > 0 &&
    isReverse
  )
    classes.push("md:col-start-2 2lg:col-start-3");
  return classes.join(" ");
}

function listedClasses(
  listedContent: IPromoContent[] = [],
  featuredContent: IPromoContent[] = [],
  cols = 1,
  isReverse = false
) {
  const classes = [];
  if (featuredContent?.length === 1) classes.push("2lg:col-span-2");
  if (featuredContent?.length > 1 && listedContent?.length > 0 && isReverse)
    classes.push("2md:col-start-1");
  else if (
    featuredContent?.length === 1 &&
    listedContent?.length > 0 &&
    isReverse
  )
    classes.push("md:col-start-1");

  if (cols > 1) classes.push("2lg:grid-cols-2");
  if (cols > 2 && featuredContent?.length < 2) classes.push("xl:grid-cols-3");
  return classes.join(" ");
}

const ProductGrillBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  listedContentsCollection,
  featuredContentsCollection,
  footerText,
  view,
  blockId,
  sysId
}) => {
  featuredContentsCollection?.items?.forEach(item => item.promoImage.isPortrait = true);
  const featuredContentSplice: IPromoContent[] = featuredContentsCollection?.items?.length > 0 ? JSON.parse(JSON.stringify(featuredContentsCollection?.items)) : [];
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);

  return (
    <section id={blockId ?? sysId} className="section grid gap-9">
      {view?.backgroundColor && (
        <div className="absolute inset-0 -mx-[50vw] -z-10">
          <div className={classNames("w-screen h-full mx-auto", backgroundColor.background)}></div>
        </div>
      )}

      {(title || description) && (
        <div className="grid gap-9 text-center">
          {title && <h2 className={backgroundColor.title}>{title}</h2>}
          {description && <div className={backgroundColor.text}>{documentToReactComponents(description.json)}</div>}
        </div>
      )}

      {(listedContentsCollection?.items?.length > 0 || featuredContentsCollection?.items?.length > 0) && (
        <div className={classNames('grid gap-5', gridClasses(listedContentsCollection?.items, featuredContentsCollection?.items, view?.isReverse))}>
          {featuredContentsCollection?.items?.length > 0 && (
            <div className={classNames("grid grid-cols-1 gap-5", featuredClasses(listedContentsCollection?.items, featuredContentsCollection.items, view?.isReverse))}>
              {featuredContentSplice?.splice(0, 2).map(item => (
                <ProductSmallCard key={item.promoTitle} {...item} />
              ))}
            </div>
          )}

          {listedContentsCollection?.items?.length > 0 && (
            <div className={classNames("grid grid-cols-1 gap-5", listedClasses(listedContentsCollection.items, featuredContentsCollection?.items, view?.columnsSize))}>
              {listedContentsCollection.items.map(item => (
                <ProductSmallCard key={item.promoTitle} {...item} />
              ))}
            </div>
          )}
        </div>
      )}

      {footerText && (
        <div className={classNames(
          "text-size-p2 richtext-container",
          backgroundColor.text
        )}>
          {documentToReactComponents(footerText.json)}
        </div>
      )}
    </section>
  );
};

export default ProductGrillBlock;
