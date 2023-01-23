import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Swiper as ISwiper } from "swiper";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Link from "next/link";
import { ILink } from "@/lib/interfaces/menu-cf.interface";
import { IImageAsset } from "@/lib/interfaces/assets-cf.interface";

const iconLeft: IIcon = {
  icon: "arrow-left",
  size: 28,
  className: "z-10",
};

const iconRight: IIcon = {
  icon: "arrow-right",
  size: 28,
  className: "z-10",
};
export interface ICarousel {
  title?: string;
  description?: string;
  content: IImageAsset[];
  imagesPerView?: number;
  footerText?: ILink;
}

const Carousel: React.FC<ICarousel> = ({
  content,
  description,
  title,
  imagesPerView,
  footerText,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<ISwiper>();
  if (!content) return;
  return (
    <section>
      {(title || description) && (
        <div className="grid mb-8 text-center gap-9">
          {title && <h2 className="text-blue-dark title is-1">{title}</h2>}
          {description && <p className="text-blue-dark">{description}</p>}
        </div>
      )}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {content?.map((el, i) => (
          <SwiperSlide key={i}>
            {el.url && (
              <figure className="relative aspect-[595/548]">
                <Image
                  fill
                  className="w-full h-full cursor-pointer rounded-xl"
                  src={el.url}
                  alt={el.title ?? "carousel"}
                  priority
                />
              </figure>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="sm:px-[72px] relative px-5 xs:px-10">
        <div className="absolute top-0 bottom-0 left-0 z-10 items-center justify-center hidden ml-5 sm:flex">
          <figure className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer prevSlide bg-blue-dark-90">
            <Icon {...iconLeft} />
          </figure>
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={12}
          slidesPerView={imagesPerView ?? 4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="relative flex items-center mt-6 -z-10"
          navigation={{
            nextEl: ".nextSlide",
            prevEl: ".prevSlide",
          }}
        >
          <div className="relative">
            {content?.map((el, i) => {
              return (
                <SwiperSlide key={i}>
                  {el.url && (
                    <figure className="relative aspect-[104/92]">
                      <Image
                        fill
                        className="w-full h-full rounded-md cursor-pointer xs:rounded-xl"
                        src={el.url}
                        alt={el.title ?? "carousel"}
                        priority
                      />
                    </figure>
                  )}
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
        <div className="absolute top-0 bottom-0 right-0 z-10 items-center justify-center hidden mr-5 sm:flex">
          <figure className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer nextSlide bg-blue-dark-90">
            <Icon {...iconRight} />
          </figure>
        </div>
      </div>
      {footerText && (
        <div className="mt-9 max-w-[310px] lg:ml-[72px] relative leading-4">
          <Link
            className="font-normal underline text-grey-60"
            href={footerText?.href}
          >
            {footerText?.name}
          </Link>
        </div>
      )}
    </section>
  );
};

export default Carousel;
