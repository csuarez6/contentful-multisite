import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
// import { ISliderProps } from '@/lib/interfaces/slider-cf.interface';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Link from "next/link";

const Slider: React.FC<any> = ({ data }) => {
  const [stopSliderRotation, setstopSliderRotation] = useState(false);
  if (!data) return;

  return (
    <Swiper
      modules={[Pagination, Navigation, EffectFade, Autoplay]}
      spaceBetween={5}
      slidesPerView={1}
      speed={1000}
      loop={true}
      effect="fade"
      pagination={{
        type: "custom",
        renderCustom(_, current, total) {
          const className = "slider-bullet";
          let bullets = "";
          for (let i = 0; i < total; i++) {
            bullets += `<span data-bullet-index="${i}" class="${className}${current === i + 1 ? " is-active" : ""}"></span>`;
          }
          return `<button data-testid="sliderPrev" class="sliderPrev carousel-control-prev-icon bg-no-repeat opacity-60 hover:opacity-100 w-[15px] mr-2 hidden lg:inline-block"></button>
                    ${bullets}
                  <button data-testid="sliderNext" class="sliderNext carousel-control-next-icon bg-no-repeat opacity-60 hover:opacity-100 w-[15px] ml-2 hidden lg:inline-block"></button>`;
        },
      }}
      autoplay={{ delay: 7000, disableOnInteraction: stopSliderRotation }}
      navigation={{
        nextEl: ".sliderNext",
        prevEl: ".sliderPrev",
      }}
      onPaginationRender={(swiper, el) => {
        el.querySelector(".sliderPrev").addEventListener("click", () => {
          swiper.slidePrev();
        });
        el.querySelector(".sliderNext").addEventListener("click", () => {
          swiper.slideNext();
        });
        el.querySelectorAll(".slider-bullet").forEach((bullet) => {
          bullet.addEventListener("click", () => {
            const index = bullet.getAttribute("data-bullet-index");
            swiper.slideTo(Number(index) + 1);
          });
        });
      }}
    >
      {data?.map((slide, index) => {
        if (!slide.urlImage) return;
        return (
          <SwiperSlide
            key={index}
            className="relative max-h-[568px] min-h-[350px] 2md:min-h-fit"
          >
            <Image
              src={slide?.urlImage}
              alt={slide?.title}
              className="w-auto h-[350px] 2md:h-auto object-cover"
              width={1920}
              height={568}
              priority
            />
            <div className="absolute inset-0 flex justify-center flex-col gap-6 xl:ml-[120px] ml-5 pr-4">
              {slide?.title && (
                <h2 className="text-blue-dark text-2xl 2md:text-3xl 2xl:text-[43px] font-bold w-3/5 2xl:leading-[56px] mt-1">
                  {slide?.title}
                </h2>
              )}
              {!slide?.link?.isExternal ? (
                <Link href={slide?.link?.href} prefetch>
                  <a
                    className={`self-start ${slide?.link?.classes ?? ""
                      } font-semibold py-[9px] px-4 button text-xs md:text-base`}
                    onClick={slide?.link?.onClick}
                  >
                    {slide?.link?.name}
                  </a>
                </Link>
              ) : (
                <a
                  href={slide?.link?.href}
                  className={`self-start ${slide?.link?.classes ?? ""
                    } font-semibold py-[9px] px-4 button text-xs md:text-base`}
                  onClick={slide?.link?.onClick}
                >
                  {slide?.link?.name}
                </a>
              )}
            </div>
          </SwiperSlide>
        );
      })}
      <button
        className="cursor-pointer z-20 w-[33px] absolute xl:ml-[120px] ml-5 bottom-5 xl:bottom-10 hidden md:block"
        onClick={() => setstopSliderRotation(!stopSliderRotation)}
      >
        <Image
          className="w-full h-full"
          alt="stop/pause"
          src="/images/play-button.png"
          width={33}
          height={33}
        />
      </button>
    </Swiper>
  );
};

export default Slider;
