import { Fragment } from "react";
import { Tab, Transition } from "@headlessui/react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames } from "@/utils/functions";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import ProductSmallCard from '@/components/organisms/cards/product-small-card/ProductSmallCard';

const ProductFinancingBlock: React.FC<IPromoBlock> = ({
  title,
  description,
  featuredContentsCollection,
  listedContentsCollection,
  footerText,
  blockId,
  sysId
}) => {
  const productTabs = [];
  if (featuredContentsCollection?.items?.length > 0) {
    productTabs.push({
      id: "Gasodomesticos",
      name: "Gasodomésticos"
    });
  }
  if (listedContentsCollection?.items?.length > 0) {
    productTabs.push({
      id: "VantiListo",
      name: "Tecnología y otros"
    });
  }

  return (
    <section id={blockId ?? sysId} className="section grid gap-7 md:gap-9">
      {(title || description) &&
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-neutral-30">{documentToReactComponents(description.json)}</div>}
        </div>
      }

      <Tab.Group as="div" className="grid gap-6">
        <div className="flex justify-center overflow-x-auto">
          <div className="flex border-b border-transparent">
            <Tab.List className="flex gap-[10px] pb-2 md:pb-0">
              {productTabs?.map((tab) =>
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-lucuma text-blue-dark"
                        : "border-transparent hover:border-lucuma text-category-sky-blue-50",
                      "flex flex-col items-center text-size-subtitle3 md:text-[1.25rem] font-semibold md:font-bold gap-[10px] shrink-0 grow focus:outline-none border-b-2 p-5"
                    )
                  }
                >
                  <span>{tab.name}</span>
                </Tab>
              )}
            </Tab.List>
          </div>
        </div>

        <Tab.Panels as={Fragment}>
          {productTabs?.map((tab) => (
            <Tab.Panel key={tab.name} className="focus:outline-none">
              <Transition
                appear
                show
                enter="transition-opacity ease-in duration-300"
                enterFrom="opacity-50"
                enterTo="opacity-100"
                leave="transition-opacity ease-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="grid md:grid-cols-3 gap-6 md:grid-rows-3">
                  {(tab.id === "Gasodomesticos") && (
                    featuredContentsCollection?.items?.slice(0, 7).map((item, idx) => {
                      if (idx === 0 && item?.promoImage) item.promoImage['isPortrait'] = true;
                      return (
                        <div key={item.name} className={idx === 0 ? "md:row-span-3" : "md:row-span-1"}>
                          <ProductSmallCard {...item} />
                        </div>
                      );
                    })
                  )}
                  {(tab.id === "VantiListo") && (
                    listedContentsCollection?.items?.slice(0, 7).map((item, idx) => {
                      if (idx === 0 && item?.promoImage) item.promoImage['isPortrait'] = true;
                      return (
                        <div key={item.name} className={idx === 0 ? "md:row-span-3" : "row-span-1"}>
                          <ProductSmallCard {...item} />
                        </div>
                      );
                    })
                  )}
                </div>
              </Transition>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {footerText && (
        <div className="text-neutral-30 text-size-p2 richtext-container">
          {documentToReactComponents(footerText.json)}
        </div>
      )}
    </section>
  );
};

export default ProductFinancingBlock;
