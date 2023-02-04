import Image from "next/image";
import uuid from 'react-uuid';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Icon from "@/components/atoms/icon/Icon";

const BannerSliderBlock: React.FC<IPromoBlock> = ({
  featuredContentsCollection,
  blockId,
  sysId
}) => {
  const customUUID = uuid();

  return (
    <section id={blockId ? blockId : sysId} className="grid">
      {featuredContentsCollection?.items?.length > 0 && (
        <div className="container px-28 mx-auto relative">
          <div className="-mx-[50vw]">
            <div className="w-screen mx-auto">
              <Swiper
                modules={[Pagination, Navigation, EffectFade]}
                allowTouchMove={true}
                navigation={{
                  nextEl: `.nextSlide${customUUID}`,
                  prevEl: `.prevSlide${customUUID}`
                }}
                pagination={{
                  bulletClass: "swiper-pagination-bullet swiper-pagination-custom-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active"
                }}
                spaceBetween={5}
                slidesPerView={1}
                speed={1000}
                loop={true}
                effect="fade"
                className="relative w-full sm:h-[394px] !pb-20 sm:!pb-24 md:!pb-0"
              >
                {featuredContentsCollection.items.map((content) => (
                  content.promoImage?.url && (
                    <SwiperSlide className="flex flex-col sm:flex-row gap-4 md:gap-0 items-center !h-auto sm:h-full bg-white" key={content.promoTitle}>
                      <figure className="sm:absolute md:w-screen h-[394px]">
                        <Image
                          src={content.promoImage.url}
                          alt={content.promoImage.title ?? "SlideItem"}
                          className="w-full h-full object-cover object-right"
                          width={1440}
                          height={394}
                          priority
                        />
                      </figure>
                      <div className="container md:px-14 2md:px-28 mx-auto">
                        <div className="relative flex justify-center items-center sm:items-start flex-col gap-[30px] px-2 xxs:px-0 md:px-2 sm:w-3/5">
                          <h1 className="text-blue-dark text-2xl sm:text-3xl xl:text-[43px] xl:leading-[1.3] text-center sm:text-left">
                            {content.promoTitle ?? content.name}
                          </h1>
                          {(content.externalLink || content.internalLink) && (
                            <CustomLink
                              content={content}
                              className="flex w-fit button button-primary text-sm sm:text-base"
                            >
                              {content.ctaLabel}
                            </CustomLink>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                ))}
              </Swiper>
            </div>
          </div>

          <div className='z-10 absolute top-full md:top-1/2 -translate-y-14 md:-translate-y-1/2 -left-5 md:-left-10 2md:-left-5 2xl:-left-24'>
            <div className={`prevSlide${customUUID} w-16 h-16 md:h-24 md:w-24 rounded-full cursor-pointer flex items-center justify-center`}>
              <Icon icon="arrow-left" className=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[-1px_2px_2px_rgba(255,255,255,1)]" />
            </div>
          </div>
          <div className='z-10 absolute top-full md:top-1/2 -translate-y-14 md:-translate-y-1/2 -right-5 md:-right-10 2md:-right-5 2xl:-right-24'>
            <div className={`nextSlide${customUUID} w-16 h-16 md:h-24 md:w-24 rounded-full cursor-pointer flex items-center justify-center`}>
              <Icon icon="arrow-right" className=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[1px_2px_2px_rgba(255,255,255,1)]" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerSliderBlock;
