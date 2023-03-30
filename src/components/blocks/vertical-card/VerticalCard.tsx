import VerticalCard from '@/components/organisms/cards/vertical-card/VerticalCard';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames, classColumns } from '@/utils/functions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Icon from '@/components/atoms/icon/Icon';

const VerticalCardBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, view, blockId, sysId }) => {
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-blue-dark text-size-p1">{documentToReactComponents(description.json)}</div>}
        </div>
      }
      {featuredContentsCollection?.items?.length > 0 && (
        <>
          <div className={classNames("justify-center gap-9 hidden md:grid", classColumns(view?.columnsSize))}>
            {featuredContentsCollection.items.map((content) => {
              { if (content.promoImage) content.promoImage.isPortrait = view?.imageOrientation?.toLowerCase() === 'portrait'; }
              return <div className='flex justify-center' key={content.promoTitle}>
                <VerticalCard key={content.promoTitle} {...content} buttonType={view.buttonType} alignButton={view.alignButton} />
              </div>;
            })}
          </div>
          <div className="block md:hidden">
            <div className='w-full mb-[55px]'>
              <Swiper
                loop={true}
                slidesPerView={1}
                spaceBetween={12}
                freeMode={true}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="w-full !static slider-vertical"
                navigation={{
                  nextEl: ".nextSlider",
                  prevEl: ".prevSlider",
                  lockClass: 'block'
                }}
                pagination={{
                  bulletClass: "swiper-pagination-bullet swiper-pagination-custom-bullet swiper-pagination-custom-bullet--iconslist max-md:!mb-0",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                  clickable: true
                }}
              >
                {featuredContentsCollection?.items?.map(el => (
                  <SwiperSlide key={el.promoTitle} className="!w-full relative">
                    <div className='grid px-1.5 py-2 justify-items-center'>
                      <VerticalCard {...el} buttonType={view.buttonType} alignButton={view.alignButton} />
                    </div>
                  </SwiperSlide>
                ))
                }
              </Swiper>
              <div className='z-10 absolute -translate-y-14 left-[5px] top-[98%]'>
                <div className={`prevSlider w-10 h-10 rounded-full cursor-pointer flex items-center justify-center`}>
                  <Icon icon="arrow-left" className=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[-1px_2px_2px_rgba(255,255,255,1)]" />
                </div>
              </div>
              <div className='z-10 absolute -translate-y-14 right-[5px] top-[98%]'>
                <div className={`nextSlider w-10 h-10 rounded-full cursor-pointer flex items-center justify-center`}>
                  <Icon icon="arrow-right" className=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[1px_2px_2px_rgba(255,255,255,1)]" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default VerticalCardBlock;
