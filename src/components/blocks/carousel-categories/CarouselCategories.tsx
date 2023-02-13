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
}) => {
    const uui = uuid();
    const allowTouchMove = view?.isSlider ?? true;
    const carouselAlignTitleClass = () => {
      switch (view.alignTitle) {
        case "Left":
          return "md:w-[331px] md:max-w-[25%] md:text-left md:shrink-0";
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
              "flex flex-nowrap relative grow w-full",
              view?.alignTitle === "Left" && "md:max-w-[75%] md:pl-9"
            )}
          >
            {allowTouchMove && (
              <div className="flex justify-center items-center">
                <div
                  className={`prevSlide${uui} bg-blue-dark-90 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center`}
                >
                  <Icon {...iconLeft} />
                </div>
              </div>
            )}
            <Swiper
              allowTouchMove={allowTouchMove}
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
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                960: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: view?.columnsSize ?? 5,
                  spaceBetween: 40,
                }
              }}
              loop={true}
              loopFillGroupWithBlank={true}
              modules={[Pagination, Navigation]}
              navigation={{
                nextEl: `.nextSlide${uui}`,
                prevEl: `.prevSlide${uui}`,
              }}
              className="relative w-full"
            >
              {featuredContentsCollection?.items?.map((content) => (
                <SwiperSlide key={content.name}>
                  <CarouselCategories
                    {...content}
                    queryParamName={queryParamName}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {allowTouchMove && (
              <div className="flex justify-center items-center">
                <div
                  className={`nextSlide${uui} bg-blue-dark-90 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center`}
                >
                  <Icon {...iconRight} />
                </div>
              </div>
            )}
          </div>
        )}
        {ctaCollection?.items?.length > 0 && (
          <div className="flex mt-6 justify-center">
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
