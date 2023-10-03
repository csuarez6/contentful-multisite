import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactImageMagnify from "react-image-magnify";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Swiper as ISwiper } from "swiper";

import { ILink } from "@/lib/interfaces/menu-cf.interface";
import { IImageAsset } from "@/lib/interfaces/assets-cf.interface";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

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
  enableLoop?: boolean;
}

const aspectImage = (width: number, height: number, desideredWidth: number) => {
  const heightExpect = (height * desideredWidth) / width;
  return { width: desideredWidth, height: heightExpect };
};

const Carousel: React.FC<ICarousel> = ({
  content,
  description,
  title,
  imagesPerView,
  footerText,
  enableLoop,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<ISwiper>();
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);

  const onIndexChange = ({ realIndex, isEnd }) => {
    setIsFirst(realIndex === 0);
    setIsLast(isEnd);
  };

  if (!content) return;
  return (
    <div className="relative">
      {(title || description) && (
        <div className="grid mb-8 text-center gap-9">
          {title && <h2 className="text-blue-dark title is-1">{title}</h2>}
          {description && <p className="text-blue-dark">{description}</p>}
        </div>
      )}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {content?.map((el, i) => {
          const aspect = aspectImage(595, 548, 595 * 2);
          return (
            <SwiperSlide key={i}>
              {el?.url && (
                <figure className="relative aspect-[595/548]">
                  <Image
                    className="w-full h-full cursor-pointer rounded-xl object-contain lg:hidden"
                    src={el.url}
                    alt={el.title}
                    width={el.width}
                    height={el.height}
                    priority
                  />
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        isFluidWidth: true,
                        src: el?.url,
                      },
                      largeImage: {
                        src: el?.url,
                        height: aspect?.height,
                        width: aspect?.width,
                      },
                      imageClassName: "!w-full rounded-xl object-cover aspect-[595/548]",
                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                      hintTextMouse: "Ampliar",
                      enlargedImagePortalId: "magnifiyId",
                      enlargedImageClassName: "object-cover max-w-none",
                      enlargedImageContainerClassName: `shadow-2xl z-10 ml-4`,
                      enlargedImageContainerStyle: {
                        background: "white",
                        position: "absolute",
                      },
                      lensStyle: {
                        background: "rgba(0,0,0,.25)",
                      },
                      className: "hidden lg:block"
                    }}
                  />
                </figure>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="sm:px-[72px] relative px-5 ">
        {content.length > (imagesPerView ?? 4) && (
          <div className="absolute top-0 bottom-0 left-0 z-10 items-center justify-center hidden ml-5 sm:flex">
            <figure
              className={`flex items-center justify-center w-10 h-10 rounded-full prevSlide bg-blue-dark-90 ${isFirst ? " cursor-default opacity-50" : " cursor-pointer"
                }`}
            >
              <Icon {...iconLeft} />
            </figure>
          </div>
        )}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={enableLoop ?? true}
          spaceBetween={12}
          slidesPerView={imagesPerView ?? 4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="relative flex items-center mt-6"
          navigation={{
            nextEl: ".nextSlide",
            prevEl: ".prevSlide",
            lockClass: "block",
          }}
          onRealIndexChange={onIndexChange}
        >
          <div className="relative">
            {content?.map((el, i) => {
              return (
                <SwiperSlide key={i}>
                  {el.url && (
                    <figure className="relative aspect-[104/92]">
                      <Image
                        className="w-full h-full rounded-md cursor-pointer xs:rounded-xl"
                        src={el.url}
                        alt={el.title}
                        width={el.width}
                        height={el.height}
                        priority
                      />
                    </figure>
                  )}
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
        {content.length > (imagesPerView ?? 4) && (
          <div className="absolute top-0 bottom-0 right-0 z-10 items-center justify-center hidden mr-5 sm:flex">
            <figure
              className={`flex items-center justify-center w-10 h-10 rounded-full nextSlide bg-blue-dark-90 ${isLast ? "cursor-default opacity-50" : "cursor-pointer"
                }`}
            >
              <Icon {...iconRight} />
            </figure>
          </div>
        )}
      </div>
      {footerText && (
        <div className="mt-5 max-w-[310px] lg:ml-6 relative leading-4">
          <Link
            className="font-normal underline text-grey-60"
            href={footerText?.href}
          >
            {footerText?.name}
          </Link>
        </div>
      )}
      <div
        id="magnifiyId"
        className="absolute top-0 z-50 border duration-300 transition-all right-0 bg-white shadow-2xl"
      ></div>
    </div>
  );
};

export default Carousel;
{
  /* <div id="magnifiyId" class="absolute top-0 z-50 border duration-300 transition-all right-0 bg-white shadow-2xl">
  <div class="shadow-2xl" style="overflow: hidden; background: white; position: absolute; height: 595px; width: 714px; opacity: 1; transition: opacity 300ms ease-in 0s; pointer-events: none;">
    <img alt="" class="object-cover" src="https://images.ctfassets.net/3brzg7q3bvg1/3PB0OESTZ21j7yq6Ar5aoH/eaf051a48bac903b31565457d63a615a/CubiertaAPL-5QVPHTC-76cm-Haceb_1.png" style="width: 1200px; height: 1200px; transform: translate(-79px, -204px); pointer-events: none;">
  </div>
</div> */
}
