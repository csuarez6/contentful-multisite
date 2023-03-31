/* TODO: Validar Interface/Tipo de contenido */
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import FeaturedProduct from "@/components/organisms/cards/featured-product/FeaturedProduct";

const FeaturedProductBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  listedContentsCollection,
  blockId,
  sysId,
}) => {
  return (
    (listedContentsCollection?.items?.length > 0 || title || description) && (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {(title || description) && (
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && (
            <div className="text-blue-dark text-lg">
              {documentToReactComponents(description.json)}
            </div>
          )}
        </div>
      )}
      {listedContentsCollection?.items?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 2lg:grid-cols-3 gap-6">
          {listedContentsCollection.items.map((el) => (
            <FeaturedProduct {...el} key={el.objectID} />
          ))}
        </div>
      )}
    </section>
    )
  );
};

export default FeaturedProductBlock;
