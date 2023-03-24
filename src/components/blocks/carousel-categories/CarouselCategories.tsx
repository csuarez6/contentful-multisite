import uuid from "react-uuid";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames, getButtonType } from "@/utils/functions";
import Icon, { IIcon } from "@/components/atoms/icon/Icon";
import CarouselCategories from "@/components/organisms/carousel-categories/CarouselCategories";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import "swiper/css";
import "swiper/css/effect-fade";
import { ICarouselCategoryBlock } from "@/lib/interfaces/content-filter-cf.interface";
import React from "react";

const iconLeft: IIcon = {
  icon: "arrow-left",
  size: 28,
  className: "z-10 text-blue-dark",
};

const iconRight: IIcon = {
  icon: "arrow-right",
  size: 28,
  className: "z-10 text-blue-dark",
};

const CarouselCategoriesBlock: React.FC<
  IPromoBlock & ICarouselCategoryBlock
> = ({
  title,
  description,
  featuredContentsCollection,
  view,
  ctaCollection,
  blockId,
  sysId,
  queryParamName = "categoria",
  filterName,
}) => {
    const uui = uuid();
    const allowTouchMove = view?.isSlider ?? true;
    const [isEndSlider, setIsEndSlider] = React.useState<boolean | null>(false);
    const [indexSlide, setIndexSlide] = React.useState(0);
    const carouselAlignTitleClass = () => {
      switch (view.alignTitle) {
        case "Left":
          return "md:w-[331px] md:min-w-[331px] 2md:max-w-[25%] md:text-left md:shrink-0";
        case "Top":
          return "text-center mb-3";
        default:
          return "mb-3";
      }
    };

    return (
      <section
        id={blockId ? blockId : sysId}
        className={classNames(
          "section gap-9 flex flex-col",
          view?.alignTitle === "Left" && "md:flex-row md:gap-0"
        )}
      >
        {(title || description) && (
          <div
            className={classNames(
              carouselAlignTitleClass()
            )}
          >
            {title && <h2 className="text-blue-dark text-4xl">{title}</h2>}
            {description && (
              <div className="text-blue-dark">
                {documentToReactComponents(description.json)}
              </div>
            )}
          </div>
        )}
        {featuredContentsCollection?.items?.length > 0 && (
          <div
            className={classNames(
              "flex flex-nowrap relative grow w-full items-center",
              view?.alignTitle === "Left" && "md:max-w-[calc(100%-331px)] md:pl-[14px] lg:!pl-5"
            )}
          >
            {allowTouchMove && (
              <div className=' h-10 w-10'>
                <div className={classNames(`${indexSlide + 1 === 1 ? " hidden" : "flex"}`, ' justify-center items-center')}>
                  <div
                    className={`prevSlide${uui} border border-blue-dark h-10 w-10 rounded-full cursor-pointer flex items-center justify-center`}
                  >
                    <Icon {...iconLeft} />
                  </div>
                </div>
              </div>
            )}
            <Swiper
              allowTouchMove={allowTouchMove}
              onRealIndexChange={
                ({ isEnd, realIndex }) => {
                  setIsEndSlider(isEnd);
                  setIndexSlide(realIndex);
                }
              }
              slidesPerView={1}
              breakpoints={{
                375: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                960: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1120: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: view?.columnsSize ?? 5,
                  spaceBetween: 10,
                }
              }}
              modules={[Pagination, Navigation]}
              navigation={{
                nextEl: `.nextSlide${uui}`,
                prevEl: `.prevSlide${uui}`,
              }}
              className="relative w-full"
            >
              {featuredContentsCollection?.items?.map((content) => (
                <SwiperSlide key={content.name} className="h-auto">
                  <CarouselCategories
                    {...content}
                    queryParamName={queryParamName}
                    filterName={filterName}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {allowTouchMove && (
              <div className=' h-10 w-10'>
                <div className={classNames(`${isEndSlider && "!hidden"}`, ' justify-center items-center flex', featuredContentsCollection.items.length < 6 && "lg:hidden")}>
                  <div
                    className={`nextSlide${uui} border border-blue-dark h-10 w-10 rounded-full cursor-pointer flex items-center justify-center`}
                  >
                    <Icon {...iconRight} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {ctaCollection?.items?.length > 0 && (
          <div className="flex gap-4 mt-6 justify-center">
            {ctaCollection.items.map(
              (cta) =>
                (cta.externalLink || cta.internalLink) && (
                  <CustomLink
                    content={cta}
                    key={cta.name}
                    className={classNames("button w-fit", getButtonType(view.buttonType ?? "Primario"))}
                  >
                    {cta.promoTitle ?? cta.name}
                  </CustomLink>
                )
            )}
          </div>
        )}
      </section>
    );
  };

export default CarouselCategoriesBlock;
