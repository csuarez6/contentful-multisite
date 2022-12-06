import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const VerticalCardBlock: React.FC<IPromoBlock> = ({ title, description, content }) => {
  return (
    <section className="grid gap-9">
      {(title || description) && 
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark">{title}</h2>
          <p className="text-blue-dark">{description}</p>
        </div>
      }
      {content && <VerticalCard {...content} />}
    </section>
  );
};

export default VerticalCardBlock;
