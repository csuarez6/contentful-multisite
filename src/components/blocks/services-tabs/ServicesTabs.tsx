import Image from "next/image";
import uuid from "react-uuid";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Tab, Transition } from "@headlessui/react";

import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

import { classNames } from "@/utils/functions";
import LeftFeatured from "@/components/organisms/cards/left-featured/LeftFeatured";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import jsonToReactComponent from "@/lib/services/render-cards.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import Icon from "@/components/atoms/icon/Icon";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const TabElement = ({ promoIcon, promoImage, image, promoTitle, name, display }) => (
  <>
    {display === "Icono" ? (
      <Icon
        icon={promoIcon ?? 'check-vanti-neutral'}
        className="flex items-center w-10 h-10 text-neutral-30"
      />
    ) : (
      (promoImage || image) && (
        <figure className="w-[72px] md:w-[102px] rounded-full overflow-hidden aspect-square relative">
          <Image
            className="object-cover w-full h-full"
            src={promoImage?.url ?? image?.url}
            alt={promoImage?.title ?? image?.title}
            width={102}
            height={102}
          />
        </figure>
      )
    )}
    <p className="font-semibold text-sm md:text-base tracking-tight xs:tracking-normal break-words leading-[1.6]">{promoTitle ?? name}</p>
  </>
);

const ServicesTabsBlock: React.FC<IPromoBlock> = ({
  pretitle,
  title,
  description,
  featuredContentsCollection,
  view,
  blockId,
  sysId,
  isFirst
}) => {
  const _uuid = uuid();
  const { asPath } = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const updateTabIndex = (evt) => setTabIndex(evt);
  const nextSlideId = `nextSlide_${_uuid}`;
  const prevSlideId = `prevSlide_${_uuid}`;

  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {(pretitle || title || description) && (
        <div className="grid gap-3">
          {pretitle && <p className="title is-4 !font-semibold text-category-blue-dark text-center">{pretitle}</p>}
          {isFirst && title && <h1 className="text-blue-dark text-center">{title}</h1>}
          {!isFirst && title && <h2 className="text-blue-dark text-center">{title}</h2>}
          {description && <div className="text grey-30">{documentToReactComponents(description.json)}</div>}
        </div>
      )}
      {featuredContentsCollection?.items?.length > 0 && (
        <Tab.Group as="div" className="grid grid-cols-1 gap-4 md:mt-4" selectedIndex={tabIndex} onChange={updateTabIndex}>
          <div className="relative overflow-hidden">
            <Tab.List className="flex gap-[30px]">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={20}
                breakpoints={{
                  1024: {
                    spaceBetween: 32
                  }
                }}
                centerInsufficientSlides={true}
                modules={[Navigation]}
                navigation={{
                  nextEl: `#${nextSlideId}`,
                  prevEl: `#${prevSlideId}`,
                  disabledClass: "swiper-button-disabled opacity-50"
                }}
                className="relative w-full"
              >
                {featuredContentsCollection.items.map((tab) => (
                  <SwiperSlide
                    key={tab?.name}
                    className="max-w-[176px] w-[100px] xs:w-[120px] lg:w-[176px] h-full shrink-0"
                  >
                    {(tab.urlPath || tab.internalLink?.urlPath || tab.externalLink) ? (
                      <CustomLink
                        content={tab}
                        linkClassName="flex"
                        className={classNames(
                          "flex flex-col items-center text-blue-dark gap-[10px] mx-auto w-[100px] xs:w-[120px] lg:w-[176px] h-full focus:outline-none hover:border-lucuma border-b-2 py-[10px] text-center",
                          (tab?.promoImage || tab?.image || (tab?.promoIcon && view?.tabDisplay === "Icono")) ? "justify-start" : "justify-center",
                          ([asPath].includes(tab?.urlPath || tab?.internalLink?.urlPath || tab?.externalLink)) ? "border-lucuma" : "border-transparent"
                        )}
                      >
                        {<TabElement {...tab} display={view?.tabDisplay} />}
                      </CustomLink>
                    ) : (
                      <Tab
                        className={({ selected }) => (
                          classNames(
                            (tab?.promoImage || tab?.image || (tab?.promoIcon && view?.tabDisplay === "Icono")) ? "justify-start" : "justify-center",
                            selected
                              ? "border-lucuma"
                              : "border-transparent hover:border-lucuma",
                            "flex flex-col items-center text-blue-dark gap-[10px] mx-auto w-[100px] xs:w-[120px] lg:w-[176px] h-full focus:outline-none border-b-2 px-2 py-[10px]"
                          )
                        )}
                      >
                        {<TabElement {...tab} display={view.tabDisplay} />}
                      </Tab>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </Tab.List>
          </div>
          <div className="flex justify-center gap-6">
            <div id={prevSlideId} className="w-6 h-6 text-neutral-20">
              <Icon icon="arrow-left" className="w-full h-full" />
            </div>
            <div id={nextSlideId} className="w-6 h-6 text-neutral-20">
              <Icon icon="arrow-right" className="w-full h-full" />
            </div>
          </div>

          <Tab.Panels as={Fragment}>
            {featuredContentsCollection.items.map((tab, idx) => (
              (!tab.urlPath && !tab.internalLink && !tab.externalLink) && (
                <Tab.Panel
                  key={tab?.name}
                  className="focus:outline-none"
                >
                  <Transition
                    appear
                    show={tabIndex === idx}
                    enter="transition-opacity ease-out duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-1000"
                    leaveFrom="opacity-100 "
                    leaveTo="opacity-0"
                  >
                    {tab.__typename === CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT ? (
                      <LeftFeatured {...tab} buttonType={view?.buttonType} />
                    ) : (
                      jsonToReactComponent(tab)
                    )}
                  </Transition>
                </Tab.Panel>
              )
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </section>
  );
};

export default ServicesTabsBlock;
