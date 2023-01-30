import Image from "next/image";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";

import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

import { classNames } from "@/utils/functions";
import LeftFeatured from "@/components/organisms/cards/left-featured/LeftFeatured";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

const TabElement = (tab) => {
  return (
    <>
      {(tab.promoImage || tab.image) && (
        <figure className="w-[102px] rounded-full overflow-hidden aspect-square relative">
          <Image
            className="object-cover"
            src={tab?.promoImage?.url? tab.promoImage.url : tab.image.url }
            alt={tab?.promoImage?.title? tab.promoImage.title: tab?.image?.title }
            fill
          />
        </figure>
      )}
      <p className="font-semibold leading-[1.6]">
        {tab.promoTitle ?? tab.name}
      </p>
    </>
  );
};

const ServicesTabsBlock: React.FC<IPromoBlock> = ({ title, featuredContentsCollection, view ,blockId, sysId }) => {
  
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {title && <h2 className="text-blue-dark">{title}</h2>}
      {featuredContentsCollection?.items?.length > 0 && (
        <Tab.Group as="div" className="mt-4">
          <div className="flex justify-center overflow-x-auto">
            <div className="flex border-b border-transparent">
              <Tab.List className="flex gap-[10px]">
                {featuredContentsCollection.items.map((tab) =>
                  tab?.internalLink?.slug || tab?.externalLink ? (
                    <CustomLink
                      content={tab}
                      linkClassName="flex"
                      className={classNames(
                        tab.promoImage ? "justify-start" : "justify-center",
                        "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none border-transparent hover:border-lucuma border-b-2 px-2 py-6"
                      )}
                      key={tab?.name}
                    >
                      {<TabElement {...tab} />}
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
                          "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none border-b-2 px-2 py-6"
                        )
                      }
                    >
                      {<TabElement {...tab} />}
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
                  <Tab.Panel key={tab?.name} className="pt-6 focus:outline-none">
                    <LeftFeatured {...tab} buttonType={view?.buttonType}/>
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
