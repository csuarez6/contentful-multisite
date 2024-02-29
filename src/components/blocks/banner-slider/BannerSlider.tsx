import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const iconLeft = (id: string) =>
  `<button id="${id}" class="carousel-control-prev-icon h-9 w-9 hidden sm:block mr-1 transition-transform duration-500 hover:-translate-x-1" aria-label="Prev Slide">
    <svg class="text-neutral-20 drop-shadow-[-1px_2px_2px_rgba(255,255,255,1)] h-9 w-9" viewBox="0 0 1024 1024" xmlns="https://www.w3.org/2000/svg">
      <path d="M618.667 277.333l-213.333 213.333 213.333 213.333" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="42.666666666666664"></path>
    </svg>
  </button>`;

const iconRight = (id: string) =>
  `<button id="${id}" class="carousel-control-next-icon h-9 w-9 hidden sm:block ml-1 transition-transform duration-500 hover:translate-x-1" aria-label="Next Slide">
    <svg class="text-neutral-20 drop-shadow-[1px_2px_2px_rgba(255,255,255,1)] h-9 w-9" viewBox="0 0 1024 1024" xmlns="https://www.w3.org/2000/svg">
      <path d="M405.333 704l213.333-213.333-213.333-213.333" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="42.666666666666664"></path>
    </svg>
  </button>`;

const grid = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const BannerSliderBlock: React.FC<IPromoBlock> = ({
  featuredContentsCollection,
  blockId,
  sysId,
}) => {
  const nextSlideId = `nextSlide_${sysId}`;
  const prevSlideId = `prevSlide_${sysId}`;
  return (
    <section id={blockId ?? sysId} className="grid">
      {featuredContentsCollection?.items?.length > 0 && (
        <div className="container px-28 mx-auto relative">
          <div className="-mx-[50vw]">
            <div className="w-screen mx-auto">
              <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                allowTouchMove={true}
                navigation={{
                  prevEl: `#${prevSlideId}`,
                  nextEl: `#${nextSlideId}`,
                  enabled: true,
                }}
                pagination={{
                  type: "custom",
                  renderCustom(_, current, total) {
                    const className =
                      "slider-bullet swiper-pagination-bullet swiper-pagination-custom-bullet";
                    let bullets = "";
                    for (let i = 0; i < total; i++) {
                      bullets += `
                        <span data-bullet-index="${i}" class="${className} ${
                        current === i + 1
                          ? "swiper-pagination-bullet-active"
                          : ""
                      }"></span>
                      `;
                    }
                    return `
                      <div class="indicators-bullets ${
                        grid[featuredContentsCollection?.items?.length]
                      }">
                        ${iconLeft(prevSlideId)}
                          ${bullets}
                        ${iconRight(nextSlideId)}
                      </div>
                    `;
                  },
                }}
                onPaginationRender={(swiper, el) => {
                  el.querySelector(`#${prevSlideId}`).addEventListener(
                    "click",
                    () => {
                      swiper.slidePrev();
                    }
                  );
                  el.querySelector(`#${nextSlideId}`).addEventListener(
                    "click",
                    () => {
                      swiper.slideNext();
                    }
                  );
                  el.querySelectorAll(".slider-bullet").forEach((bullet) => {
                    bullet.addEventListener("click", () => {
                      const index = bullet.getAttribute("data-bullet-index");
                      swiper.slideTo(Number(index) + 1);
                    });
                  });
                }}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: false,
                }}
                spaceBetween={5}
                slidesPerView={1}
                speed={1000}
                loop={true}
                effect="fade"
                className="relative w-full h-[472px] sm:h-[394px] banner-slider"
              >
                {featuredContentsCollection.items.map(
                  (content, idx) =>
                    content?.promoImage?.url && (
                      <SwiperSlide
                        className="flex flex-col sm:flex-row gap-4 md:gap-0 items-center !h-auto sm:h-full bg-white"
                        key={content.promoTitle + idx}
                      >
                        <CustomLink content={content} className="w-full h-full">
                          <figure className="md:w-screen h-[472px] sm:h-[394px]">
                            <Image
                              src={content.promoImage.url}
                              alt={content.promoImage.title}
                              className="w-full h-full object-cover object-[right_-14rem_top_50%] xs:object-[right_-10rem_top_50%] sm:object-[right_-8rem_top_50%] 2md:object-right-top xl:aspect-[1440/394] xl:max-w-[1440px] xl:ml-auto"
                              width={1440}
                              height={394}
                              priority
                            />
                          </figure>
                          <div className="container sm:px-14 2md:px-28 mx-auto absolute h-full sm:h-auto flex items-end sm:block">
                            <div className="relative flex justify-center items-center w-screen sm:w-fit sm:items-start flex-col gap-[30px] px-2 xxs:px-0 md:px-2 mb-6 sm:mb-0">
                              <h1 className="text-blue-dark text-2xl sm:text-3xl xl:text-[43px] xl:leading-[1.3] text-center sm:text-left p-2 sm:px-1 bg-white bg-opacity-50 rounded-xl sm:bg-transparent sm:rounded-none sm:drop-shadow-[2px_2px_2px_rgba(255,255,255,0.9)]">
                                {content?.promoTitle ?? content.name}
                              </h1>
                              {(content?.externalLink ||
                                content?.internalLink) && (
                                <CustomLink
                                  content={content}
                                  className="flex w-fit button button-primary text-sm sm:text-base"
                                >
                                  {content.ctaLabel}
                                </CustomLink>
                              )}
                            </div>
                          </div>
                        </CustomLink>
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerSliderBlock;
