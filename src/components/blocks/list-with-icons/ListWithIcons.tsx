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
import { iconLeft, iconRight } from "@/components/atoms/icons-indicators-slider";

const ListWithIconBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, view, footerText, ctaCollection, blockId, sysId }) => {
  const backgroundColor = getBackgroundColorClass(view?.backgroundColor);
  const textAlignHeading = getTextAlignClass(view?.headerAlignment);
  const _blockId = blockId ?? sysId;
  const [isRichtext, setIsRichtext] = useState(false);

  useEffect(() => {
    if (document) {
      const blockElement = document.getElementById(_blockId);
      if (blockElement) {
        const hasContainer = blockElement.closest('.richtext-container');
        setIsRichtext(!!hasContainer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="grid gap-6 px-3 text-center">
          {title && <h2 className={classNames(backgroundColor.title, textAlignHeading)}>{title}</h2>}
          {description && <div className={classNames(backgroundColor.text, textAlignHeading)}>{documentToReactComponents(description.json)}</div>}
        </div>
      )}
      {featuredContentsCollection?.items?.length > 0 && (
        <>
          <div className='hidden px-3 md:block'>
            <div className={classNames("max-w-sm sm:max-w-none mx-auto grid gap-y-10 gap-x-8", classColumns(view.columnsSize))}>
              {featuredContentsCollection.items.map((item) => (
                <ListWithIcon key={`${item.sys.id}`} {...{ ...item, ...view }} />
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
                <div className="relative">
                  {featuredContentsCollection?.items.map((el, i) => {
                    return (
                      <SwiperSlide key={`${el.promoTitle}-${i}`}>
                        <div className={classNames("mx-auto", classColumns(view.columnsSize))}>
                          <ListWithIcon key={`${el.sys.id}-desktop-${i}`} {...el} />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            </div>
          </div>
        </>
      )}

      {footerText && (
        <div className="text-neutral-30 text-size-p2 richtext-container">
          {documentToReactComponents(footerText.json)}
        </div>
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
                {cta?.mediaInternalLink && (
                  <CustomLink
                    content={cta}
                    className={classNames(
                      "button w-full sm:w-auto flex justify-center text-center",
                      getButtonType("Contorno")
                    )}
                  >
                    {cta?.ctaLabel ?? cta?.promoTitle ?? cta?.name}
                  </CustomLink>
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