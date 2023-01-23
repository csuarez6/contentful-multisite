import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames, classColumns } from '@/utils/functions';

const VerticalCardBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, view, blockId, sysId }) => {
  return (
    <section id={blockId? blockId: sysId} className="section grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-blue-dark text-size-p1">{documentToReactComponents(description.json)}</div>}
        </div>
      }
      {featuredContentsCollection?.items?.length > 0 && (
        <div className={classNames("grid justify-center gap-9", classColumns(view?.columnsSize))}>
          {featuredContentsCollection.items.map((content) => {
            {if (content.promoImage) content.promoImage.isPortrait = view?.imageOrientation?.toLowerCase() === 'portrait';}
            return <div className='flex justify-center' key={content.promoTitle}>
              <VerticalCard key={content.promoTitle} {...content} buttonType={view.buttonType} />
            </div>;
          })}
        </div>
      )}
    </section>
  );
};

export default VerticalCardBlock;
