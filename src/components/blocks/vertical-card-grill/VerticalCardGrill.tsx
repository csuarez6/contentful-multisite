import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import React, { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import VerticalCardGrill from '@/components/organisms/cards/vertical-card-grill/VerticalCardGrill';
import { classNames } from '@/utils/functions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import Icon from '@/components/atoms/icon/Icon';

import "swiper/css";

const getClasses = (length) => {
  const getContainerClasses = () => {
    if ([3, 4].includes(length)) {
      return "grid-rows-2";
    }
    else if ([5, 6, 7].includes(length)) {
      return "grid-rows-4";
    }
    else if ([8].includes(length)) {
      return "grid-rows-6";
    }
    else {
      return "grid-rows-1";
    }
  };
  const getElementClasses = () => {
    switch (length) {
      case 3:
        return "odd:row-span-1 even:row-span-2";
      case 4:
      case 8:
        return "[&:nth-child(4n+1)]:row-span-1 [&:nth-child(4n+4)]:row-span-1 row-span-2";
      case 5:
        return "first:row-span-1 last:row-span-1 row-span-1 row-span-2";
      case 6:
        return "row-span-2 first:row-span-1 last:row-span-1";
      case 7:
        return "[&:nth-child(4n+1)]:row-span-1 [&:nth-child(4n+4)]:row-span-1 row-span-2 last:row-span-1";
      default:
        return "row-span-1";
    }
  };

  const containerClasses = getContainerClasses();
  const elementClasses = getElementClasses();
  return { containerClasses, elementClasses };
};

const VerticalCardGrillBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  featuredContentsCollection,
  footerText,
  blockId,
  sysId
}) => {
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);

  const featuredContentsBase = JSON.parse(JSON.stringify(featuredContentsCollection));
  const featuredContentsCloned = featuredContentsBase?.items?.slice(0, 8);
  const { containerClasses, elementClasses } = getClasses(featuredContentsCloned?.length);

  const nextSlideId = `nextSlide${sysId}`;
  const prevSlideId = `prevSlide${sysId}`;

  const onIndexChange = ({ realIndex }) => {
    setIsFirst(realIndex === 0);
    setIsLast(realIndex === featuredContentsCloned.length - 1);
  };

  return (
    <section id={blockId ?? sysId} className="section grid grid-cols-1 gap-5 md:gap-9">
      {(title || description) && (
        <div className='flex flex-col gap-6'>
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className='text-grey-30 text-size-p1'>{documentToReactComponents(description.json)}</div>}
        </div>
      )}
      {featuredContentsCloned?.length > 0 && (
        <>
          <div className={
            classNames(
              'hidden md:grid gap-y-6 gap-x-8 justify-items-center',
              featuredContentsCloned.length > 1 ? "grid-cols-2" : "grid-cols-1",
              containerClasses
            )
          }>
            {featuredContentsCloned.map((el) => (
              <div
                key={el.name}
                className={
                  classNames(
                    'grid max-w-[588px] w-full',
                    elementClasses,
                    featuredContentsCloned.length > 1 && "grid-rows-1"
                  )
                }
              >
                <VerticalCardGrill {...{ ...el, ...{ alignButton: "Izquierda" } }} />
              </div>
            ))}
          </div>

          <div className="block md:hidden">
            <div className="block">
              <Swiper
                spaceBetween={12}
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                onSwiper={onIndexChange}
                onRealIndexChange={onIndexChange}
                navigation={{
                  prevEl: `.${prevSlideId}`,
                  nextEl: `.${nextSlideId}`,
                }}
                pagination={{
                  bulletClass: "swiper-pagination-bullet swiper-pagination-custom-bullet swiper-pagination-custom-bullet--iconslist max-md:!mb-0",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                  clickable: true
                }}
              >
                {featuredContentsCloned.map((el) => (
                  <SwiperSlide key={el.promoTitle}>
                    <div className='grid justify-items-center h-full px-0.5 py-2 mb-16'>
                      <VerticalCardGrill {...{ ...el, ...{ alignButton: "Izquierda" } }} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {featuredContentsCloned.length > 1 && (
                <>
                  <div className='z-10 absolute -translate-y-14 left-[5px] max-xs:top-[97%] top-[96.5%]'>
                    <div className={
                      classNames(
                        `${prevSlideId} w-10 h-10 rounded-full cursor-pointer flex items-center justify-center`,
                        isFirst ? "pointer-events-none opacity-50" : "pointer-events-auto"
                      )
                    }>
                      <Icon icon="arrow-left" className="pointer-events-none w-full h-full text-blue-dark drop-shadow-[-1px_2px_2px_rgba(255,255,255,1)]" />
                    </div>
                  </div>
                  <div className='z-10 absolute -translate-y-14 right-[5px] max-xs:top-[97%] top-[96.5%]'>
                    <div className={
                      classNames(`${nextSlideId} w-10 h-10 rounded-full cursor-pointer flex items-center justify-center`,
                        isLast ? "pointer-events-none opacity-50" : "pointer-events-auto"
                      )
                    }>
                      <Icon icon="arrow-right" className="pointer-events-none w-full h-full text-blue-dark drop-shadow-[1px_2px_2px_rgba(255,255,255,1)]" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      {footerText && (
        <div className="text-neutral-30 text-size-p2 richtext-container">
          {documentToReactComponents(footerText.json)}
        </div>
      )}
    </section>
  );
};

export default VerticalCardGrillBlock;
