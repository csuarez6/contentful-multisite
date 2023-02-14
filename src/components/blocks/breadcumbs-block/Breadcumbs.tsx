import CustomLink from '@/components/atoms/custom-link/CustomLink';
import Icon from '@/components/atoms/icon/Icon';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import React from 'react';

const Breadcumbs: React.FC<IPromoBlock> = ({ ctaCollection }) => {
    if (!ctaCollection) return;
    return (
        <section>
            <nav>
                <ul className='flex gap-2'>
                    {
                        ctaCollection.items?.map((el, i) => (
                            <li key={i} className="flex items-center gap-2">
                                {i + 1 !== ctaCollection?.items?.length ?
                                    <CustomLink content={el} className="text-blue-dark font-medium text-lg" >
                                        {el.ctaLabel ? el.ctaLabel : el.promoTitle ? el.promoTitle : el.name}
                                    </CustomLink> :
                                    <p className='text-blue-dark-8 font-medium text-lg'>
                                        {el.ctaLabel ? el.ctaLabel : el.promoTitle ? el.promoTitle : el.name}
                                    </p>
                                }
                                {i + 1 !== ctaCollection?.items?.length &&
                                    <Icon icon='arrow-right' className="h-6 w-6" />
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </section>
    );
};

export default Breadcumbs;