import React from 'react';
import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import CookieModal from '@/components/organisms/cookie-modal/CookieModal';
import { useRouter } from 'next/router';
import { MARKETPLACE_SLUG } from '@/constants/url-paths.constants';

const FooterBlock: React.FC<INavigation> = ({
  name,
  promoTitle,
  mainText,
  secondaryText,
  promoImage,
  mainNavCollection,
  secondaryNavCollection,
  cookieInfo
}) => {
  const [activeDisclosurePanel, setActiveDisclosurePanel] = React.useState(null);

  const togglePanels = (newPanel) => {
    if (activeDisclosurePanel) {
      if (activeDisclosurePanel.key !== newPanel.key && activeDisclosurePanel.open) {
        activeDisclosurePanel.close();
      }
    }
    setActiveDisclosurePanel({
      ...newPanel,
      open: !newPanel.open
    });
  };

  const { asPath } = useRouter();
  const firstPath = asPath.split("/")?.[1];
  
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
        <div className="pb-[25px] pt-6 px-2 sm:px-4 lg:px-8 2xl:px-[70px] lg:pt-10 lg:pb-[62px]">
          <div className="xl:flex-row md:gap-x-32 pb-3 items-center flex flex-col md:items-start">

            {/* Desktop  Navigation*/}
            <div className="xl:!max-w-xs pt-0.5 hidden md:block">
              <p className="title is-1 text-white">{promoTitle}</p>
            </div>
            <div className="hidden pt-12 md:grid md:grow xl:pt-0 md:w-full">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
                {mainNavCollection?.items?.map((menuItem, i) => (
                  <div key={menuItem.sys.id + i}>
                    <h3 className="text-white">
                      {menuItem.promoTitle ?? menuItem.name}
                    </h3>
                    {menuItem?.mainNavCollection?.items?.length > 0 && (
                      <ul className="pt-[10px] space-y-3">
                        {menuItem.mainNavCollection.items.map((listItem, j) => (
                          <li key={listItem.sys.id + i + j}>
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
              <ul className="hidden md:flex flex-wrap justify-center pt-4 pb-2 gap-2 md:gap-16 xl:justify-start relative xl:-left-3">
                {secondaryNavCollection?.items?.map((item, i) => (
                  <li key={item.sys.id + i}>
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
            </div>

            {/* Mobile navigation */}
            <div className="xl:max-w-xs pt-0.5 max-w-[225px] md:max-w-none md:hidden">
              <p className="text-white title is-1 !text-lg text-center !leading-5">{promoTitle}</p>
            </div>
            <div className="md:hidden border-b-[0.5px] border-white border-opacity-75 mt-[33px] w-[105%]">
              {mainNavCollection?.items?.map((menuItem, i) => (
                <Disclosure as="div" className='border-t-[0.5px] border-white border-opacity-75' key={menuItem.sys.id + i}>
                  {(panel) => {
                    const { open, close } = panel;
                    return (
                      <>
                        <div className="text-lg cursor-pointer">
                          <Disclosure.Button
                            as="div"
                            role="button"
                            className={`flex w-full items-center justify-between pl-4 pr-2 text-left text-gray-400 pt-[8px] mb-[8px]`}
                            onClick={() => {
                              if (!open) close();
                              togglePanels({ ...panel, key: i });
                            }}
                            data-testid={`accordion-button-${menuItem.name}`}
                          >
                            <div className="flex">
                              <h3 className="text-white text-sm">
                                {menuItem.promoTitle ?? menuItem.name}
                              </h3>
                            </div>
                            <span className={`flow-root shrink-0 w-7 h-7 mr-[6px]`}>
                              <Icon icon={open ? 'substract' : 'add'} className="text-white relative top-[-2px]" size={26} />
                            </span>
                          </Disclosure.Button>
                        </div>
                        <Transition
                          className="overflow-hidden"
                          enter='transition transition-[max-height] duration-300 ease-in'
                          enterFrom='transform max-h-0 opacity-0'
                          enterTo='transform max-h-screen opacity-100'
                          leave='transition transition-[max-height] duration-300 ease-out'
                          leaveFrom='transform max-h-screen opacity-100'
                          leaveTo='transform max-h-0 opacity-0'
                        >
                          <Disclosure.Panel as="dd" className='w-[105%] bg-navegation'>
                            {menuItem?.mainNavCollection?.items?.length > 0 && (
                              <ul className="border-t-[0.5px] border-white border-opacity-75 pl-[10px] pr-[30px]">
                                {menuItem.mainNavCollection.items.map((listItem, j) => (
                                  <li key={listItem.sys.id + i + j} className="py-2">
                                    <CustomLink
                                      content={listItem}
                                      className="text-sm text-white hover:underline"
                                    >
                                      {listItem.promoTitle ?? listItem.name}
                                    </CustomLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    );
                  }}
                </Disclosure>
              ))}
            </div>

          </div>
          <ul className="flex flex-wrap justify-center pt-4 pb-2 gap-2 md:gap-16 xl:justify-start relative md:hidden">
            {secondaryNavCollection?.items?.map((item, i) => (
              <li key={item.sys.id + i}>
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
          <div className="pt-[17px] md:pt-10 flex flex-col sm:flex-row justify-between gap-[30px] items-center md:items-start">
            <div className="text-sm md:text-size-p2 text-white text-center md:text-start leading-none">
              {documentToReactComponents(firstPath == MARKETPLACE_SLUG ? secondaryText?.json : mainText?.json)}
            </div>
            {(promoImage && firstPath == MARKETPLACE_SLUG) && (
              <a className="w-[248px] md:mb-24 md:w-[311px] shrink-0 -mr-[7px]" href='https://www.sic.gov.co/' target='_blank' title='Superintendencia de Industria y Comercio' rel="noreferrer">
                <figure className="relative w-full">
                  <Image
                    src={promoImage.url}
                    alt={promoImage.title}
                    width={promoImage.width}
                    height={promoImage.height}
                    className="w-full h-auto"
                  />
                </figure>
              </a>
            )}
          </div>
        </div>
      </div>
      <CookieModal {...cookieInfo} />
    </footer>
  );
};

export default FooterBlock;
