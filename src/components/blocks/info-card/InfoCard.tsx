import InfoCard from '@/components/organisms/cards/info-card/InfoCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const InfoCardBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  featuredContent
}) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <p className="text-blue-dark">{description}</p>}
        </div>
      }
      {featuredContent && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredContent.map((content) => <InfoCard key={content.title} {...content} />)}
        </div>
      )}
    </section>
  );
};

export default InfoCardBlock;