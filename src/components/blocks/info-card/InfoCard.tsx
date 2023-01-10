import InfoCard from '@/components/organisms/cards/info-card/InfoCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const InfoCardBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  featuredContentsCollection
}) => {
  return (
    <section className="section grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-blue-dark">{documentToReactComponents(description.json)}</div>}
        </div>
      }
      {featuredContentsCollection?.items?.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredContentsCollection.items.map((content) => <InfoCard key={content.promoTitle} {...content} />)}
        </div>
      )}
    </section>
  );
};

export default InfoCardBlock;