import { useRouter } from "next/router";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { classNames } from "@/utils/functions";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import Icon from "@/components/atoms/icon/Icon";
import MegaMenu from "@/components/organisms/mega-menu/MegaMenu";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { HOME_SLUG } from "@/constants/url-paths.constants";
import MegaMenuMobile from "@/components/organisms/mega-menu-mobile/MegaMenuMobile";

const HeaderBlock: React.FC<INavigation> = ({
  promoImage,
  mainNavCollection,
  secondaryNavCollection,
  utilityNavCollection,
  menuNavkey = null,
  overrideNavCollection = null,
}) => {
  console.log(mainNavCollection);



  const { asPath } = useRouter();
  let firstPath = asPath.split('/')[1];
  if (menuNavkey === null) {
    menuNavkey = HOME_SLUG;
    firstPath = 'home';
  }

  let mainNavCollectionMenu = mainNavCollection?.items.find(
    (el) => el.slug === menuNavkey
  )?.mainNavCollection;


  if (!mainNavCollectionMenu?.items?.length) {
    mainNavCollectionMenu = mainNavCollection?.items.find(
      (el) => el.slug === HOME_SLUG
    ).mainNavCollection;
  }

  if (overrideNavCollection?.items?.length) {
    mainNavCollectionMenu = overrideNavCollection;
  }

  if (!mainNavCollection?.items?.some((el) => el.slug === firstPath) && !secondaryNavCollection?.items?.some((el) => el.slug === firstPath)) {
    firstPath = 'home';
    mainNavCollectionMenu = mainNavCollection?.items.find(
      (el) => el.slug === HOME_SLUG
    ).mainNavCollection;
  }

  return (
    <header id="header" className="sticky inset-x-0 top-0 z-50 bg-white shadow">
      {/* Top */}
      <div className="relative hidden lg:block">
        <div className="bg-blue-dark absolute h-full inset-x-0"></div>
        <div className="mx-auto xl:container">
          <div className="px-2 sm:px-4 2xl:px-[70px]">
            <nav
              aria-label="Menú principal"
              className="relative flex justify-between gap-14 xl:gap-[76px] min-h-[42px] h-full"
            >
              <ul className="relative flex gap-6 flex-nowrap grow">
                {mainNavCollection?.items?.map((item, index) =>
                  <li className="flex items-center" key={item.sys.id}>
                    <CustomLink
                      className={classNames(
                        item.slug === firstPath
                          ? "text-lucuma border-lucuma"
                          : "text-white border-transparent",
                        "inline-block hover:text-lucuma pt-2 pb-3 text-xl font-semibold leading-none border-b-2"
                      )}
                      content={item}
                      aria-current={index === 0 ? "page" : undefined}
                    >
                      {item.promoTitle ?? item.name}
                    </CustomLink>
                  </li>
                )}
              </ul>

              <ul className="relative flex gap-6 flex-nowrap">
                {secondaryNavCollection?.items?.map((item, index) => (
                  <li className="flex items-center" key={item.sys.id}>
                    <CustomLink
                      className={classNames(
                        item.slug === firstPath
                          ? "text-lucuma border-lucuma"
                          : "text-white border-transparent",
                        "inline-block hover:text-lucuma pt-2 pb-3 text-xl font-semibold leading-none border-b-2"
                      )}
                      content={item}
                      aria-current={index === 0 ? "page" : undefined}
                    >
                      {item.promoTitle ?? item.name}
                    </CustomLink>
                  </li>
                ))}
              </ul>

              <div className="bg-category-orange-light justify-self-end flex items-center rounded-tl-xl px-[10px] py-[5px] -mr-4">
                <p className="flex items-center gap-1 title is-5 text-blue-dark flex-nowrap">
                  <span className="w-8 h-8 shrink-0">
                    <Icon
                      icon="emergency"
                      className="w-full h-full mx-auto"
                    />
                  </span>
                  Emergencias: 164
                </p>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="relative">
        <div className="mx-auto xl:container">
          <div className="px-2 sm:px-4 2xl:px-[70px]">
            <div className="relative flex items-center p-3 md:p-0 md:min-h-[92px] justify-between gap-2 xxs:gap-3 xs:gap-4 md:gap-6">
              <div className="relative z-10 flex md:px-2 lg:px-0 lg:mt-[10px]">
                <CustomLink
                  content={{ urlPath: "/" }}
                  className="flex items-center flex-shrink-0"
                >
                <figure className="relative aspect-square h-10 sm:h-[52px] sm:aspect-[180/52]">
                  <Image
                    className="w-auto block sm:hidden"
                    src={"/images/vanti-icon.png"}
                    alt={promoImage?.description ?? "Grupo Vanti"}
                    fill
                  />
                  <Image
                    className="w-auto hidden sm:block"
                    src={promoImage?.url ?? "/images/vanti-logo.png"}
                    alt={promoImage?.description ?? "Grupo Vanti"}
                    fill
                  />
                </figure>
                </CustomLink>
              </div>

              <div className="flex items-center md:py-5 divide-x divide-neutral-70 flex-grow">
                <form action="#" method="post" className="h-10 w-full lg:max-w-xs lg:pr-6">
                  <div className="bg-category-blue-light-90 text-[#868DA5] rounded-lg flex flex-nowrap gap-2 p-2 pl-3">
                    <label htmlFor="search" className="flex items-center">
                      <span className="flex items-center w-6 h-6 shrink-0">
                        <Icon icon="search" className="w-full h-full mx-auto" />
                      </span>
                    </label>
                    <input
                      id="search"
                      type="text"
                      placeholder="Buscar"
                      className="bg-transparent focus:outline-none text-[#616B8A] text-lg font-medium w-full"
                      autoComplete="off"
                    />
                  </div>
                </form>
                {utilityNavCollection?.items?.length > 0 && (
                  <nav
                    aria-label="Utility"
                    className="relative hidden px-6 lg:block"
                  >
                    <ul className="flex gap-1 flex-nowrap">
                      {utilityNavCollection.items.map((item) => (
                        <li className="flex max-w-[75px]" key={item.sys.id}>
                          <CustomLink
                            content={item}
                            className={classNames(
                              "bg-white text-blue-dark hover:bg-category-blue-light-90 rounded-[10px] flex flex-col items-center text-xs leading-none text-center font-light gap-0.5 px-2 py-1",
                              item.promoIcon
                                ? "justify-start"
                                : "justify-center"
                            )}
                          >
                            {item.promoIcon && (
                              <span className="flex items-center w-6 h-6 shrink-0 text-neutral-30">
                                <Icon
                                  icon={item.promoIcon}
                                  className="w-full h-full mx-auto"
                                />
                              </span>
                            )}
                            {item.promoTitle ?? item.name}
                          </CustomLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <div className="hidden gap-6 px-6 lg:flex">
                  <CustomLink
                    content={{ urlPath: "/registro" }}
                    className="flex items-center text-center button button-primary"
                  >
                    Regístrate
                  </CustomLink>
                  <CustomLink
                    content={{ urlPath: "/acceso" }}
                    className="flex items-center text-center button button-outline"
                  >
                    Inicia sesión
                  </CustomLink>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                <span className="block w-10 h-10 shrink-0 bg-category-orange-light text-blue-dark rounded-full">
                  <Icon
                    icon="emergency"
                    className="w-full h-full mx-auto"
                  />
                </span>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                <Popover className="relative lg:hidden">
                  <Popover.Button className="inline-flex items-center justify-center p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="block w-8 h-8" aria-hidden="true" />
                  </Popover.Button>
                  <Transition
                    className="fixed inset-0 bg-white p-4"
                    enter="transition duration-300 ease-out"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition duration-300 ease-out"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <CustomLink
                          content={{ urlPath: "/" }}
                          className="flex items-center flex-shrink-0"
                        >
                          <figure className="relative h-[45px] aspect-[180/52]">
                            <Image
                              className="block w-auto"
                              src={promoImage?.url ?? "/images/vanti-logo.png"}
                              alt={promoImage?.description ?? "Grupo Vanti"}
                              fill
                            />
                          </figure>
                        </CustomLink>
                        <Popover.Button className="inline-flex items-center text-gray-400">
                          <span className="sr-only">Open menu</span>
                          <XMarkIcon className="block w-4 h-4" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                      <MegaMenuMobile items={mainNavCollection?.items} />
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
            {utilityNavCollection?.items?.length > 0 && (
              <Popover className="relative lg:hidden -mx-2">
                {({ open }) => (
                  <>
                    <Popover.Button className="text-center text-blue-dark underline block w-full p-4">
                      ¿Qué quieres hacer hoy?
                      <span>
                        <Icon
                          icon="arrow-down"
                          className={classNames(open ? "rotate-180" : "rotate-0", "w-7 h-7 transition-all")}
                          aria-hidden="true"
                        />
                      </span>
                    </Popover.Button>
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform opacity-0 -translate-y-4"
                      enterTo="transform opacity-100 translate-y-0"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform opacity-100 translate-y-0"
                      leaveTo="transform opacity-0 -translate-y-4"
                    >
                      <Popover.Panel className="absolute w-full top-full left-0 bg-white">
                        <nav
                          aria-label="Utility"
                          className="relative p-5"
                        >
                          <ul className="flex gap-1 flex-nowrap justify-center ">
                            {utilityNavCollection.items.map((item) => (
                              <li className="flex max-w-[75px]" key={item.sys.id}>
                                <CustomLink
                                  content={item}
                                  className={classNames(
                                    "bg-white text-blue-dark hover:bg-category-blue-light-90 rounded-[10px] flex flex-col items-center text-xs leading-none text-center font-light gap-0.5 px-2 py-1",
                                    item.promoIcon
                                      ? "justify-start"
                                      : "justify-center"
                                  )}
                                >
                                  {item.promoIcon && (
                                    <span className="flex items-center w-6 h-6 shrink-0 text-neutral-30">
                                      <Icon
                                        icon={item.promoIcon}
                                        className="w-full h-full mx-auto"
                                      />
                                    </span>
                                  )}
                                  {item.promoTitle ?? item.name}
                                </CustomLink>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            )}
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="relative bg-grey-90">
        <div className="mx-auto xl:container">
          <div className="px-2 sm:px-4 2xl:px-[70px]">
            {mainNavCollectionMenu?.items?.length > 0 && (
              <MegaMenu mainNavCollection={mainNavCollectionMenu} secondaryNavCollection={secondaryNavCollection}/>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBlock;