import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ModalWarnning from "@/components/organisms/modal-warnning/ModalWarnning";
import { classNames, findMenu, getBackgroundColorClass } from "@/utils/functions";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import Icon from "@/components/atoms/icon/Icon";
import MegaMenu from "@/components/organisms/mega-menu/MegaMenu";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { HOME_SLUG } from "@/constants/url-paths.constants";
import MegaMenuMobile from "@/components/organisms/mega-menu-mobile/MegaMenuMobile";
import TopMenu from "@/components/organisms/top-menu/TopMenu";
import uuid from "react-uuid";
import Link from "next/link";
import CheckoutContext from "@/context/Checkout";
import "react-circular-progressbar/dist/styles.css";

const HeaderBlock: React.FC<INavigation> = (props) => {
  const {
    promoImage,
    mainNavCollection,
    secondaryNavCollection,
    name,
  } = props;
  let { menuNavkey = null } = props;
  const headerRef = useRef(null);
  const isOpenTopMenu = useRef(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();
  const { order } = useContext(CheckoutContext);
  const [numProducts, setNumProducts] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setNumProducts(
      order?.line_items
        ? order.line_items.reduce(
            (acum, line_item) =>
              acum +
              line_item.quantity +
              (line_item?.["installlation_service"]?.[0]?.quantity ?? 0) +
              (line_item?.["warranty_service"]?.[0]?.quantity ?? 0),
            0
          )
        : 0
    );
  }, [order]);

  const [searchText, setSearchText] = useState("");
  const [timer, setTimer] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.value ?? searchText;
    router.push(`/busqueda?text=${value}`);
  };

  const handleInputChange = (e) => {
    if (e.target.value) {
      clearTimeout(timer);
      setSearchText(e.target.value);
      setTimer(setTimeout(() => handleSubmit(e), 1000));
    }
  };

  const { asPath } = useRouter();
  let firstPath = asPath.split("/")[1];
  if (menuNavkey === null) {
    menuNavkey = HOME_SLUG;
    firstPath = "home";
  }

  const menu = findMenu(props, firstPath, asPath);
  const mainNavCollectionMenu = menu?.secondLevelMenu?.mainNavCollection;
  const utilityNavCollectionMenu = menu?.secondLevelMenu?.utilityNavCollection?.items?.filter(item => item?.linkView !== "Botón");  
  const utilityNavButtons = menu?.secondLevelMenu?.utilityNavCollection?.items?.filter(item => item?.linkView === "Botón");
  const secondaryNavCollectionMenu = menu.firstLevelMenu;
  const folder = menu.folder;
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
    <header
      ref={headerRef}
      id="header"
      className={classNames(
        "z-50 bg-white shadow transition-transform duration-500"
      )}
    >
      {/* Top */}
      <div className="relative hidden lg:block overflow-x-hidden">
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
                            item.promoTitle === folder
                              ? "text-lucuma border-lucuma"
                              : "text-white border-transparent",
                            "cursor-pointer inline-block relative hover:text-lucuma transition-colors duration-500 pt-2 pb-3 pr-6 text-xl font-semibold leading-none border-b-2"
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
                            "inline-block hover:text-lucuma transition-colors duration-500 pt-2 pb-3 text-xl font-semibold leading-none border-b-2"
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
                        "inline-block hover:text-lucuma transition-colors duration-500 pt-2 pb-3 text-xl font-semibold leading-none border-b-2"
                      )}
                      content={item}
                      aria-current={index === 0 ? "page" : undefined}
                    >
                      {item.promoTitle ?? item.name}
                    </CustomLink>
                  </li>
                ))}
              </ul>

              <div
                className={classNames(
                  "bg-category-orange-light relative justify-self-end flex items-center rounded-tl-xl px-[10px] py-[5px] cursor-pointer",
                  "before:absolute before:w-[50vw] before:h-full before:bg-category-orange-light"
                )}
                onClick={() => setOpenModal(!openModal)}
              >
                <p className="relative flex items-center gap-1 title is-5 text-blue-dark flex-nowrap">
                  <span className="w-8 h-8 shrink-0">
                    <Icon icon="emergency" className="w-full h-full mx-auto" />
                  </span>
                  Emergencias: Llamar al 164
                </p>
              </div>
              {openModal && (
                <ModalWarnning open={openModal} setOpen={setOpenModal} />
              )}
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
          onMouseOver={() => {
            isOpenTopMenu.current = true;
            setIsOpenMenu(true);
          }}
          onMouseOut={() => {
            isOpenTopMenu.current = false;
            setIsOpenMenu(false);
          }}
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
                  content={{ urlPaths: ["/"] }}
                  className="flex items-center flex-shrink-0"
                >
                  <figure className="relative aspect-square h-10 sm:h-[52px] sm:aspect-[180/52]">
                    <Image
                      className="w-auto h-full block sm:hidden"
                      src={"/images/vanti-icon.png"}
                      alt={promoImage?.title ?? "Logo Grupo Vanti"}
                      width={180}
                      height={52}
                    />
                    <Image
                      className="w-auto h-full hidden sm:block"
                      src={promoImage?.url ?? "/images/vanti-logo.png"}
                      alt={promoImage?.title ?? "Logo Grupo Vanti"}
                      width={180}
                      height={52}
                    />
                  </figure>
                </CustomLink>
              </div>

              <div className="flex items-center justify-end flex-grow md:py-5">
                <form
                  onSubmit={handleSubmit}
                  className="w-full h-11 lg:max-w-xs pr-4 2lg:pr-5 xl:pr-6"
                >
                  <div className="bg-category-blue-light-90 text-[#868DA5] rounded-lg flex flex-nowrap relative h-full">
                    <label
                      htmlFor="search"
                      className="flex items-center absolute left-3 h-full"
                    >
                      <span className="flex items-center w-6 h-6 shrink-0">
                        <Icon icon="search" className="w-full h-full mx-auto" />
                      </span>
                    </label>
                    <input
                      id="search"
                      onChange={handleInputChange}
                      defaultValue={searchText}
                      type="text"
                      placeholder="Buscar"
                      className="bg-transparent rounded-lg border border-category-blue-light-90 hover:border-grey-30 focus:border-lucuma-60 focus:outline-none text-[#616B8A] text-lg font-medium w-full p-2 pl-11 transition-colors duration-500"
                      autoComplete="off"
                    />
                  </div>
                </form>
                <nav
                  aria-label="Utility"
                  className="relative hidden px-4 2lg:px-5 xl:px-6 lg:block border-x border-neutral-70"
                >
                  <ul
                    className={classNames(
                      "flex 2lg:gap-0.5 xl:gap-1 flex-nowrap"
                    )}
                  >
                    {utilityNavCollectionMenu.map((item) => {
                      return (
                        <li
                          className="flex w-[68px] 2lg:w-[75px] justify-center"
                          key={item.sys.id}
                        >
                          <CustomLink
                            content={item}
                            className={classNames(
                              "bg-white text-blue-dark justify-center hover:bg-category-blue-light-90 transition-colors duration-700 rounded-[10px] flex flex-col items-center text-xs leading-none text-center font-light !gap-0.5 px-2 py-1 w-full h-full"
                            )}
                            linkClassName="w-full block"
                          >
                            {item.promoIcon && (
                              <span className="flex items-center w-[25px] h-[25px] shrink-0 text-neutral-30 flex-grow">
                                <Icon
                                  icon={item?.promoIcon}
                                  className="w-full h-full mx-auto"
                                />
                              </span>
                            )}
                            {item.promoTitle ?? item.name}
                          </CustomLink>
                        </li>
                      );
                    })}
                    {/* Carrito de compras */}
                    <li
                      className="flex w-[68px] 2lg:w-[75px]"
                      key={`cart_${uuid()}`}
                    >
                      <Link
                        href="/tienda-virtual/checkout/pse/verify"
                        className="bg-white text-blue-dark hover:bg-category-blue-light-90 transition-colors duration-700 rounded-[10px] flex flex-col items-center text-xs leading-none text-center font-light !gap-0.5 px-2 py-1 justify-start w-full"
                      >
                        <span className="relative flex items-center mb-2 w-9 h-7 shrink-0 text-neutral-30">
                          <Icon
                            icon="shopping-cart"
                            className="absolute w-full h-full mx-auto right-1"
                          />
                          <span
                            className={classNames(
                              "absolute p-1 rounded text-size-span top-3 right-0 shadow border text-bolder",
                              numProducts > 0
                                ? "bg-blue-dark text-white"
                                : "bg-blue-100"
                            )}
                          >
                            {numProducts}
                          </span>
                        </span>
                        Carrito
                      </Link>
                    </li>
                  </ul>
                </nav>
                {utilityNavButtons?.length > 0 && (
                  <div className="hidden z-20 gap-4 2lg:gap-5 xl:gap-6 pl-4 2lg:pl-5 xl:pl-6 lg:flex lg:h-full">
                    {utilityNavButtons.map((item, idx) => {
                      return (
                        <CustomLink
                          key={item.sys.id}
                          content={item}
                          className={"flex items-center h-full text-center button whitespace-nowrap " + (idx == 0 ? "button-primary" : "button-outline")}
                        >
                          {item.ctaLabel ?? (item.promoTitle ?? item.name)}
                        </CustomLink>
                      );
                    })}
                  </div>
                )}
              </div>
              <div
                className="relative z-10 flex items-center lg:hidden cursor-pointer"
                onClick={() => setOpenModal(!openModal)}
              >
                <span className="block w-10 h-10 rounded-full shrink-0 bg-category-orange-light text-blue-dark">
                  <Icon icon="emergency" className="w-full h-full mx-auto" />
                </span>
              </div>
              {utilityNavCollectionMenu?.slice(0, 1)?.map((item) => (
                <li
                  className="relative z-10 flex items-center lg:hidden"
                  key={item?.sys?.id}
                >
                  <CustomLink
                    onClick={() => close()}
                    content={item}
                    className={classNames(
                      "bg-white text-blue-dark hover:bg-category-blue-light-90 rounded-[10px] flex flex-col items-center text-xs leading-none text-center font-light gap-0.5 px-2 py-1",
                      item.promoIcon ? "justify-start" : "justify-center"
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

              {/* Mobile */}
              <div className="relative z-10 flex items-center lg:hidden">
                <Popover className="relative lg:hidden">
                  <Popover.Button className="inline-flex items-center justify-center p-1 text-gray-400 rounded-md outline-none hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="block w-8 h-8" aria-hidden="true" />
                  </Popover.Button>
                  <Transition
                    className="fixed inset-0 p-4 overflow-auto bg-white mega-menu-mobile"
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
                              content={{ urlPaths: ["/"] }}
                              className="flex items-center flex-shrink-0"
                              onClick={close}
                            >
                              <figure className="relative h-[45px] aspect-[180/52]">
                                <Image
                                  className="block w-auto"
                                  src={
                                    promoImage?.url ?? "/images/vanti-logo.png"
                                  }
                                  alt={
                                    promoImage?.description ??
                                    "Logo Grupo Vanti"
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
                            utilityNavCollection={utilityNavCollectionMenu}
                            close={close}
                          />
                        </>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
            {utilityNavCollectionMenu?.length > 0 && (
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
                                {/* icons nav mobile */}
                                <li className="flex max-w-[75px]">
                                  <button onClick={() => close()}>
                                    <Link
                                      href="/tienda-virtual/checkout/pse/verify"
                                      className="text-blue-dark hover:bg-category-blue-light-90 rounded-[10px] flex flex-col items-center text-xs leading-none text-center font-light !gap-0.5 px-2 py-1 justify-start"
                                    >
                                      <span className="relative flex items-center h-8 w-9 shrink-0 text-neutral-30">
                                        <Icon
                                          icon="shopping-cart"
                                          className="absolute w-full h-full mx-auto right-1"
                                        />
                                        <span
                                          className={classNames(
                                            "absolute p-1 rounded text-size-span top-3 right-0 shadow border text-bolder",
                                            numProducts > 0
                                              ? "bg-blue-dark text-white"
                                              : "bg-blue-100"
                                          )}
                                        >
                                          {numProducts}
                                        </span>
                                      </span>
                                      Carrito
                                    </Link>
                                  </button>
                                </li>
                                {utilityNavCollectionMenu
                                  ?.slice(1)
                                  ?.map((item) => (
                                    <li
                                      className="flex max-w-[75px]"
                                      key={item?.sys?.id}
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
                              {utilityNavButtons?.length > 0 && (
                                <div className="flex flex-col gap-3 mt-8 mb-4">
                                  {utilityNavButtons.map((item, idx) => {
                                    return (
                                      <CustomLink
                                        key={item.sys.id}
                                        content={item}
                                        className={"flex items-center justify-center h-full text-center button whitespace-nowrap " + (idx == 0 ? "button-primary" : "button-outline")}
                                      >
                                        {item.ctaLabel ?? (item.promoTitle ?? item.name)}
                                      </CustomLink>
                                    );
                                  })}
                                </div>
                              )}
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
      <div className="relative">
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
