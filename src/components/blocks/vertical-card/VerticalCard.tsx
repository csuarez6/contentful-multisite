import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const VerticalCardBlock: React.FC<IPromoContent> = ({ title, description, card }) => {
  return (
    <section className="grid gap-9">
      {(title || description) && 
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark">{title}</h2>
          <p className="text-blue-dark">{description}</p>
        </div>
      }
      {card && <VerticalCard {...card} />}
    </section>
  );
};

export default VerticalCardBlock;
