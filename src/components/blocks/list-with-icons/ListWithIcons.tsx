import ListWithIcon from '@/components/organisms/list-with-icons/ListWithIcons';
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";

const ListWithIconBlock: React.FC<IPromoBlock> = ({ title, description, listedContent }) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <p className="text-neutral-30">{description}</p>}
        </div>
      }

      {listedContent && <div className="grid max-w-sm grid-cols-1 mx-auto gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
        {listedContent.map((item: IPromoContent, idx: number) => (
          <ListWithIcon key={idx} {...item} />
        ))}
      </div>}
    </section>
  );
};

export default ListWithIconBlock;
