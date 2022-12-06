import LeftFeatured from "@/components/organisms/cards/left-featured/LeftFeatured";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const LeftFeaturedBlock: React.FC<IPromoBlock> = ({ title, description, content }) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark title is-1">{title}</h2>
          <p className="text-blue-dark">{description}</p>
        </div>
      }
      <LeftFeatured {...content} />
    </section>
  );
};

export default LeftFeaturedBlock;
