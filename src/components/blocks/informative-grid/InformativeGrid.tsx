import Link from 'next/link';
import InformativeGridCard from '@/components/organisms/cards/informative-grid/InformativeGridCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from '../../../utils/functions';

function classColumns(columns = 1) {
  const classes = ["grid-cols-1"];
  if (columns > 1) classes.push("md:grid-cols-2");
  if (columns > 2) classes.push("lg:grid-cols-3");
  return classes.join(" ");
}

function classBorder(columns = 1, idx = 0) {
  const classes = [];
  if (columns === 2) classes.push("odd:!border-transparent");
  if (columns > 2 && (idx % 3 === 0)) classes.push("!border-transparent");
  return classes.join(" ");
}

const InformativeGridBlock: React.FC<IPromoBlock> = ({ title, description, listedContent, columnsNumber, cta }) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark text-4xl">{title}</h2>}
          {description && <p className="text-blue-dark text-lg">{description}</p>}
        </div>
      }
      {listedContent && (
        <div className={classNames("grid divide-x divide-neutral-80", classColumns(columnsNumber))}>
          {listedContent.map((content, idx) =>
            <div className={classNames("flex justify-center bg-white px-3", classBorder(columnsNumber, idx))} key={content.promoTitle}>
              <InformativeGridCard key={content.promoTitle} {...content} />
            </div>
          )}
        </div>
      )}
      {cta && (
        cta.list.map((item) =>
          <div className="flex justify-center" key={item.name}>
            <Link href={item.href}>
              <a className="button button-primary">
                {item.name}
              </a>
            </Link>
          </div>
        )
      )}
    </section >
  );
};

export default InformativeGridBlock;
