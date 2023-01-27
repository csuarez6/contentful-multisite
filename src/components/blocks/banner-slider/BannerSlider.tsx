import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import swiper, { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import "swiper/css";
import "swiper/css/effect-fade";
import Icon from "@/components/atoms/icon/Icon";

const BannerSliderBlock: React.FC<IPromoBlock> = ({
  featuredContentsCollection,
  blockId, 
  sysId
}) => {

  const [instanceSwiper, setInstanceSwiper] = useState<swiper>();
  const [stopSlider, setStopSlider] = useState(false);

  return (
    <section id={blockId? blockId: sysId} className="grid">
      {featuredContentsCollection?.items?.length > 0 && (
        <div className="container px-28 mx-auto">
          <div className="-mx-[50vw]">
            <div className="w-screen mx-auto">
              <Swiper
                onSwiper={(swiper) => setInstanceSwiper(swiper)}
                modules={[Pagination, Navigation, EffectFade, Autoplay]}
                spaceBetween={5}
                slidesPerView={1}
                speed={1000}
                loop={true}
                effect="fade"
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                className="relative w-full h-[568px]"
              >
                {featuredContentsCollection.items.map(
                  (content) =>
                    content.promoImage?.url && (
                      <SwiperSlide
                        className="flex items-center"
                        key={content.promoTitle}
                      >
                        <figure className="absolute w-screen h-full">
                          <Image
                            src={content.promoImage.url}
                            alt={content.promoImage.title ?? "SlideItem"}
                            className="w-full h-full object-cover"
                            width={1920}
                            height={568}
                            priority
                          />
                        </figure>
                        <div className="container md:px-28 px-14 mx-auto">
                          <div className="relative flex justify-center flex-col gap-6 py-[70px] px-2 md:w-3/5">
                            <h1 className="text-blue-dark title is-1">
                              {content.promoTitle ?? content.name}
                            </h1>
                            {(content.externalLink || content.internalLink) && (
                              <CustomLink
                                content={content}
                                className="w-fit button button-primary"
                              >
                                {content.ctaLabel}
                              </CustomLink>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                )}
              </Swiper>
              <div className="container mx-auto relative flex">
                <button
                  className="cursor-pointer z-20 mx-28 absolute left-2 bottom-9"
                  onClick={() => { setStopSlider(!stopSlider); !stopSlider ? instanceSwiper.autoplay.stop() : instanceSwiper.autoplay.start(); }}
                >
                  <figure className="relative ">
                    <Icon icon={stopSlider ? "play" : "pause"} size={33} className={`text-[#466072] z-10 ${!stopSlider && 'bg-white rounded-full' }`}/>
                  </figure>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerSliderBlock;
