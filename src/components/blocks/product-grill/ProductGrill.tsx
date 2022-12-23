import ProductSmallCard from '@/components/organisms/cards/product-small-card/ProductSmallCard';
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from '../../../utils/functions';

function gridClasses(listedContent: IPromoContent[], featuredContent: IPromoContent[], isReverse: boolean) {
  const classes = ['grid-cols-1'];
  if (featuredContent.length > 1 && listedContent.length > 0) classes.push('2md:grid-cols-2');
  else if (featuredContent.length === 1 && listedContent.length > 0) classes.push('md:grid-cols-2 2lg:grid-cols-3');

  if (isReverse) classes.push('grid-flow-dense');
  return classes.join(' ');
}

function featuredClasses(listedContent: IPromoContent[], featuredContent: IPromoContent[], isReverse: boolean) {
  const classes = [];
  if (featuredContent.length > 1) classes.push('2lg:grid-cols-2');
  if (featuredContent.length > 1 && listedContent.length > 0 && isReverse) classes.push('2md:col-start-2');
  else if (featuredContent.length === 1 && listedContent.length > 0 && isReverse) classes.push('md:col-start-2 2lg:col-start-3');
  return classes.join(' ');
}

function listedClasses(listedContent: IPromoContent[], featuredContent: IPromoContent[], columnsNumber, isReverse: boolean) {
  const classes = [];
  const cols = parseInt(columnsNumber);
  if (featuredContent.length === 1) classes.push("2lg:col-span-2");
  if (featuredContent.length > 1 && listedContent.length > 0 && isReverse) classes.push('2md:col-start-1');
  else if (featuredContent.length === 1 && listedContent.length > 0 && isReverse) classes.push('md:col-start-1');

  if (cols > 1) classes.push("2lg:grid-cols-2");
  if (cols > 2 && featuredContent.length < 2) classes.push("xl:grid-cols-3");
  return classes.join(" ");
}

const ProductGrillBlock: React.FC<IPromoBlock> = ({ title, description, columnsNumber = 1, listedContent = [], featuredContent = [], isReverse = false }) => {
  featuredContent.forEach(item => item.image.isPortrait = true);
  const featuredContentSplice = JSON.parse(JSON.stringify(featuredContent));

  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <p className="text-blue-dark">{description}</p>}
        </div>
      }

      {(listedContent.length > 0 || featuredContent.length > 0) &&
        <div className={classNames('grid gap-5', gridClasses(listedContent, featuredContent, isReverse))}>
          {featuredContent.length > 0 && <div className={classNames("grid grid-cols-1 gap-5", featuredClasses(listedContent, featuredContent, isReverse))}>
            {featuredContentSplice.splice(0, 2).map(item => (
              <ProductSmallCard key={item.title} {...item} />
            ))}
          </div>}

          {listedContent.length > 0 && <div className={classNames("grid grid-cols-1 gap-5", listedClasses(listedContent, featuredContent, columnsNumber, isReverse))}>
            {listedContent.map(item => (
              <ProductSmallCard key={item.title} {...item} />
            ))}
          </div>}
        </div>
      }
    </section>
  );
};

export default ProductGrillBlock;
