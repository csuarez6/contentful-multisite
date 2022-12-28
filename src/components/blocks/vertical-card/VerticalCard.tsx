import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames, classColumns } from '../../../utils/functions';

const VerticalCardBlock: React.FC<IPromoBlock> = ({ title, description, imageOrientation, listedContentsCollection, columnsSize }) => {
  return (
    <section className="section grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-blue-dark">{documentToReactComponents(description.json)}</div>}
        </div>
      }
      {listedContentsCollection?.items && (
        <div className={classNames("grid justify-center gap-9", classColumns(columnsSize))}>
          {listedContentsCollection.items.map((content) => {
            content.promoImage.isPortrait = imageOrientation?.toLowerCase() === 'portrait';
            return <div className='flex justify-center' key={content.promoTitle}>
              <VerticalCard key={content.promoTitle} {...content} />
            </div>;
          })}
        </div>
      )}
    </section>
  );
};

export default VerticalCardBlock;
