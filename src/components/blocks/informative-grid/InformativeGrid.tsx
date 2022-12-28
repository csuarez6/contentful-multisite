import Link from 'next/link';
import InformativeGridCard from '@/components/organisms/cards/informative-grid/InformativeGridCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from '../../../utils/functions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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

const InformativeGridBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, columnsSize, cta }) => {
  return (
    <section className="grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark text-4xl">{title}</h2>}
          {description && <div className="text-blue-dark text-lg">{documentToReactComponents(description.json)}</div>}
        </div>
      }
      {featuredContentsCollection?.items && (
        <div className={classNames("grid divide-x divide-neutral-80", classColumns(columnsSize))}>
          {featuredContentsCollection.items.map((content, idx) =>
            <div className={classNames("flex justify-center bg-white px-3", classBorder(columnsSize, idx))} key={content.promoTitle}>
              <InformativeGridCard key={content.promoTitle} {...content} />
            </div>
          )}
        </div>
      )}
      {cta?.list?.map((item) =>
        <div className="flex justify-center" key={item.name}>
          <Link href={item.href}>
            <a className="button button-primary">
              {item.name}
            </a>
          </Link>
        </div>
      )}
    </section >
  );
};

export default InformativeGridBlock;
