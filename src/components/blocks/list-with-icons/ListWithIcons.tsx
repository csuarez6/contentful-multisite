import Icon from "@/components/atoms/icon/Icon";
import ListWithIcon from '@/components/organisms/list-with-icons/ListWithIcons';
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import defaultFormatOptions from '@/lib/richtext/default.formatter';
import { attachLinksToRichtextContent } from '@/lib/services/render-blocks.service';
import { classColumns, classNames, getBackgroundColorClass, getButtonType, getTextAlignClass } from '@/utils/functions';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ListWithIconBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, view, ctaCollection, blockId, sysId }) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  const textAlignHeading = getTextAlignClass(view?.headerAlignment);
  const _blockId = blockId ? blockId : sysId;
  const [isRichtext, setIsRichtext] = useState(false);

  useEffect(() => {
    if (document) {
      const blockElement = document.getElementById(_blockId);
      if (blockElement) {
        const hasContainer = blockElement.closest('.richtext-container');
        setIsRichtext(!!hasContainer);
      }
    }
  }, []);

  return (
    <section id={_blockId} className={
      classNames(
        "section md:grid gap-9 max-md:!pb-[90px]",
        isRichtext && "rounded-xl overflow-hidden"
      )
    }>
      {view?.backgroundColor && (
        <div className="absolute inset-0 -mx-[50vw] -z-10">
          <div className={classNames("w-screen h-full mx-auto", backgroundColor.background)}></div>
        </div>
      )}

      {(title || description) && (
        <div className="text-center grid gap-6 px-3">
          {title && <h2 className={classNames(backgroundColor.title, textAlignHeading)}>{title}</h2>}
          {description && <div className={classNames(backgroundColor.text, textAlignHeading)}>{documentToReactComponents(description.json)}</div>}
        </div>
      )}
      {featuredContentsCollection?.items?.length > 0 && (
        <>
          <div className='hidden md:block px-3'>
            <div className={classNames("max-w-sm sm:max-w-none mx-auto grid gap-y-10 gap-x-8", classColumns(view.columnsSize, [4]))}>
              {featuredContentsCollection.items.map((item) => (
                <ListWithIcon key={`${item.sys.id}-desktop`} {...{ ...item, ...view }} />
              ))}
            </div>
          </div>
          <div className="sm:px-[72px] px-5 md:hidden shadow-card py-[21px] mt-7">
            <div>
              <Swiper
                loop={true}
                spaceBetween={12}
                slidesPerView={1}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="flex items-center mt-6 -z-10 !static slider-listIcon"
                navigation={{
                  nextEl: ".nextSlide",
                  prevEl: ".prevSlide",
                  lockClass: 'block'
                }}
                pagination={{
                  bulletClass: "swiper-pagination-bullet swiper-pagination-custom-bullet swiper-pagination-custom-bullet--iconslist",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                  clickable: true
                }}
              >
                <div className="relative">
                  {featuredContentsCollection?.items.map((el) => {
                    return (
                      <SwiperSlide key={el.promoTitle}>
                        <div className={classNames("mx-auto", classColumns(view.columnsSize))}>
                          <ListWithIcon key={el.promoTitle} {...el} />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            </div>
            <div className='z-10 absolute -translate-y-14 left-[5px] top-[98%]'>
              <div className={`prevSlide w-10 h-10 rounded-full cursor-pointer flex items-center justify-center`}>
                <Icon icon="arrow-left" className=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[-1px_2px_2px_rgba(255,255,255,1)]" />
              </div>
            </div>
            <div className='z-10 absolute -translate-y-14 right-[5px] top-[98%]'>
              <div className={`nextSlide w-10 h-10 rounded-full cursor-pointer flex items-center justify-center`}>
                <Icon icon="arrow-right" className=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[1px_2px_2px_rgba(255,255,255,1)]" />
              </div>
            </div>
          </div>
        </>
      )}

      {ctaCollection?.items?.length > 0 && (
        <div className="flex justify-center gap-3">
          {ctaCollection.items.map((cta) => {
            const hasBlocks = cta?.content?.json?.content?.some(el => {
              return ["embedded-entry-block", "embedded-asset-block"].includes(el.nodeType);
            });
            let contentJson = cta?.content?.json;
            if (attachLinksToRichtextContent && contentJson) {
              contentJson = attachLinksToRichtextContent(contentJson, cta?.content?.links ?? []);
            }
            return (
              <>
                {cta.linkView !== "Modal" && (cta.externalLink || cta.internalLink) && (
                  <CustomLink
                    content={cta}
                    key={cta.name}
                    className={classNames("button w-fit", getButtonType(view.buttonType))}
                  >
                    {cta.promoTitle ?? cta.name}
                  </CustomLink>
                )}
                {cta.linkView === "Modal" && (
                  <ButtonAtom
                    key={cta.name}
                    type="Modal"
                    classes={classNames("button w-fit", getButtonType(view.buttonType))}
                    modalClass={hasBlocks ? "main-container" : null}
                    text={cta.promoTitle ?? cta.name}
                  >
                    {cta.promoDescription?.json && (
                      <div>{documentToReactComponents(contentJson, defaultFormatOptions)}</div>
                    )}
                    {!cta.promoDescription && (cta.promoTitle ?? cta.name)}
                  </ButtonAtom>
                )}
              </>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ListWithIconBlock;
