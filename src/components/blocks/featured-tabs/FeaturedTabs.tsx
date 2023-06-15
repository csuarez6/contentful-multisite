import { Fragment, useEffect, useState } from "react";
import { Tab, Transition } from "@headlessui/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classNames } from "@/utils/functions";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import ListWithIcons from "@/components/organisms/list-with-icons/ListWithIcons";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import jsonToReactComponent from "@/lib/services/render-cards.service";
import uuid from "react-uuid";

const grid = {
  1: "",
  2: "2md:grid-cols-2",
  3: "2md:grid-cols-3",
  4: "2md:grid-cols-4",
  5: "2md:grid-cols-5",
  6: "2md:grid-cols-6"
};

const FeaturedTabsBlock: React.FC<IPromoBlock> = ({
  title,
  pretitle,
  description,
  featuredContentsCollection,
  view,
  blockId,
  sysId,
}) => {
  const _uuid = uuid();
  const [isCentered, setIsCentered] = useState(true);
  const checkWidth = () => {
    const container = document.getElementById(`container_${_uuid}`);
    const tabs = document.getElementById(`tabs_${_uuid}`);
    if (container && tabs) setIsCentered(container.offsetWidth >= tabs.offsetWidth);
  };

  useEffect(() => {
    checkWidth();
  });

  useEffect(() => {
    window.addEventListener('resize', checkWidth);
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  });
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {(title || description) && (
        <div className="grid text-center gap-6">
          {pretitle && <p className="text-xs leading-[1.5] md:text-xl md:leading-[1.2] !font-semibold text-blue-dark uppercase">{pretitle}</p>}
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && (
            <div className="text-neutral-30">
              {documentToReactComponents(description.json)}
            </div>
          )}
        </div>
      )}

      {featuredContentsCollection?.items?.length > 0 && (
        <Tab.Group as="div" className="grid grid-cols-1 gap-6">
          <div
            id={`container_${_uuid}`}
            className={classNames(
              "flex overflow-x-auto custom-scrollbar",
              isCentered ? "justify-center" : "justify-start"
            )}
          >
            <div id={`tabs_${_uuid}`} className="flex border-b border-transparent">
              <Tab.List className="flex gap-[10px]">
                {featuredContentsCollection.items.map((tab) => (
                  <Tab
                    key={`${tab.name}_tab`}
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-lucuma text-blue-dark"
                          : "border-transparent hover:border-lucuma text-category-sky-blue-50",
                        "flex flex-col items-center title is-3 gap-[10px] max-w-[190px] xl:max-w-[220px] flex-1 shrink-0 grow focus:outline-none border-b-2 p-5"
                      )
                    }
                  >
                    <span>{tab.title ?? tab.name}</span>
                  </Tab>
                ))}
              </Tab.List>
            </div>
          </div>

          <div className="relative">
            <Tab.Panels as={Fragment}>
              {featuredContentsCollection.items.map((collection) => (
                <Tab.Panel key={`${collection.name}_content`} className="focus:outline-none">
                  <Transition
                    appear
                    show
                    enter="transition-opacity ease-in duration-700"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-out duration-700"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {view?.isBlock && collection.__typename === CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT ? (
                      jsonToReactComponent(collection)
                    ) : (
                      <div className={classNames("grid grid-cols-1 gap-5 mt-6", grid[collection?.featuredContentsCollection?.items?.length])}>
                        {collection.featuredContentsCollection.items.map((item) => (
                            <div key={item.name} className="grid">
                              <ListWithIcons {...item} />
                            </div>
                        ))}
                      </div>
                    )}
                  </Transition>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </Tab.Group>
      )}
    </section>
  );
};

export default FeaturedTabsBlock;
