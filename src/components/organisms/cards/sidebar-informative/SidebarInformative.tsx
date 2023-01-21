import Icon from '@/components/atoms/icon/Icon';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import React from 'react';


const item = (str: string) => (
    <div className="pl-3 py-2">
        <p className="flex gap-[10px] flex-nowrap pb-[10px] border-b border-neutral-70">
            <span className="flex items-center w-6 h-6 shrink-0">
                <Icon icon="expert" className="w-full h-full flex items-center text-neutral-30" />
            </span>
            <span className="text-size-p2 leading-[1.2] text-grey-30 grow">{str}</span>
        </p>
    </div>
);

const SidebarInformative: React.FC<IPromoBlock> = ({ listedContentsCollection, title }) => {
    return (
        <article className='shadow-card p-6 rounded-[20px] flex flex-col gap-9 h-fit'>
            <h3 className='text-blue-dark '>{title}</h3>
            <div className='flex flex-col gap-[34px]'>
                {listedContentsCollection?.items.map((content, i) => (
                    <div className='flex flex-col gap-[15px]' key={i}>
                        <h4 className='text-neutral-30'>{content.subtitle}</h4>
                        <ul className='flex flex-col gap-3 pr-6'>
                            {content.tags.map((tag, i) => (
                                <li key={i}>
                                    {item(tag.label)}
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                ))
                }
            </div>
        </article>
    );
};

export default SidebarInformative;