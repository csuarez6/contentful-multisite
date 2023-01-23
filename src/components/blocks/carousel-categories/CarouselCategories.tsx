import uuid from 'react-uuid';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, } from "swiper";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from '@/utils/functions';
import Icon, { IIcon } from '@/components/atoms/icon/Icon';
import CarouselCategories from '@/components/organisms/carousel-categories/CarouselCategories';
import "swiper/css";
import "swiper/css/effect-fade";

const iconLeft: IIcon = {
  icon: 'arrow-left',
  size: 28,
  className: 'z-10'
};

const iconRight: IIcon = {
  icon: 'arrow-right',
  size: 28,
  className: 'z-10'
};

const CarouselCategoriesBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, view }) => {  
  const uui = uuid();
  return (
    <section className={classNames("section gap-9 flex flex-col", view.alignTitle === 'Left' && "md:flex-row md:gap-0")}>
      {(title || description) && (
        <div className={classNames("text-center", view.alignTitle === 'Left' ? 'md:w-[331px] md:max-w-[25%] md:text-left md:shrink-0' : "mb-3")}>
          {title && <h2 className="text-blue-dark text-4xl">{title}</h2>}
          {description && <div className="text-blue-dark">{documentToReactComponents(description.json)}</div>}
        </div>
      )}
      {featuredContentsCollection?.items?.length > 0 && (
        <div className={classNames("flex flex-nowrap relative grow w-full", view.alignTitle === 'Left' && 'md:max-w-[75%] md:pl-9')}>
          <div className='flex justify-center items-center'>
            <div className={`prevSlide${uui} bg-blue-dark-90 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center`}>
              <Icon {...iconLeft} />
            </div>
          </div>
          <Swiper
            slidesPerView={view?.columnsSize ?? 5}
            spaceBetween={0}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            modules={[Pagination, Navigation]}
            navigation={{
              nextEl: `.nextSlide${uui}`,
              prevEl: `.prevSlide${uui}`
            }}
            className="relative w-full"
          >
            {featuredContentsCollection && featuredContentsCollection?.items?.map((content) => (
              <SwiperSlide key={content.promoTitle} >
                <CarouselCategories {...content} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='flex justify-center items-center'>
            <div className={`nextSlide${uui} bg-blue-dark-90 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center`}>
              <Icon {...iconRight} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CarouselCategoriesBlock;
