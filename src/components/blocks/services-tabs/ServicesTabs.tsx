import Image from "next/image";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";

import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

import { classNames } from "@/utils/functions";
import LeftFeatured from "@/components/organisms/cards/left-featured/LeftFeatured";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import jsonToReactComponent from "@/lib/services/render-cards.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import Icon from "@/components/atoms/icon/Icon";

const TabElement = (tab) => {
  const {promoIcon, promoImage, image, promoTitle, name, display } = tab;
  return (
    <>
      {display === "Icono" ? (
        <Icon
          icon={promoIcon ?? 'check-vanti-neutral'}
          className="flex items-center w-1/2 h-1/2 text-neutral-30"
        />
      ) : (
        (promoImage || image) && (
          <figure className="w-[102px] rounded-full overflow-hidden aspect-square relative">
            <Image
              className="object-cover"
              src={promoImage?.url ? promoImage.url : image.url}
              alt={promoImage?.title ? promoImage.title : image?.title}
              fill
            />
          </figure>
        )
      )}
      <p className="font-semibold leading-[1.6]">{promoTitle ?? name}</p>
    </>
  );
};

const ServicesTabsBlock: React.FC<IPromoBlock> = ({
  title,
  featuredContentsCollection,
  view,
  blockId,
  sysId,
}) => {
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {title && <h2 className="text-blue-dark">{title}</h2>}
      {featuredContentsCollection?.items?.length > 0 && (
        <Tab.Group as="div" className="grid mt-4">
          <div className="flex justify-start md:justify-center overflow-x-auto  custom-scrollbar">
            <div className="flex border-b border-transparent">
              <Tab.List className="flex gap-[30px]">
                {featuredContentsCollection.items.map((tab) =>
                  tab?.internalLink?.slug || tab?.externalLink ? (
                    <CustomLink
                      content={tab}
                      linkClassName="flex"
                      className={classNames(
                        tab.promoImage ? "justify-start" : "justify-center",
                        "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none border-transparent hover:border-lucuma border-b-2 py-[10px] text-center"
                      )}
                      key={tab?.name}
                    >
                      {<TabElement {...tab} display={view.tabDisplay} />}
                    </CustomLink>
                  ) : (
                    <Tab
                      key={tab?.name}
                      className={({ selected }) =>
                        classNames(
                          tab?.promoImage ? "justify-start" : "justify-center",
                          selected
                            ? "border-lucuma"
                            : "border-transparent hover:border-lucuma",
                          "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none border-b-2 px-2 py-[10px]"
                        )
                      }
                    >
                      {<TabElement {...tab}  display={view.tabDisplay}/>}
                    </Tab>
                  )
                )}
              </Tab.List>
            </div>
          </div>

          <Tab.Panels as={Fragment}>
            {featuredContentsCollection.items.map(
              (tab) =>
                !tab?.internalLink &&
                !tab?.externalLink && (
                  <Tab.Panel
                    key={tab?.name}
                    className="pt-6 focus:outline-none"
                  >
                    {tab.__typename ===
                    CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT ? (
                      <LeftFeatured {...tab} buttonType={view?.buttonType} />
                    ) : (
                      jsonToReactComponent(tab)
                    )}
                  </Tab.Panel>
                )
            )}
          </Tab.Panels>
        </Tab.Group>
      )}
    </section>
  );
};

export default ServicesTabsBlock;
