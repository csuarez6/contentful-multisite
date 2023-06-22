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
import { iconLeft, iconRight } from '@/components/atoms/icons-indicators-slider';

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
              if (content) {
                { if (content?.promoImage) content.promoImage.isPortrait = view?.imageOrientation?.toLowerCase() === 'portrait'; }
                return <div className='flex justify-center' key={content.promoTitle}>
                  <VerticalCard key={content.promoTitle} {...content} buttonType={view.buttonType} alignButton={view.alignButton} />
                </div>;
              }
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
                  prevEl: `.prevSliderListIcon`,
                  nextEl: `.nextSliderListIcon`,
                  enabled: true
                }}
                pagination={{
                  type: "custom",
                  renderCustom(_, current, total) {
                    const className = "slider-bullet swiper-pagination-bullet swiper-pagination-custom-bullet-sliders ";
                    let bullets = "";
                    for (let i = 0; i < total; i++) {
                      bullets += `
                        <span data-bullet-index="${i}" class="${className} ${current === i + 1 ? "swiper-pagination-bullet-active" : ""}"></span>
                      `;
                    }
                    return `
                      <div class="slider-bullets-custom">
                        ${iconLeft(`prevSliderListIcon`)}
                        <div class="flex">
                          ${bullets}
                        </div>
                        ${iconRight(`nextSliderListIcon`)}
                      </div>
                    `;
                  },
                }}
                onPaginationRender={(swiper, el) => {
                  el.querySelector(`.prevSliderListIcon`)?.addEventListener("click", () => {
                    swiper.slidePrev();
                  });
                  el.querySelector(`.nextSliderListIcon`)?.addEventListener("click", () => {
                    swiper.slideNext();
                  });
                  el.querySelectorAll(".slider-bullet")?.forEach((bullet) => {
                    bullet.addEventListener("click", () => {
                      const index = bullet.getAttribute("data-bullet-index");
                      swiper.slideTo(Number(index) + 1);
                    });
                  });
                }}
              >
                {featuredContentsCollection?.items?.map(el => (
                  <SwiperSlide key={el?.promoTitle} className="!w-full relative">
                    <div className='grid px-1.5 py-2 justify-items-center'>
                      <VerticalCard {...el} buttonType={view.buttonType} alignButton={view.alignButton} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default VerticalCardBlock;
