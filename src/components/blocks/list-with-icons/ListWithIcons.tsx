import ListWithIcon from '@/components/organisms/list-with-icons/ListWithIcons';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classColumns, classNames, getBackgroundColorClass } from '@/utils/functions';

const ListWithIconBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, view }) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  return (
    <section className="section grid gap-9">
      {view?.backgroundColor && (
        <div className="absolute inset-0 -mx-[50vw] -z-10">
          <div className={classNames("w-screen h-full mx-auto", backgroundColor)}></div>
        </div>
      )}

      {(title || description) && (
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-neutral-30">{documentToReactComponents(description.json)}</div>}
        </div>
      )}

      {featuredContentsCollection?.items && (
        <div className={classNames("max-w-sm sm:max-w-none mx-auto grid gap-y-10 gap-x-8", classColumns(view.columnsSize))}>
          {featuredContentsCollection.items.map((item) => (
            <ListWithIcon key={item.promoTitle} {...{ ...item, ...view }} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ListWithIconBlock;
