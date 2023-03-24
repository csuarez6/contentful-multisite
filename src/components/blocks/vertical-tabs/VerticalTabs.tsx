import { Tab } from "@headlessui/react";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { classNames } from "@/utils/functions";
import VerticalCard from "@/components/organisms/cards/vertical-card/VerticalCard";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const VerticalTabsBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  featuredContentsCollection,
  blockId,
  sysId,
}) => {
  return (
    <section id={blockId ? blockId : sysId} className="grid section gap-7 md:gap-9 px-0 md:px-8">
      {title && <h2 className="text-center text-blue-dark">{title}</h2>}
      {description && <div className="text-blue-dark text-size-p1">{documentToReactComponents(description.json)}</div>}

      {featuredContentsCollection?.items?.length > 0 && (
        <Tab.Group vertical as="div" className="flex gap-12">
          <Tab.List className="flex flex-col gap-y-3 rounded-xl w-[296px] shrink-0">
            {featuredContentsCollection.items.map((tab) => (
              <Tab
                key={tab?.name}
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
    </section>
  );
};

export default VerticalTabsBlock;
