import { Fragment } from "react";
import { Tab, Transition } from "@headlessui/react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames } from "@/utils/functions";
import { IPromoBlock, IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Image from "next/image";
import Icon from "@/components/atoms/icon/Icon";
import defaultFormatOptions from "@/lib/richtext/default.formatter";

const TabsWithFeaturedImageBlock: React.FC<IPromoBlock> = ({ title, description, image, featuredContentsCollection, footerText, blockId, sysId }) => {
  return (
    <section id={blockId ?? sysId} className="grid section gap-7 md:gap-9">
      <div className="flex flex-col">
        <hr className="min-w-[100vw] -mx-[50vw] border-t-2 pb-6 border-[#F3F3F3] hidden 2md:block" />
        <div className="flex flex-col 2md:flex-row items-start gap-6 lg:gap-[62px] 2md:mb-6">
          {(title || description || featuredContentsCollection?.items?.length > 0) && (
            <div className="grid gap-6 grow w-full 2md:w-1/2 2md:py-6">
              {(title || description) && (
                <div className="grid gap-6">
                  {title && <h2 className="text-blue-dark 2md:text-category-sky-blue-50 text-center 2md:text-left text-size-subtitle1 2md:text-[43px] leading-[1.3] font-bold">{title}</h2>}
                  {description && <div className="text-neutral-30">{documentToReactComponents(description?.json)}</div>}
                </div>
              )}
              {featuredContentsCollection?.items?.length > 0 && (
                <Tab.Group as="div" className="grid items-baseline px-3 2md:p-0 gap-6 2md:gap-12">
                  <div className="flex overflow-x-auto">
                    <div className="flex 2md:border-b border-transparent max-2md:mx-auto">
                      <Tab.List className="flex">
                        {featuredContentsCollection.items.map((tab: IPromoContent) =>
                          <Tab
                            key={tab.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-lucuma text-blue-dark"
                                  : "border-neutral-80 hover:border-lucuma text-category-sky-blue-50",
                                "flex flex-col items-center gap-4 shrink-0 grow focus:outline-none 2md:border-b-2 p-4 max-w-[92px]"
                              )
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span className={
                                  classNames(
                                    selected ? "bg-lucuma" : "bg-blue-dark-90",
                                    "flow-root shrink-0 w-[50px] h-[50px] p-2 rounded-full text-neutral-30 transition-colors duration-500",
                                  )}
                                >
                                  <Icon icon={tab.promoIcon} className="w-full h-full mx-auto" />
                                </span>
                                <span className="text-size-small text-grey-30">{tab.promoTitle ?? tab.name}</span>
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
                          <div className="flex flex-col gap-4">
                            <h3 className="text-category-sky-blue-50 2md:text-blue-dark text-size-subtitle2 2md:text-2xl 2md:leading-7">{content.subtitle ?? (content.promoTitle ?? content.name)}</h3>
                            {image?.url && (
                              <div className="flex 2md:hidden w-full">
                                <figure className="relative rounded-xl w-full aspect-[304/124] overflow-hidden">
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
                            <div className="richtext-container text-grey-30 text-size-p3 2md:text-size-p1">
                              {documentToReactComponents(content.promoDescription?.json, defaultFormatOptions)}
                            </div>
                          </div>
                        </Transition>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              )}
            </div>
          )}

          {image?.url && (
            <div className="hidden 2md:flex w-1/2 lg:w-[494px] shrink-0 grow">
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
        {footerText && (
          <div className="text-neutral-30 text-size-p2 richtext-container">
            {documentToReactComponents(footerText.json)}
          </div>
        )}
      </div>
    </section>
  );
};

export default TabsWithFeaturedImageBlock;
