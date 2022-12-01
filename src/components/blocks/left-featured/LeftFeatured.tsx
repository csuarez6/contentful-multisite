import LeftFeatured from "@/components/organisms/cards/left-featured/LeftFeatured";
import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const LeftFeaturedBlock: React.FC<IPromoContent> = ({ title, description, card }) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark title is-1">{title}</h2>
          <p className="text-blue-dark">{description}</p>
        </div>
      }
      <LeftFeatured {...card} />
    </section>
  );
};

export default LeftFeaturedBlock;
