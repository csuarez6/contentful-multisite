import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import "swiper/css";
import "swiper/css/effect-fade";
import { getUrlPath } from '@/utils/link.utils';

const BannerCarouselBlock: React.FC<IPromoBlock> = ({ featuredContentsCollection }) => {
  const [stopSliderRotation, setStopSliderRotation] = useState(false);

  return (
    <section className="grid">
      {
        featuredContentsCollection?.items && (
          <div className="container px-28 mx-auto">
            <div className="-mx-[50vw]">
              <div className="w-screen mx-auto">
                <Swiper
                  modules={[Pagination, Navigation, EffectFade, Autoplay]}
                  spaceBetween={5}
                  slidesPerView={1}
                  speed={1000}
                  loop={true}
                  effect="fade"
                  autoplay={{ delay: 7000, disableOnInteraction: stopSliderRotation }}
                  className="relative w-full h-[568px]"
                >
                  {featuredContentsCollection.items.map((content) => (
                    content.promoImage?.url &&
                    <SwiperSlide className="flex items-center" key={content.promoTitle}>
                      <figure className="absolute w-screen h-full">
                        <Image
                          src={content.promoImage.url}
                          alt={content.promoImage.title ?? 'SlideItem'}
                          className='w-full h-full object-cover'
                          width={1920}
                          height={568}
                          priority
                        />
                      </figure>
                      <div className="container px-28 mx-auto">
                        <div className='relative flex justify-center flex-col gap-6 py-[70px] px-2 w-3/5'>
                          <h1 className='text-blue-dark title is-1'>{content.promoTitle ?? content.name}</h1>
                          {(content.externalLink || content.internalLink) && (
                            <Link href={getUrlPath(content)} legacyBehavior>
                              <a className="w-fit button button-primary">{content.ctaLabel}</a>
                            </Link>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="container mx-auto relative flex">
                  <button className='cursor-pointer z-20 mx-28 absolute left-2 bottom-9' onClick={() => setStopSliderRotation(!stopSliderRotation)}>
                    <figure className="relative">
                      <Image
                        alt='stop/pause'
                        src='/images/play-button.png'
                        width={33}
                        height={33}
                      />
                    </figure>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </section>
  );
};

export default BannerCarouselBlock;
