import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const VerticalCardBlock: React.FC<IPromoBlock> = ({ title, description, listedContent }) => {
  return (
    <section className="grid gap-9">
      {(title || description) && 
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark">{title}</h2>
          <p className="text-blue-dark">{description}</p>
        </div>
      }
      {listedContent && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {listedContent.map((content) => <VerticalCard key={content.title} {...content} />)}
        </div>
      )}
    </section>
  );
};

export default VerticalCardBlock;
