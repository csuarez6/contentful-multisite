import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
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
        <figure className="w-[102px] rounded-full overflow-hidden aspect-square relative">
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
    <p className="font-semibold leading-[1.6]">{promoTitle ?? name}</p>
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
  const { asPath } = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const updateTabIndex = (evt) => setTabIndex(evt);

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
        <Tab.Group as="div" className="grid mt-4" selectedIndex={tabIndex} onChange={updateTabIndex}>
          <div className="flex justify-start md:justify-center overflow-x-auto custom-scrollbar">
            <div className="flex border-b border-transparent">
              <Tab.List className="flex gap-[30px]">
                {featuredContentsCollection.items.map((tab) => (
                  (tab.urlPath || tab.internalLink?.urlPath || tab.externalLink) ? (
                    <CustomLink
                      content={tab}
                      linkClassName="flex"
                      className={classNames(
                        "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none hover:border-lucuma border-b-2 py-[10px] text-center",
                        (tab?.promoImage || tab?.image || (tab?.promoIcon && view?.tabDisplay === "Icono")) ? "justify-start" : "justify-center",
                        ([asPath].includes(tab?.urlPath || tab?.internalLink?.urlPath || tab?.externalLink)) ? "border-lucuma" : "border-transparent"
                      )}
                      key={tab?.name}
                    >
                      {<TabElement {...tab} display={view?.tabDisplay} />}
                    </CustomLink>
                  ) : (
                    <Tab
                      key={tab?.name}
                      className={({ selected }) => (
                        classNames(
                          (tab?.promoImage || tab?.image || (tab?.promoIcon && view?.tabDisplay === "Icono")) ? "justify-start" : "justify-center",
                          selected
                            ? "border-lucuma"
                            : "border-transparent hover:border-lucuma",
                          "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none border-b-2 px-2 py-[10px]"
                        )
                      )}
                    >
                      {<TabElement {...tab} display={view.tabDisplay} />}
                    </Tab>
                  )
                ))}
              </Tab.List>
            </div>
          </div>

          <Tab.Panels as={Fragment}>
            {featuredContentsCollection.items.map((tab, idx) => (
              (!tab.urlPath && !tab.internalLink && !tab.externalLink) && (
                <Tab.Panel
                  key={tab?.name}
                  className="pt-6 focus:outline-none"
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
                    {tab.__typename ===
                      CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT ? (
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
