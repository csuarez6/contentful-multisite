import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames } from "@/utils/functions";
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Image from "next/image";
import Icon from "@/components/atoms/icon/Icon";

const TabsWithFeaturedImageBlock: React.FC<IPromoBlock> = ({ title, subtitle, description, image, featuredContentsCollection, blockId, sysId }) => {
  return (
    <section id={blockId ? blockId : sysId} className="grid section gap-7 md:gap-9">
      {title && <h1 className="text-center text-blue-dark mb-[-30px]">{title}</h1>}
      <div className="flex flex-col md:flex-row items-start gap-[62px] py-[72px] border-y-2 border-x-grey-80">
        {(subtitle || description || featuredContentsCollection?.items?.length > 0) && (
          <div className="grid gap-6 grow w-full md:w-[661px]">
            {(subtitle || description) && (
              <div className="grid gap-6">
                {title && <h2 className="text-category-sky-blue-50">{subtitle}</h2>}
                {description && <div className="text-neutral-30">{documentToReactComponents(description?.json)}</div>}
              </div>
            )}
            {featuredContentsCollection?.items?.length > 0 && (
              <Tab.Group as="div" className="grid items-baseline gap-12">
                <div className="flex justify-start overflow-x-auto">
                  <div className="flex border-b border-transparent">
                    <Tab.List className="flex">
                      {featuredContentsCollection.items.map((tab: IPromoContent) =>
                        <Tab
                          key={tab.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-lucuma text-blue-dark"
                                : "border-transparent border-neutral-80 text-category-sky-blue-50",
                              "flex flex-col items-center gap-4 shrink-0 grow focus:outline-none border-b-2 p-4 max-w-[92px]"
                            )
                          }
                        >
                          {({ selected }) => (
                            <>
                              <div className={
                                classNames(
                                  selected ? "bg-lucuma" : "bg-blue-dark-90",
                                  "flow-root shrink-0 w-[50px] h-[50px] p-2 rounded-full text-neutral-30",
                                )}
                              >
                                <Icon icon={tab.promoIcon} className="w-full h-full mx-auto" />
                              </div>
                              <p className="text-size-small text-grey-30">{tab.promoTitle ?? tab.name}</p>
                            </>
                          )}
                        </Tab>
                      )}
                    </Tab.List>
                  </div>
                </div>

                <Tab.Panels as={Fragment}>
                  {featuredContentsCollection.items.map((content: IPromoContent) => (
                    <Tab.Panel key={content.promoTitle} className="focus:outline-none">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-blue-dark">{content.subtitle ?? (content.promoTitle ?? content.name)}</h3>
                        <div className="text-grey-30">
                          {documentToReactComponents(content.promoDescription?.json)}
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            )}
          </div>
        )}

        {image?.url && (
          <div className="flex w-full md:w-[494px]">
            <figure className="relative rounded-xl w-full aspect-[494/500] overflow-hidden">
              <Image
                src={image?.url}
                alt={image.title ?? (image.description ?? "Imagen destacada")}
                width={494}
                height={500}
                className="object-cover w-full h-full"
              />
            </figure>
          </div>
        )}
      </div>
    </section>
  );
};

export default TabsWithFeaturedImageBlock;
