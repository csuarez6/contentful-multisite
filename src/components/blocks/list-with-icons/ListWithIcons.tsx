import ListWithIcon from '@/components/organisms/list-with-icons/ListWithIcons';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const ListWithIconBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection }) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-neutral-30">{documentToReactComponents(description.json)}</div>}
        </div>
      }

      {featuredContentsCollection?.items && (
        <div className="grid max-w-sm grid-cols-1 mx-auto gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
          {featuredContentsCollection.items.map((item) => (
            <ListWithIcon key={item.promoTitle} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ListWithIconBlock;
