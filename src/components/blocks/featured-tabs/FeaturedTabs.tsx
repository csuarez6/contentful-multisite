import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import uuid from "react-uuid";
import { Tab, Transition } from "@headlessui/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import jsonToReactComponent from "@/lib/services/render-cards.service";
import ListWithIcons from "@/components/organisms/list-with-icons/ListWithIcons";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import { classNames } from "@/utils/functions";

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
  footerText,
  view,
  blockId,
  sysId,
}) => {
  const { asPath } = useRouter();
  const _uuid = uuid();
  const [isCentered, setIsCentered] = useState(true);
  const checkWidth = () => {
    if (view?.alignTitle !== "Centrado") return;
    const container = document.getElementById(`container_${_uuid}`);
    const tabs = document.getElementById(`tabs_${_uuid}`);
    if (container && tabs) setIsCentered(container.offsetWidth >= tabs.offsetWidth);
  };

  const isCustomLink = (item) => (item?.urlPaths?.[0] || item?.internalLink?.urlPaths?.[0] || item?.externalLink);

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
    <section id={blockId ?? sysId} className="section grid gap-9">
      {(title || description) && (
        <div className={classNames(
          "grid gap-6",
          view?.alignTitle !== "Izquierda" && "text-center"
        )}>
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
              isCentered && view?.alignTitle !== "Izquierda" ? "justify-center" : "justify-start"
            )}
          >
            <div id={`tabs_${_uuid}`} className="flex border-b border-transparent">
              <Tab.List className={classNames(
                "flex",
                view?.alignTitle !== "Izquierda" && "gap-[10px]"
              )}>
                {featuredContentsCollection.items.map((tab) => (
                  isCustomLink(tab) ? (
                    <CustomLink
                      key={`${tab.name}_tab`}
                      content={tab}
                      linkClassName="flex h-full"
                      className={classNames(
                        "flex flex-col flex-1 items-center title is-3 gap-[10px] focus:outline-none border-b-2",
                        ([asPath].includes(tab?.urlPaths?.[0] || tab?.internalLink?.urlPaths?.[0] || tab?.externalLink))
                          ? "border-lucuma text-blue-dark"
                          : "border-transparent hover:border-lucuma text-category-sky-blue-50",
                        view?.alignTitle !== "Centrado"
                          ? "p-3"
                          : "max-w-[190px] xl:max-w-[220px] shrink-0 grow p-5"
                      )}
                    >
                      <span className={classNames(view?.alignTitle === "Izquierda" && "whitespace-nowrap")}>
                        {tab.promoTitle ?? tab.title ?? tab.name}
                      </span>
                    </CustomLink>
                  ) : (
                    <Tab
                      key={`${tab.name}_tab`}
                      className={({ selected }) =>
                        classNames(
                          "flex flex-col flex-1 items-center title is-3 gap-[10px] focus:outline-none border-b-2",
                          selected
                            ? "border-lucuma text-blue-dark"
                            : "border-transparent hover:border-lucuma text-category-sky-blue-50",
                          view?.alignTitle !== "Centrado"
                            ? "p-3"
                            : "max-w-[190px] xl:max-w-[220px] shrink-0 grow p-5"
                        )
                      }
                    >
                      <span className={classNames(view?.alignTitle === "Izquierda" && "whitespace-nowrap")}>
                        {tab.promoTitle ?? tab.title ?? tab.name}
                      </span>
                    </Tab>
                  )
                ))}
              </Tab.List>
            </div>
          </div>

          <div className="relative tabs-styles">
            <Tab.Panels as={Fragment}>
              {featuredContentsCollection.items.map((collection) => {
                return !isCustomLink(collection) && (
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
                          {collection.featuredContentsCollection.items.map((item) => {
                            if (item) {
                              return (
                                <div key={item?.name} className="grid">
                                  <ListWithIcons {...item} />
                                </div>
                              );
                            }
                          })}
                        </div>
                      )}
                    </Transition>
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </div>
        </Tab.Group>
      )}
      {footerText && (
        <div className="text-neutral-30 text-size-p2 richtext-container">
          {documentToReactComponents(footerText.json)}
        </div>
      )}
    </section>
  );
};

export default FeaturedTabsBlock;
