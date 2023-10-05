import React from "react";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";
import "swiper/css/mousewheel";
import "swiper/css/free-mode";

const Breadcrumbs: React.FC<IPromoBlock> = ({ ctaCollection }) => {
  const free:SwiperProps = {
    modules: [FreeMode, Mousewheel],
    slidesPerView: "auto",
    spaceBetween: 2,
    mousewheel: {
      sensitivity: 1
    },
    freeMode: {
      enabled: true
    }
  };
  return (
    <section className="py-6">
      <Swiper {...free} tag="nav" wrapperTag="ul" className="text-sm md:text-base">
        {ctaCollection?.items.map((el, i) => (
          <SwiperSlide tag="li" key={`${el.name ?? el.promoTitle}-${i}`} className="my-auto !w-auto hidden [&:nth-last-child(n+2):nth-last-child(-n+3)]:block md:block">
            <span
              className="items-center gap-0.5 flex"
            >
              {Boolean(i) && <Icon icon="arrow-right" className="h-5 w-5 md:h-6 md:w-6" />}
              {i + 1 !== ctaCollection.items.length ? (
                <CustomLink
                  content={el}
                  linkClassName="flex items-center text-[#466072] font-semibold hover:underline leading-none"
                >
                  {el.promoTitle ?? el.name}
                </CustomLink>
              ) : (
                <p className="text-blue-dark font-semibold leading-none">
                  {el.promoTitle ?? el.name}
                </p>
              )}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Breadcrumbs;
