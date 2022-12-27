import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames, classColumns } from '../../../utils/functions';

const VerticalCardBlock: React.FC<IPromoBlock> = ({ title, description, listedContent, columnsNumber }) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <p className="text-blue-dark">{description}</p>}
        </div>
      }
      {listedContent && (
        <div className={classNames("grid justify-center gap-9", classColumns(columnsNumber))}>
          {listedContent.map((content) => (
            <div className='flex justify-center' key={content.promoTitle}>
              <VerticalCard key={content.promoTitle} {...content} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VerticalCardBlock;
