import CustomLink from '@/components/atoms/custom-link/CustomLink';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { classNames } from '@/utils/functions';
import React from 'react';

const ErrorBlock: React.FC<IPromoBlock> = ({ title, subtitle, links }) => {
    return (
        <section className='h-[525px] flex items-center justify-center bg-[#FFFFFF]'>
            <h1 className='sr-only'>Página de Error</h1>
            <div className='flex flex-col 2md:flex-row items-center gap-[42px]'>
                <div className='text-[#1C508D] font-bold text-[127px] flex'>
                    <p className='leading-none'>
                        {title}
                    </p>
                </div>
                <div className='flex flex-col md:h-[95px] justify-between 2md:border-l 2md:border-[#C8C8C8] md:pl-[45px] relative top-0.5 gap-5 md:gap-0'>
                    <div className='font-medium text-xl text-[#5C5C5C] md:max-w-[282px] text-center 2md:text-left'>
                        <p>
                            {subtitle}
                        </p>
                    </div>
                    <div className='flex text-[#1C508D] text-[15px] font-mulish leading-none flex-wrap gap-y-4 justify-center 2md:justify-start'>
                        {
                            links?.map((el, i) => (
                                <CustomLink content={el} key={i} className={classNames("pr-2.5", i > 0 && "pl-2.5", i !== links.length - 1 && "border-r border-black")}>{el.name}</CustomLink>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorBlock;
