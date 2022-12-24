import React from 'react';
import Image from 'next/image';
import { IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';

const PlanCard: React.FC<IPromoContent> = ({
  tags,
  description,
  isReverse,
  subtitle,
  title,
  image
}) => {
  return (
    <article className={`flex flex-col ${isReverse ? 'sm:flex-row-reverse' : 'sm:flex-row'} rounded-xl shadow-card gap-[9px] bg-white`}>
      {image?.url &&
        <figure className='relative'>
          <Image
            width={230}
            height={230}
            src={image.url}
            alt={image.title}
            className={`w-full h-full sm:w-auto rounded-t-xl ${isReverse ? 'sm:rounded-l-none sm:rounded-r-xl' : 'sm:rounded-r-none sm:rounded-l-xl'} sm:max-w-[230px] object-cover sm:min-h-[233px]`}
            priority
          />
        </figure>
      }
      {(title || subtitle || description || tags) &&
        <div className='flex-grow py-6 px-[26px] flex flex-col gap-[30px]'>
          {(title || subtitle || description) &&
            <div className='flex flex-col gap-[15px]'>
              {(title || subtitle) &&
                <div className='flex flex-col gap-2'>
                  {title && <h3 className='text-neutral-30 title is-4'>{title}</h3>}
                  {subtitle && <h4 className='text-blue-dark'>{subtitle}</h4>}
                </div>
              }
              {description &&
                <div className='text-grey-30 font-medium'>
                  {description}
                </div>
              }
            </div>
          }
          {tags &&
            <div className='flex gap-[15px] sm:items-center flex-col xs:flex-row'>
              <span>Puedes pagar con:</span>
              {tags && <div className='flex gap-x-[18px] flex-wrap gap-y-2'>
                {
                  tags.map((el) => {
                    if (!el.label) return;
                    return (
                      <div className={`bg-neutral-90 py-1 px-2 rounded-lg text-grey-10 text-xs sm:text-sm font-medium text-center`} key={`${title}-${el.label}`}>
                        <span>{el.label}</span>
                      </div>
                    );
                  })
                }
              </div>}
            </div>
          }
        </div>
      }
    </article>
  );
};

export default PlanCard;
