import { Disclosure, Tab, Transition } from "@headlessui/react";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from "@/utils/functions";
import VerticalCard from "@/components/organisms/cards/vertical-card/VerticalCard";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { createRef, useMemo, useState } from "react";

const VerticalTabsBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  featuredContentsCollection,
  blockId,
  sysId,
}) => {

  const [tabIndex, setTabIndex] = useState(0);
  const updateTabIndex = (evt) => {
    setTabIndex(evt);
    const el: HTMLElement = document.querySelector('[data-id=' + `accordion-${evt}` + ']');
    el.click();
  };
  const refs = useMemo(() => {
    return (
      featuredContentsCollection.items.map(() => {
        return createRef<HTMLButtonElement>();
      }) ?? []
    );
  }, [featuredContentsCollection.items]);

  const handleClosingOthers = (id: string) => {
    const otherRefs = refs.filter((ref) => {
      return ref.current?.getAttribute("data-id") !== id;
    });

    otherRefs.forEach((ref) => {
      const isOpen = ref.current?.getAttribute("data-open") === "true";
      if (isOpen) {
        ref.current?.click();
        return; // avoid double sync with Desktop tabs
      }
    });
    // Sync Desktop tabs and mobile accordion
    const getTab = id.split("-");
    setTabIndex(parseInt(getTab[1]));
    // *******************************
  };

  return (
    <section id={blockId ? blockId : sysId} className="grid px-0 section gap-7 md:gap-9 md:px-8">
      {title && <h2 className="text-center text-blue-dark">{title}</h2>}
      {description && <div className="text-blue-dark text-size-p1">{documentToReactComponents(description.json)}</div>}

      {featuredContentsCollection?.items?.length > 0 && (
        <Tab.Group
          vertical
          as="div"
          className="hidden gap-12 px-6 lg:flex"
          selectedIndex={tabIndex}
          onChange={updateTabIndex}
        >
          <Tab.List className="flex flex-col gap-y-3 rounded-xl w-[296px] shrink-0">
            {featuredContentsCollection.items.map((tab, idx) => (
              <Tab
                key={`tab-${idx}`}
                className={
                  ({ selected }) => (
                    classNames(
                      'w-full rounded-xl py-3 px-6 text-left text-size-subtitle1 font-bold shadow-[-2px_-2px_0px_rgba(0,0,0,0.04),2px_2px_4px_rgba(0,0,0,0.08)]',
                      selected ? 'bg-blue-dark text-white' : 'text-blue-dark hover:bg-blue-dark hover:text-white'
                    )
                  )
                }
              >
                {tab?.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="grow">
            {featuredContentsCollection.items.map((tab) =>
              <Tab.Panel className="flex flex-col gap-6" key={tab?.promoTitle}>
                <h3 className="flex text-blue-dark">{tab?.name}</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                  {tab.featuredContentsCollection.items.map((card) => (
                    <VerticalCard key={card.name} {...{ ...card, ...{ alignButton: "Izquierda" } }} />
                  ))}
                </div>
              </Tab.Panel>
            )}
          </Tab.Panels>
        </Tab.Group>
      )}

      {/* Mobile */}
      {featuredContentsCollection?.items?.length > 0 && (
        <div className="flex flex-col w-full px-4 pt-16 lg:hidden">
          {featuredContentsCollection.items.map((tab, idx) => (
            <Disclosure
              as="div"
              className="w-full p-2 mx-auto bg-white rounded-2xl"
              key={`accordion-${idx}`}
            >
              {({ open }) => (
                <div>
                  <div className="text-lg">
                    <Disclosure.Button
                      ref={refs[idx]}
                      data-id={`accordion-${idx}`}
                      data-open={open}
                      onClick={() => handleClosingOthers(`accordion-${idx}`)}
                      className={classNames(
                        "flex justify-between items-center w-full py-3 px-6 text-left text-size-subtitle1 font-bold shadow-[-2px_-2px_0px_rgba(0,0,0,0.04),2px_2px_4px_rgba(0,0,0,0.08)]",
                        open ? "bg-blue-dark text-white rounded-t-xl" : "text-blue-dark bg-white rounded-xl"
                      )}
                    >
                      <div className="flex">
                        <h3 className={classNames(
                          'text-size-subtitle1',
                          open ? 'text-white' : 'text-blue-dark'
                        )}
                        >
                          {tab?.name}
                        </h3>
                      </div>
                      <span className="flex items-center justify-center w-8 h-full">
                        <ChevronDownIcon
                          className={classNames(
                            "flex w-8 h-auto transform",
                            open ? "-rotate-180 text-white" : "rotate-0 text-blue-dark"
                          )}
                          aria-hidden="true"
                          width={10}
                          height={5}
                        />
                      </span>
                    </Disclosure.Button>
                  </div>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel as="div" className={classNames(
                      'p-3 rounded-b-[10px] flex justify-center',
                      open ? 'bg-neutral-90' : ''
                    )}
                    >
                      <div className="grid lg:grid-cols-2 gap-y-3">
                        {tab.featuredContentsCollection.items.map((card) => (
                          <VerticalCard key={card.name} {...{ ...card, ...{ alignButton: "Izquierda" } }} />
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      )}
    </section>
  );
};

export default VerticalTabsBlock;
