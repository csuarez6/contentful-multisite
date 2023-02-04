import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { INavigation } from "@/lib/interfaces/menu-cf.interface";

import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { Disclosure } from "@headlessui/react";


const FooterBlock: React.FC<INavigation> = ({
  name,
  promoTitle,
  secondaryText,
  promoImage,
  mainNavCollection,
  secondaryNavCollection,
}) => {
  return (
    <footer
      id="footer"
      className="md:bg-gradient-blue-dark bg-gradient-footer-mobile overflow-x-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {name ?? "Footer"}
      </h2>
      <div className="xl:container mx-auto">
        <div className="pb-[25px] pt-6 px-2 sm:px-4 lg:px-8 2xl:px-[46px] lg:pt-10 lg:pb-[62px]">
          <div className="xl:flex-row md:gap-x-32 pb-3 items-center flex flex-col md:items-start">

            {/* Desktop  Navigation*/}
            <div className="xl:!max-w-xs pt-0.5 hidden md:block">
              <p className="title is-1 text-white">{promoTitle}</p>
            </div>
            <div className="hidden pt-12 md:grid md:grow xl:pt-0 md:w-full">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
                {mainNavCollection?.items?.map((menuItem) => (
                  <div key={menuItem.sys.id}>
                    <h3 className="text-white">
                      {menuItem.promoTitle ?? menuItem.name}
                    </h3>
                    {menuItem?.mainNavCollection?.items?.length > 0 && (
                      <ul role="list" className="pt-[10px] space-y-3">
                        {menuItem.mainNavCollection.items.map((listItem) => (
                          <li key={listItem.sys.id}>
                            <CustomLink
                              content={listItem}
                              className="text-base text-white hover:underline"
                            >
                              {listItem.promoTitle ?? listItem.name}
                            </CustomLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile navigation */}
            <div className="xl:max-w-xs pt-0.5 max-w-[225px] md:max-w-none md:hidden">
              <p className="text-white  title is-1 !text-lg text-center !leading-5">{promoTitle}</p>
            </div>
            <div className="md:hidden border-b-[0.5px] border-white mt-[33px] w-[105%]">
              {mainNavCollection?.items?.map((menuItem) => (
                <Disclosure as="div" className='border-t-[0.5px] border-white' key={menuItem.sys.id}>
                  {({ open }) => (
                    <div>
                      <dt className="text-lg">
                        <Disclosure.Button
                          className={`flex w-full items-center justify-between pl-4 pr-2 text-left text-gray-400 pt-[8px] mb-[8px]`}>
                          <div className="flex">
                            <h3 className="text-white text-sm">
                              {menuItem.promoTitle ?? menuItem.name}
                            </h3>
                          </div>
                          <span className={`flow-root shrink-0 w-7 h-7 mr-[6px]`}>
                            <Icon icon={open ? 'substract' : 'add'} className="text-white relative top-[-2px]" size={26}/>
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className='w-[105%] bg-white bg-opacity-[.12]'>
                        {menuItem?.mainNavCollection?.items?.length > 0 && (
                          <ul role="list" className="border-t-[0.5px] border-white pl-2 pr-[30px]">
                            {menuItem.mainNavCollection.items.map((listItem) => (
                              <li key={listItem.sys.id} className="py-[7px] px-2">
                                <CustomLink
                                  content={listItem}
                                  className="text-sm text-white hover:underline font-semibold" 
                                >
                                  {listItem.promoTitle ?? listItem.name}
                                </CustomLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>

          </div>
          <ul className="flex flex-wrap justify-center pt-4 pb-2 gap-2 md:gap-16">
            {secondaryNavCollection?.items?.map((item) => (
              <li key={item.sys.id}>
                <CustomLink
                  className="text-white hover:text-neutral-90"
                  content={item}
                >
                  <span className="sr-only">
                    {item.promoTitle ?? item.name}
                  </span>
                  {item.promoIcon && (
                    <Icon
                      icon={item.promoIcon}
                      className="h-[46px] w-[46px] p-[7px]"
                      aria-hidden="true"
                    />
                  )}
                </CustomLink>
              </li>
            ))}
          </ul>
          <hr className="min-w-[100vw] -mx-[50vw] border-t-[0.5px] border-neutral-70 hidden md:block" />
          <div className="pt-[17px] md:pt-10 flex flex-col sm:flex-row justify-between gap-[30px] items-center">
            <div className="text-sm md:text-size-p2 text-white text-center md:text-start leading-none">
              {documentToReactComponents(secondaryText?.json)}
            </div>
            {promoImage && (
              <div className="w-[248px] md:w-[311px] mt-1 shrink-0 -mr-[7px]">
                <figure className="relative w-100">
                  <Image
                    src={promoImage.url}
                    alt={promoImage.description}
                    width={promoImage.width}
                    height={promoImage.height}
                    className="w-full h-auto"
                  />
                </figure>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock;
