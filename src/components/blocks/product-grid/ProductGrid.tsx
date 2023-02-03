import PlanCard from '@/components/organisms/cards/plan-card/PlanCard';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { classNames } from '@/utils/functions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const classColumns = (columns = 1) => {
  const classes = ["grid-cols-1"];
  if (columns > 1) classes.push("2md:grid-cols-2");
  return classes.join(" ");
};

const ProductGrid: React.FC<IPromoBlock> = ({ featuredContentsCollection, description, title, view, blockId, sysId }) => {
  return (
    <section id={blockId? blockId: sysId} className='grid gap-10'>
      {(title || description) &&
        <div className='flex flex-col gap-10'>
          {title && <h2 className='text-center text-blue-dark'>{title}</h2>}
          {description && <div className='title is-4 text-center text-blue-dark'>{documentToReactComponents(description.json)}</div>}
        </div>
      }
      {featuredContentsCollection?.items?.length > 0 &&
        <div className={classNames("w-full grid gap-9", classColumns(view?.columnsSize))}>
          {featuredContentsCollection.items.map((el) => (
            <PlanCard {...el} key={`${title}-${el.promoTitle}`} isReverse={view?.isReverse} buttonType={view.buttonType} />
          ))}
        </div>
      }
    </section>
  );
};

export default ProductGrid;
