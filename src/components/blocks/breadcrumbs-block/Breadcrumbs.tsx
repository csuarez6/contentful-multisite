import React from 'react';
import CustomLink from '@/components/atoms/custom-link/CustomLink';
import Icon from '@/components/atoms/icon/Icon';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';

const Breadcrumbs: React.FC<IPromoBlock> = ({ ctaCollection }) => {
  if (ctaCollection?.items?.length <= 0) return;
  return (
    <section className='py-6'>
      <nav>
        <ul className='flex gap-0.5 flex-wrap'>
          {
            ctaCollection.items.map((el, i) => (
              <li key={el.name} className="flex items-center gap-0.5">
                {
                  i + 1 !== ctaCollection.items.length
                    ? (
                      <CustomLink content={el} linkClassName="flex items-center text[#466072] font-semibold hover:underline leading-none">
                        {el.promoTitle ?? el.name}
                      </CustomLink>
                    )
                    : (
                      <p className='text-blue-dark font-semibold leading-none'>
                        {el.promoTitle ?? el.name}
                      </p>
                    )
                }
                {(i + 1 !== ctaCollection?.items?.length) && (<Icon icon='arrow-right' className="h-6 w-6" />)}
              </li>
            ))
          }
        </ul>
      </nav>
    </section>
  );
};

export default Breadcrumbs;