import React from 'react';
import PlanCard from '@/components/organisms/cards/plan-card/PlanCard';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { classNames } from '../../../utils/functions';

const classColumns = (columns = 1) => {
  const classes = ["grid-cols-1"];
  if (columns > 1) classes.push("2md:grid-cols-2");
  return classes.join(" ");
};

const ProductGrid: React.FC<IPromoBlock> = ({ listedContent, columnsNumber, description, title }) => {
    if (!listedContent) return;
    return (
        <section className='flex flex-col gap-[38px]'>
            {(title || description) &&
                <div className='flex flex-col gap-[39px]'>
                    {title && <h2 className='text-center text-blue-dark'>{title}</h2>}
                    {description && <h3 className='title is-4 text-center text-blue-dark'>{description}</h3>}
                </div>
            }
            {listedContent &&
                <div className={classNames("`w-full grid gap-9", classColumns(columnsNumber))}>
                    {
                        listedContent.map((el) => {
                            return <PlanCard {...el} key={`${title}-${el.promoTitle}`} />;
                        })
                    }
                </div>
            }
        </section>
    );
};

export default ProductGrid;