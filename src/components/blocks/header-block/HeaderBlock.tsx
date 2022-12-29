import { useRouter } from "next/router";
import Image from "next/image";

import { classNames } from "../../../utils/functions";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import Icon from "@/components/atoms/icon/Icon";

const HeaderBlock: React.FC<INavigation> = (props) => {
  const { asPath } = useRouter();

  console.log(props)
  // console.log(JSON.stringify(props))
  const { promoImage, mainNavCollection, secondaryNavCollection, utilityNavCollection } = props;

  return (
    <Disclosure
      as="header"
      id="header"
      className="sticky inset-x-0 top-0 z-20"
    >
      {({ open }) => (
        <div className="xl:container mx-auto">
          <div className="px-2 sm:px-4 2xl:px-[70px]">
            {/* Top */}
            <div className="relative hidden lg:block">
              <div className="bg-neutral-90 min-w-[100vw] -mx-[50vw] absolute h-full inset-x-0"></div>
              <nav aria-label="Menú principal" className="relative flex justify-between gap-14 xl:gap-[76px] min-h-[42px] h-full">
                <ul className="relative flex flex-nowrap grow gap-6">
                  {mainNavCollection.items.map((item, index) => (
                    <li className="flex items-center" key={item.sys.id}>
                      <a
                        className={classNames(
                          item.slug === asPath
                            ? "text-blue-dark border-lucuma"
                            : "text-neutral-30 border-transparent",
                          "hover:text-blue-dark pt-2 pb-3 text-xl font-semibold leading-none border-b-2"
                        )}
                        href={item.slug ?? '/'}
                        aria-current={index === 0 ? "page" : undefined}
                      >
                        {item.promoTitle ?? item.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <ul className="relative flex flex-nowrap gap-6">
                  {secondaryNavCollection.items.map((item, index) => (
                    <li className="flex items-center" key={item.sys.id}>
                      <a
                        className={classNames(
                          item.slug === asPath
                            ? "text-blue-dark border-lucuma"
                            : "text-neutral-30 border-transparent",
                          "hover:text-blue-dark pt-2 pb-3 text-xl font-semibold leading-none border-b-2"
                        )}
                        href={item.slug ?? '/'}
                        aria-current={index === 0 ? "page" : undefined}
                      >
                        {item.promoTitle ?? item.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#FF8E67] bg-opacity-30 justify-self-end flex items-center px-[10px] py-[5px]">
                  <p className="title is-5 text-blue-dark flex flex-nowrap items-center gap-1">
                    <span className="shrink-0 w-8 h-8">
                      <Icon icon="emergency" className="mx-auto w-full h-full" />
                    </span>
                    Emergencias: 164
                  </p>
                </div>
              </nav>
            </div>
            {/* Middle */}
            <div className="relative flex items-center min-h-[92px] justify-between gap-6">
              <div className="relative z-10 flex px-2 lg:px-0 lg:mt-[10px]">
                <a href="/" className="flex flex-shrink-0 items-center">
                  <figure className="relative h-[52px] aspect-[180/52]">
                    <Image
                      className="block w-auto"
                      src={promoImage?.url ?? "/images/vanti-logo.png"}
                      alt={promoImage?.description ?? 'Grupo Vanti'}
                      fill
                    />
                  </figure>
                </a>
              </div>

              <div className="flex items-center py-5 divide-x divide-neutral-70">
                <form
                  action="#"
                  method="post"
                  className="max-w-xs h-10 pr-6"
                >
                  <div className="bg-category-blue-light-90 text-[#868DA5] rounded-lg flex flex-nowrap gap-2 p-2 pl-3">
                    <label htmlFor="search" className="flex items-center">
                      <span className="flex items-center shrink-0 w-6 h-6">
                        <Icon icon="search" className="mx-auto w-full h-full" />
                      </span>
                    </label>
                    <input
                      id="search"
                      type="text"
                      placeholder="Buscar"
                      className="bg-transparent focus:outline-none text-[#616B8A] text-lg font-medium"
                      autoComplete="off"
                    />
                  </div>
                </form>
                {utilityNavCollection?.items && (
                  <nav aria-label="Utility" className="relative hidden lg:block px-6">
                    <ul className="flex flex-nowrap gap-1">
                      {utilityNavCollection.items.map((item) => (
                        <li className="flex max-w-[75px]" key={item.sys.id}>
                          <a
                            className="bg-white text-blue-dark hover:bg-category-blue-light-90 rounded-[10px] flex flex-col items-center text-xs leading-none text-center font-light gap-0.5 px-2 py-1"
                            href={item.slug ?? '/'}
                          >
                            {item.promoIcon && (
                              <span className="flex items-center shrink-0 w-6 h-6 text-neutral-30">
                                <Icon icon={item.promoIcon} className="mx-auto w-full h-full" />
                              </span>
                            )}
                            {item.promoTitle ?? item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <div className="hidden lg:flex gap-6 px-6">
                  <a href="#" className="button button-primary">Regístrate</a>
                  <a href="#" className="button button-outline">Inicia sesión</a>
                </div>
              </div>

              <div className="relative z-10 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            {/* Bottom */}
            <div className="relative hidden lg:block">
              <nav
                className="flex items-center justify-between py-2 min-h-[60px]"
                aria-label="Global"
              >
                <ul className="flex gap-6 flex-nowrap">
                  {mainNavCollection?.items?.map((item) => (
                    <li key={item.sys.id} className="p-2">
                      <a
                        href={item.externalLink ?? '/'}
                        className="flex gap-1 items-center text-center font-semibold leading-none text-blue-dark border-b border-transparent hover:border-blue-dark"
                      >
                        {item.promoIcon && (
                          <span className="flex items-center shrink-0 w-6 h-6">
                            <Icon icon={item.promoIcon} className="w-full h-full" />
                          </span>
                        )}
                        {item.promoTitle ?? item.name}
                        <span className="flex items-center w-6 h-6 shrink-0">
                          <Icon icon="arrow-down" className="w-full h-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <hr className="min-w-[100vw] -mx-[50vw] border-neutral-80 hidden lg:block" />

          {/* Mobile */}
          <Disclosure.Panel
            as="nav"
            className="lg:hidden"
            aria-label="Menu mobile"
          >
            <ul className="space-y-1 px-2 pt-2 pb-3">
              {mainNavCollection?.items?.map((item, index) => (
                <li key={item.name}>
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      index === 0
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                    aria-current={index === 0 ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </li>
              ))}
              <hr />
              {/* {utility?.map((item, index) => (
                <li key={item.name}>
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      index === 0
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                </li>
              ))} */}
            </ul>
          </Disclosure.Panel>
        </div>
      )
      }
    </Disclosure >
  );
};

export default HeaderBlock;
