import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames } from "@/utils/functions";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import ProductSmallCard from '@/components/organisms/cards/product-small-card/ProductSmallCard';

const ProductFinancingBlock: React.FC<IPromoBlock> = ({ title, description, featuredContentsCollection, listedContentsCollection, blockId, sysId }) => {
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
      name: "Catálogo Vanti Listo"
    });
  }

  return (
    <section id={blockId? blockId: sysId} className="section grid gap-9">
      {(title || description) &&
        <div className="grid text-center gap-6">
          {title && <h2 className="text-blue-dark">{title}</h2>}
          {description && <div className="text-neutral-30">{documentToReactComponents(description.json)}</div>}
        </div>
      }

      <Tab.Group as="div" className="grid gap-6">
        <div className="flex justify-center overflow-x-auto">
          <div className="flex border-b border-transparent">
            <Tab.List className="flex gap-[10px]">
              {productTabs?.map((tab) =>
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-lucuma text-blue-dark"
                        : "border-transparent hover:border-lucuma text-category-sky-blue-50",
                      "flex flex-col items-center title is-3 gap-[10px] shrink-0 grow focus:outline-none border-b-2 p-5"
                    )
                  }
                >
                  <p>{tab.name}</p>
                </Tab>
              )}
            </Tab.List>
          </div>
        </div>

        <Tab.Panels as={Fragment}>
          {productTabs?.map((tab) => (
            <Tab.Panel key={tab.name} className="focus:outline-none">
              <div className="grid grid-cols-3 gap-5 grid-rows-3">
                {(tab.id === "Gasodomesticos") && (
                  featuredContentsCollection?.items?.slice(0, 7).map((item, idx) => {
                    if (idx === 0) item.promoImage.isPortrait = true;
                    return (
                      <div key={item.name} className={idx === 0 ? "row-span-3" : "row-span-1"}>
                        <ProductSmallCard {...item} />
                      </div>
                    );
                  })
                )}
                {(tab.id === "VantiListo") && (
                  listedContentsCollection?.items?.slice(0, 7).map((item, idx) => {
                    if (idx === 0) item.promoImage.isPortrait = true;
                    return (
                      <div key={item.name} className={idx === 0 ? "row-span-3" : "row-span-1"}>
                        <ProductSmallCard {...item} />
                      </div>
                    );
                  })
                )}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

export default ProductFinancingBlock;
