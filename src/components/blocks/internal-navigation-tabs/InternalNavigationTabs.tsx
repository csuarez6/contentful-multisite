import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Tab, Transition } from "@headlessui/react";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from "@/utils/functions";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const TabElement = (tab) => {
  const { promoIcon, promoImage, image, promoTitle, name, display } = tab;
  return (
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
};

const filterHeading = (objData) => {
  const filterObj = objData.filter((item) => item.nodeType == "heading-2");
  return filterObj;
};

const InternalNavigationTabsBlock: React.FC<IPromoBlock> = ({
  title,
  featuredContentsCollection,
  view,
  blockId,
  sysId,
}) => {
  const { asPath } = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const updateTabIndex = (evt) => setTabIndex(evt);

  return (
    <section id={blockId ? blockId : sysId} className="grid section gap-9">
      {title && <h2 className="text-blue-dark">{title}</h2>}
      {featuredContentsCollection?.items?.length > 0 && (
        <Tab.Group as="div" className="grid mt-4" selectedIndex={tabIndex} onChange={updateTabIndex}>
          <div className="flex justify-start overflow-x-auto md:justify-center custom-scrollbar">
            <div className="flex border-b border-transparent">
              <Tab.List className="flex gap-[30px]">
                {featuredContentsCollection.items.map((tab) =>
                  tab?.internalLink?.urlPath || tab?.externalLink ? (
                    <CustomLink
                      content={tab}
                      linkClassName="flex"
                      className={classNames(
                        "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none hover:border-lucuma border-b-2 py-[10px] text-center",
                        (tab?.promoImage || tab?.image || (tab?.promoIcon && view?.tabDisplay === "Icono")) ? "justify-start" : "justify-center",
                        (asPath === tab?.internalLink?.urlPath || asPath === tab?.externalLink) ? "border-lucuma" : "border-transparent"
                      )}
                      key={tab?.name}
                    >
                      {<TabElement {...tab} display={view?.tabDisplay} />}
                    </CustomLink>
                  ) : (
                    <Tab
                      key={tab?.name}
                      className={({ selected }) =>
                        classNames(
                          (tab?.promoImage || tab?.image || (tab?.promoIcon && view?.tabDisplay === "Icono")) ? "justify-start" : "justify-center",
                          selected
                            ? "border-lucuma"
                            : "border-transparent hover:border-lucuma",
                          "flex flex-col items-center text-blue-dark gap-[10px] w-[176px] shrink-0 grow focus:outline-none border-b-2 px-2 py-[10px]"
                        )
                      }
                    >
                      {<TabElement {...tab} display={view.tabDisplay} />}
                    </Tab>
                  )
                )}
              </Tab.List>
            </div>
          </div>
          <Tab.Panels as={Fragment}>
            {featuredContentsCollection.items.map(
              (tab, idx) =>
                !tab?.internalLink &&
                !tab?.externalLink && (
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
                      <div key={tab?.name} className="flex justify-center gap-16">
                        <div className="w-[764px]">
                          {documentToReactComponents(tab?.content.json)}
                        </div>
                        {/* ******** */}
                        <div className="w-[277px] min-h-[357px] flex flex-col gap-3">
                          <p className="font-semibold text-blue-dark">En esta página:</p>
                          <div className="flex flex-col gap-3">
                            {filterHeading(tab?.content.json.content).map((item, idxTab) =>
                              <div
                                key={idxTab}
                                className={classNames(
                                  (idxTab + 1 == 1) ? "border-blue-dark" : "",
                                  "flex items-center justify-between px-6 py-3 border rounded-xl shadow-[-2px_-2px_0px_rgba(0,0,0,0.04),2px_2px_4px_rgba(0,0,0,0.08)]"
                                )}
                              >
                                <p className="text-blue-dark max-w-[164px] font-bold text-base leading-5">{idxTab + 1}. {item.content[0].value}</p>
                                <span className="flex text-neutral-30 items-center shrink-0 w-[34px] h-[34px]">
                                  {(idxTab + 1 == 1) ?
                                    <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="17.5" cy="17" r="14" fill="#113455" />
                                      <path d="M13.2768 17.1231H11.2098C10.445 17.1231 9.96331 17.9467 10.3383 18.6133L13.644 24.4903C13.8212 24.8051 14.1543 25 14.5156 25H18.1864C18.5905 25 18.9549 24.7568 19.1099 24.3836L24.9253 10.3836C25.1988 9.72505 24.7149 9 24.0018 9H21.2489C20.8425 9 20.4766 9.24589 20.323 9.6221L16.5477 18.8715C16.2137 19.6899 15.06 19.7042 14.7057 18.8944L14.1929 17.7223C14.0337 17.3583 13.6741 17.1231 13.2768 17.1231Z" fill="white" stroke="#F6F8F9" stroke-width="0.5" />
                                      <circle cx="17.5" cy="17" r="16.75" stroke="#113455" stroke-width="0.5" />
                                    </svg>
                                    :
                                    <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="17.5" cy="17" r="16.75" stroke="#113455" stroke-width="0.5" />
                                    </svg>
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </Tab.Panel>
                )
            )}
          </Tab.Panels>

        </Tab.Group>
      )}
    </section>
  );
};

export default InternalNavigationTabsBlock;
