import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function classColumns(columns = '1') {
  let classes = ["grid-cols-1"];
  let cols = parseInt(columns);
  if (cols > 1) classes.push("md:grid-cols-2");
  if (cols > 2) classes.push("lg:grid-cols-3");
  if (cols > 3) classes.push("xl:grid-cols-4");
  if (cols > 4) classes.push("2xl:grid-cols-5");
  return classes.join(" ");
}

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
            <div className='flex justify-center' key={content.title}>
              <VerticalCard key={content.title} {...content} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VerticalCardBlock;
