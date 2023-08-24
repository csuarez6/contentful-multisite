import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { event as gTagEvent } from "nextjs-google-analytics";
import Icon from "@/components/atoms/icon/Icon";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import jsonToReactComponent from "@/lib/services/render-cards.service";
import { classNames } from "@/utils/functions";

const LinkElement = ({ item, isOpen }) => {
  return (
    <>
      {item.promoIcon && (
        <span className="flex items-center shrink-0 w-6 h-6">
          <Icon
            icon={item.promoIcon}
            className="w-full h-full"
            aria-hidden="true"
          />
        </span>
      )}
      {item.promoTitle ?? item.name}
      {item.mainNavCollection?.items?.length > 0 && item.__typename !== "AuxCustomContent" && (
        <span
          className={classNames(
            "flex items-center w-6 h-6 shrink-0 text-blue-dark",
            isOpen && "transform rotate-180"
          )}
        >
          <Icon
            icon="arrow-down"
            className="w-full h-full"
            aria-hidden="true"
          />
        </span>
      )}
    </>
  );
};

const MegaMenuItem = ({ item, name, currentMenu }) => {
  const uniqueId = `megamenu_${item?.sys?.id}`;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const columns = 6;
  const { asPath } = useRouter();
  const ProductName = asPath.split('=')[1];
  if (ProductName) name = ProductName.charAt(0).toUpperCase() + ProductName.slice(1);

  const [screenW, setScreenW] = useState(0);
  const [screenH, setScreenH] = useState(0);
  const [submenuH, setSubmenuH] = useState(0);
  const submenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScreenW(window.innerWidth);
    setScreenH(window.innerHeight);

    window.addEventListener("resize", () => {
      setIsOpenMenu(false);
      setScreenW(window.innerWidth);
      setScreenH(window.innerHeight);
    });
  }, [screenW]);

  const columnList = (items) => {
    return {
      gridTemplateColumns: `repeat(${items}, 1fr)`,
      gridColumn: `span ${items} / span ${items}`,
    };
  };

  const columnCard = (items) => {
    const col = columns - items;
    return {
      gridTemplateColumns: `repeat(${col}, 1fr)`,
      gridColumn: `span ${col} / span ${col}`,
    };
  };

  const openSubmenu = () => {
    const _submenu = submenu.current;
    const subTitles: NodeListOf<HTMLParagraphElement> = _submenu.querySelectorAll(".subTitleList");
    const height: Array<number> = [];

    subTitles.forEach((item) => {
      height.push(item.offsetHeight);
    });
    height.sort().reverse();

    subTitles.forEach((item) => {
      item.style.height = `${height[0]}px`;
    });

    const coor = _submenu.getBoundingClientRect();
    setSubmenuH(screenH - (coor.top + 30));
  };

  const handlerClick = (evt) => {
    const item = evt.target;
    const isChildren = item.closest(`#${uniqueId}`);
    const isClickedInside = item.id === uniqueId || isChildren;
    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (!isTouchDevice && !isClickedInside) setIsOpenMenu(!isOpenMenu);
  };

  const handleMouseOver = (item) => {
    if (item.name === "Tienda Virtual") {
      gTagEvent("view_item_list", {
        items: [{
          item_id: '',
          item_name: 'Tienda Virtual',
          coupon: '',
          discount: 0,
          index: 0,
          item_list_name: '',
          item_list_id: '',
          affiliation: 'Marketplace',
          item_brand: '',
          item_category: '',
          item_variant: '',
          price: 0,
          currency: 'COP',
          quantity: 0
        }],
        item_list_name: '',
        item_list_id: ''
      });
    }
    setIsOpenMenu(true);
  };

  const handleClicked = (item) => {
    const isProduct = item.internalLink?.slug?.toLowerCase() === "productos";
    if (isProduct) {
      gTagEvent("view_item", {
        currency: 'COP',
        items: [{
          item_id: '',
          item_name: item.promoTitle ?? item.name,
          coupon: '',
          discount: 0,
          affiliation: 'Marketplace',
          item_brand: '',
          item_category: item.promoTitle ?? item.name,
          item_variant: '',
          price: 0,
          currency: 'COP',
          quantity: 0
        }],
        value: 0
      });
    }
    setIsOpenMenu(false);
  };

  useEffect(() => {
    if (isOpenMenu) openSubmenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenMenu]);

  return (
    <div
      onMouseOver={() => handleMouseOver(item)}
      onMouseOut={() => setIsOpenMenu(false)}
      onFocus={() => handleMouseOver(item)}
      onBlur={() => setIsOpenMenu(false)}
      onClick={handlerClick}
      className={classNames(
        "group/submenu min-h-[60px] px-3 first:pl-0 -my-2 flex items-center",
        isOpenMenu && "isOpen",
        currentMenu === item.name && "underline"
      )}
      ref={submenu}
    >
      {/* contenido personalizado, Navegacion */}
      {(!item.mainNavCollection?.items && (item.internalLink?.urlPaths?.[0] || item.externalLink)) && (
        <CustomLink
          content={item}
          linkClassName={
            "relative group-hover/submenu:after:content-[''] group-hover/submenu:after:block group-hover/submenu:after:absolute group-hover/submenu:after:min-h-[60px] group-hover/submenu:after:w-full"
          }
          className={classNames(
            "flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b text-blue-dark focus:outline-none",
            isOpenMenu ? "border-lucuma" : "border-transparent"
          )}
        >
          <LinkElement item={item} isOpen={isOpenMenu} />
        </CustomLink>
      )}

      {/* Pagina, producto */}
      {item.urlPaths?.[0] && item.__typename !== "AuxNavigation" && (
        <CustomLink
          content={item}
          className={classNames(
            "flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b border-transparent text-blue-dark focus:outline-none",
            isOpenMenu && "border-blue-dark"
          )}
        >
          <LinkElement item={item} isOpen={false} />
        </CustomLink>
      )}
      {item.mainNavCollection?.items && item.__typename === "AuxNavigation" && (
        <div className={
          classNames(
            "flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b border-transparent text-blue-dark focus:outline-none cursor-pointer",
            isOpenMenu && "border-blue-dark"
          )
        }>
          <LinkElement item={item} isOpen={false} />
        </div>
      )}
      {item.mainNavCollection?.items?.length > 0 && (
        <div
          ref={submenu}
          id={uniqueId}
          style={{ maxHeight: `${submenuH}px` }}
          className={classNames(
            "absolute inset-x-0 top-full z-10 transform transition-opacity duration-200 bg-grey-90 shadow border-t border-neutral-80 overflow-y-auto",
            isOpenMenu
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0 delay-100 duration-300"
          )}
        >
          <div className="relative flex py-6 my-6 gap-6">
            <div className="mx-auto xl:container">
              <div className="px-2 sm:px-4 2xl:px-[70px]">
                <nav
                  className="grid gap-10 w-full"
                  style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                  <div
                    className="grid gap-6 xl:gap-10 -mr-5 pr-5"
                    style={columnList(item.mainNavCollection.items.length)}
                  >
                    {item.mainNavCollection.items.map((subItem) => (
                      <div key={subItem.name}>
                        <p className="subTitleList">
                          {subItem.promoTitle ?? subItem.name}
                        </p>
                        <ul className="flex flex-col gap-5 mt-6">
                          {subItem.mainNavCollection?.items?.map(
                            (itemList, idx) =>
                              itemList && (
                                <li
                                  key={`${itemList?.sys?.id ?? itemList.name}_${idx}`}
                                  className="flow-root"
                                >
                                  <CustomLink
                                    content={{ ...itemList, ...{ linkView: "" } }}
                                    onClick={() => handleClicked(itemList)}
                                    className={classNames("flex items-center text-base text-blue-dark hover:text-lucuma-60",
                                      itemList?.name === name ? 'text-lucuma-60' : 'text-blue-dark'
                                    )}
                                  >
                                    <span>
                                      {itemList?.promoTitle ?? itemList?.name}
                                    </span>
                                  </CustomLink>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {item?.secondaryNavCollection.items.length > 0 && (
                    <div
                      className="grid gap-6 xl:gap-10 -ml-5 pl-5 border-l border-neutral-70"
                      style={columnCard(item.mainNavCollection.items.length)}
                    >
                      {item.secondaryNavCollection.items.map((block) => (
                        <div
                          className={classNames(
                            "group card-mega-menu flex overflow-hidden",
                            !block?.promoImage && "not-image"
                          )}
                          key={`card_${block?.sys.id}-megamenu`}
                          style={{
                            gridColumn:
                              block.__typename == "AuxNavigation"
                                ? `span 2 / span 2`
                                : null,
                          }}
                        >
                          {jsonToReactComponent({ ...block, hideDecimalPrice: true, hideBeforePrice: true })}
                        </div>
                      ))}
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MegaMenu: React.FC<INavigation> = ({ mainNavCollection, name, currentMenu }) => {
  if (mainNavCollection.items?.length <= 0) return;
  return (
    <div className="hidden lg:block">
      <div
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
      />
      <div className="z-20">
        <div className="mx-auto flex items-center">
          <div className="flex flex-1 items-center py-2 min-h-[60px]">
            <div className="flex">
              {mainNavCollection.items.map((item) => (
                <MegaMenuItem item={item} key={`${item.name}_mega-menu-item`} name={name} currentMenu={currentMenu} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
