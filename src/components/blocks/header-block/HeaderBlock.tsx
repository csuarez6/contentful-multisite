import { useRouter } from "next/router";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { classNames, getBackgroundColorClass } from "@/utils/functions";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import Icon from "@/components/atoms/icon/Icon";
import MegaMenu from "@/components/organisms/mega-menu/MegaMenu";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { HOME_SLUG } from "@/constants/url-paths.constants";
import { signOut, useSession } from "next-auth/react";
import MegaMenuMobile from "@/components/organisms/mega-menu-mobile/MegaMenuMobile";
import TopMenu from "@/components/organisms/top-menu/TopMenu";

const findMenu = (props: INavigation, firstPath: string, asPath: string) => {
  const { mainNavCollection, secondaryNavCollection } = props;
  let { name } = props;
  let menuKey = firstPath;
  const ProductName = asPath.split("=")[1];
  let firstLevelMenu, isFolder, currentMenu;

  let secondLevelMenu = mainNavCollection?.items.find(
    (el) => el.internalLink?.slug === HOME_SLUG
  )?.mainNavCollection;

  if (
    mainNavCollection?.items?.some((el) => el.internalLink?.slug === firstPath)
  ) {
    secondLevelMenu = mainNavCollection?.items.find(
      (el) => el.internalLink?.slug === firstPath
    )?.mainNavCollection;
  }

  if (
    secondaryNavCollection?.items?.some(
      (el) => el.internalLink?.slug === firstPath
    )
  ) {
    secondLevelMenu = secondaryNavCollection?.items.find(
      (el) => el.internalLink?.slug === firstPath
    )?.mainNavCollection;
  }

  if (
    mainNavCollection?.items.some(
      (el) => el.secondaryNavCollection?.items.length > 0
    )
  ) {
    menuKey = firstPath;
    firstLevelMenu = mainNavCollection?.items.find(
      (el) => el.secondaryNavCollection?.items.length > 0
    )?.secondaryNavCollection;
  }

  if (firstLevelMenu?.items.some((el) => el.internalLink?.slug === firstPath)) {
    secondLevelMenu = firstLevelMenu?.items?.find(
      (el) => el.internalLink?.slug === firstPath
    )?.mainNavCollection;
    isFolder = "Empresas";
  }

  if (!secondLevelMenu?.items?.length) {
    menuKey = HOME_SLUG;
    isFolder = "";
    secondLevelMenu = mainNavCollection?.items.find(
      (el) => el.internalLink?.slug === HOME_SLUG
    )?.mainNavCollection;
  }

  secondLevelMenu?.items?.map((item) => {
    item?.mainNavCollection?.items?.map((subItem) => {
      if (ProductName) {
        name = ProductName.charAt(0).toUpperCase() + ProductName.slice(1);
      }
      if (subItem.mainNavCollection?.items.some((el) => el.name === name)) {
        if (
          item.mainNavCollection.items.some(
            (itemEl) => itemEl.name === subItem.name
          )
        ) {
          currentMenu = item.name;
        }
      }
    });
    if (item?.mainNavCollection?.items.length === 0 && item?.name === name) {
      currentMenu = item?.name;
    }
  });

  if (
    !mainNavCollection?.items?.some(
      (el) => el.internalLink?.slug === firstPath
    ) &&
    !secondaryNavCollection?.items?.some(
      (el) => el.internalLink?.slug === firstPath
    ) &&
    !firstLevelMenu?.items.some((el) => el.internalLink?.slug === firstPath)
  ) {
    menuKey = HOME_SLUG;
  }
  return { firstLevelMenu, secondLevelMenu, menuKey, isFolder, currentMenu };
};

const HeaderBlock: React.FC<INavigation> = (props) => {
  const {
    promoImage,
    mainNavCollection,
    secondaryNavCollection,
    utilityNavCollection,
    name,
  } = props;
  let { menuNavkey = null } = props;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { status: sessionStatus, data: session } = useSession();
  // const router = useRouter();

  useEffect(() => {
    if (sessionStatus == "unauthenticated") {
      console.warn("not authorized");
      // router.push('/acceso');
    }
  }, [session, sessionStatus]);

  const { asPath } = useRouter();
  let firstPath = asPath.split("/")[1];
  if (menuNavkey === null) {
    menuNavkey = HOME_SLUG;
    firstPath = "home";
  }

  // Assign menu
  const menu = findMenu(props, firstPath, asPath);
  const mainNavCollectionMenu = menu.secondLevelMenu;
  const secondaryNavCollectionMenu = menu.firstLevelMenu;
  const isFolder = menu.isFolder;
  const currentMenu = menu.currentMenu;
  firstPath = menu.menuKey;

  const secondaryNavCollectionColor = mainNavCollection?.items.find(
    (el) => el.secondaryNavCollection?.items.length > 0
  )?.backgroundColor;

  let color = mainNavCollection?.items.find(
    (el) => el.internalLink?.slug === menuNavkey
  )?.backgroundColor;

  if (
    !mainNavCollection?.items?.some(
      (el) => el.internalLink?.slug === menuNavkey
    ) &&
    !secondaryNavCollection?.items?.some(
      (el) => el.internalLink?.slug === menuNavkey
    ) &&
    secondaryNavCollectionMenu?.items?.some(
      (el) => el.internalLink?.slug === menuNavkey
    )
  ) {
    color = secondaryNavCollectionColor;
  }
  const backgroundColor = getBackgroundColorClass(color ?? "Azul Oscuro");

  return (
    <header id="header" className="sticky inset-x-0 top-0 z-50 bg-white shadow">
      {/* Top */}
      <div className="relative hidden lg:block">
        <div
          className={classNames(
            "absolute inset-x-0 h-full",
            isOpenMenu
              ? getBackgroundColorClass(
                secondaryNavCollectionColor ?? "Azul Oscuro"
              ).background
              : backgroundColor.background
          )}
        ></div>
        <div className="mx-auto xl:container">
          <div className="px-2 sm:px-4 2xl:px-[70px]">
            <nav
              aria-label="Menú principal"
              className="relative flex justify-between gap-8 2lg:gap-10 xl:gap-[76px] min-h-[42px] h-full"
            >
              <ul className="relative flex gap-6 flex-nowrap grow">
                {mainNavCollection?.items?.map((item, index) => {
                  return (
                    <li className="flex items-center" key={item.sys.id}>
                      {item?.secondaryNavCollection?.items?.length > 0 ? (
                        <div
                          onClick={() => setIsOpenMenu(!isOpenMenu)}
                          onMouseOver={() => setIsOpenMenu(true)}
                          onMouseOut={() => setIsOpenMenu(false)}
                          className={classNames(
                            item.promoTitle === isFolder
                              ? "text-lucuma border-lucuma"
                              : "text-white border-transparent",
                            "cursor-pointer inline-block relative hover:text-lucuma pt-2 pb-3 pr-6 text-xl font-semibold leading-none border-b-2"
                          )}
                        >
                          {item.promoTitle ?? item.name}
                          <Icon
                            icon="arrow-down"
                            className="absolute right-0 w-6 h-6"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <CustomLink
                          className={classNames(
                            item.internalLink?.slug === firstPath
                              ? "text-lucuma border-lucuma"
                              : "text-white border-transparent",
                            "inline-block hover:text-lucuma pt-2 pb-3 text-xl font-semibold leading-none border-b-2"
                          )}
                          content={item}
                          aria-current={index === 0 ? "page" : undefined}
                        >
                          {item.promoTitle ?? item.name}
                        </CustomLink>
                      )}
                    </li>
                  );
                })}
              </ul>

              <ul className="relative flex gap-6 flex-nowrap">
                {secondaryNavCollection?.items?.map((item, index) => (
                  <li className="flex items-center" key={item.sys.id}>
                    <CustomLink
                      className={classNames(
                        item.internalLink?.slug === firstPath
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
                    <Icon icon="emergency" className="w-full h-full mx-auto" />
                  </span>
                  Emergencias: 164
                </p>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* TopMenu */}
      <Transition
        show={isOpenMenu}
        className="overflow-hidden"
        enter="transition-all ease-in duration-700"
        enterFrom="max-h-0"
        enterTo="max-h-screen"
        leave="transition-all ease-out duration-500"
        leaveFrom="max-h-screen"
        leaveTo="max-h-0"
      >
        <div
          onMouseOver={() => setIsOpenMenu(true)}
          onMouseOut={() => setIsOpenMenu(false)}
        >
          <TopMenu
            secondaryNavCollection={secondaryNavCollectionMenu}
            firstPath={firstPath}
          />
        </div>
      </Transition>
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
                      className="block w-auto sm:hidden"
                      src={"/images/vanti-icon.png"}
                      alt={promoImage?.title ?? "Logo Grupo Vanti"}
                      width={180}
                      height={52}
                    />
                    <Image
                      className="hidden w-auto sm:block"
                      src={promoImage?.url ?? "/images/vanti-logo.png"}
                      alt={promoImage?.title ?? "Logo Grupo Vanti"}
                      width={180}
                      height={52}
                    />
                  </figure>
                </CustomLink>
              </div>

              <div className="flex items-center justify-end flex-grow divide-x md:py-5 divide-neutral-70">
                <form
                  action="#"
                  method="post"
                  className="w-full h-10 lg:max-w-xs lg:pr-6"
                >
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
                  {session?.user ? (
                    <>
                      <Menu
                        as="div"
                        className="relative inline-block text-left min-w-[180px]"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-end w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ">
                            <span className="flex w-5 h-5 mr-2 text-neutral-30 shrink-0">
                              <Icon
                                icon="personal-data"
                                className="w-full h-full"
                                aria-hidden="true"
                              />
                            </span>
                            {session.user["name"] ?? session.user["email"]}
                            <ChevronDownIcon
                              className="w-5 h-5 ml-2 text-neutral-30"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute flex justify-center right-0 z-10 w-[169px] mt-1 bg-white rounded-bl-[10px] rounded-br-[10px] shadow-[-2px_-2px_0_rgb(0,0,0,0.04),2px_2px_4px_rgb(0,0,0,0.08)] focus:outline-none">
                            <div className="flex flex-col">
                              <div className="flex flex-col pt-[19px]">
                                <Menu.Item>
                                  {({ active }) => (
                                    <CustomLink
                                      content={{ urlPath: "/dashboard/orders" }}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-blue-dark",
                                        "block w-full underline py-2"
                                      )}
                                    >
                                      Mis compras
                                    </CustomLink>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <CustomLink
                                      content={{ urlPath: "#" }}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-blue-dark",
                                        "block w-full underline py-2"
                                      )}
                                    >
                                      Mis favoritos
                                    </CustomLink>
                                  )}
                                </Menu.Item>
                              </div>
                              <hr className="w-full my-3" />
                              <Menu.Item>
                                {({ active }) => (
                                  <CustomLink
                                    content={{ urlPath: "/dashboard" }}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-blue-dark",
                                      "block w-full underline py-2"
                                    )}
                                  >
                                    Mi Perfil
                                  </CustomLink>
                                )}
                              </Menu.Item>
                              <hr className="w-full my-3" />
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active
                                        ? "text-blue-dark-8"
                                        : "text-blue-dark",
                                      "block w-full underline py-2 mb-9 text-left"
                                    )}
                                    onClick={() => signOut()}
                                  >
                                    Salir
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <CustomLink
                        content={{ urlPath: "/registro" }}
                        className="flex items-center h-full text-center button button-primary"
                      >
                        Regístrate
                      </CustomLink>
                      <CustomLink
                        content={{
                          urlPath:
                            "/acceso" + (asPath !== "/" ? `?p=${asPath}` : ""),
                        }}
                        className="flex items-center h-full text-center button button-outline"
                      >
                        Inicia sesión
                      </CustomLink>
                    </>
                  )}
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                <span className="block w-10 h-10 rounded-full shrink-0 bg-category-orange-light text-blue-dark">
                  <Icon icon="emergency" className="w-full h-full mx-auto" />
                </span>
              </div>
              {/* Mobile */}
              <div className="relative z-10 flex items-center lg:hidden">
                <Popover className="relative lg:hidden">
                  <Popover.Button className="inline-flex items-center justify-center p-1 text-gray-400 rounded-md outline-none hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="block w-8 h-8" aria-hidden="true" />
                  </Popover.Button>
                  <Transition
                    className="fixed inset-0 p-4 overflow-auto bg-white"
                    enter="transition duration-[400ms] ease-out"
                    enterFrom="transform -translate-x-full"
                    enterTo="transform translate-x-0"
                    leave="transition duration-[400ms] ease-out"
                    leaveFrom="transform translate-x-0"
                    leaveTo="transform -translate-x-full"
                  >
                    <Popover.Panel className="grid grid-cols-1 grid-rows-[auto,_1fr] h-full gap-4">
                      {({ close }) => (
                        <>
                          <div className="flex items-center justify-between">
                            <CustomLink
                              content={{ urlPath: "/" }}
                              className="flex items-center flex-shrink-0"
                              onClick={close}
                            >
                              <figure className="relative h-[45px] aspect-[180/52]">
                                <Image
                                  className="block w-auto"
                                  src={promoImage?.url ?? "/images/vanti-logo.png"}
                                  alt={
                                    promoImage?.description ?? "Logo Grupo Vanti"
                                  }
                                  width={180}
                                  height={52}
                                />
                              </figure>
                            </CustomLink>
                            <Popover.Button className="inline-flex items-center text-gray-400">
                              <span className="sr-only">Open menu</span>
                              <XMarkIcon
                                className="block w-4 h-4"
                                aria-hidden="true"
                              />
                            </Popover.Button>
                          </div>
                          <MegaMenuMobile
                            items={mainNavCollection?.items}
                            secondaryNavCollection={secondaryNavCollection}
                            utilityNavCollection={utilityNavCollection}
                            close={close}
                          />
                        </>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
            {utilityNavCollection?.items?.length > 0 && (
              <Popover className="relative -mx-2 lg:hidden">
                {({ open }) => (
                  <>
                    <Popover.Button className="block w-full p-4 text-center underline text-blue-dark outline-0">
                      ¿Qué quieres hacer hoy?
                      <span>
                        <Icon
                          icon="arrow-down"
                          className={classNames(
                            open ? "rotate-180" : "rotate-0",
                            "w-7 h-7 transition-all"
                          )}
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
                      <Popover.Panel className="absolute left-0 w-full bg-white shadow top-full">
                        {({ close }) => (
                          <>
                            <span
                              onClick={() => close()}
                              className="block absolute top-full left-0 w-full h-[calc(100vh_-_225px)] bg-black bg-opacity-75 cursor-pointer"
                            ></span>

                            <nav aria-label="Utility" className="relative p-5">
                              <ul className="flex justify-center gap-1 flex-nowrap ">
                                {utilityNavCollection.items.map((item) => (
                                  <li
                                    className="flex max-w-[75px]"
                                    key={item.sys.id}
                                  >
                                    <CustomLink
                                      onClick={() => close()}
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
                          </>
                        )}
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
              <MegaMenu
                mainNavCollection={mainNavCollectionMenu}
                secondaryNavCollection={secondaryNavCollection}
                name={name}
                currentMenu={currentMenu}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBlock;
