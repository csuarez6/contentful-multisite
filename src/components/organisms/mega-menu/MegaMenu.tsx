import Icon from "@/components/atoms/icon/Icon";
import { classNames } from "@/utils/functions";

import React, { useState, useEffect, useRef } from "react";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { getUrlPath } from "@/utils/link.utils";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import jsonToReactComponent from "@/lib/services/render-cards.service";

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
      {item.mainNavCollection?.items?.length > 0 &&
        item.__typename !== "AuxCustomContent" && (
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
const MegaMenuItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const columns = 6;
  // const [columns, setColumns] = useState(7);

  const [screenW, setScreenW] = useState(0);
  const [screenH, setScreenH] = useState(0);
  const [submenuH, setSubmenuH] = useState(0);
  const submenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScreenW(window.innerWidth);
    setScreenH(window.innerHeight);

    window.addEventListener("resize", () => {
      setOpen(false);
      setScreenW(window.innerWidth);
      setScreenH(window.innerHeight);

    });
  }, [screenW]);

  const columnList = (items) => {
    return {
      gridTemplateColumns: `repeat(${items}, 1fr)`,
      gridColumn: `span ${items} / span ${items}`
    };
  };

  const columnCard = (items) => {
    const col = columns - items;
    return {
      gridTemplateColumns: `repeat(${col}, 1fr)`,
      gridColumn: `span ${col} / span ${col}`
    };
  };


  const openSubmenu = () => {
    const _submenu = submenu.current;
    const subTitles: NodeListOf<HTMLParagraphElement> = _submenu.querySelectorAll(".subTitleList");

    const height: Array<number> = [];

    subTitles.forEach(item => {
      height.push(item.clientHeight);
    });
    height.sort().reverse();

    subTitles.forEach(item => {
      item.style.height = height[0] + "px";
    });

    const coor = _submenu.getBoundingClientRect();
    setSubmenuH(screenH - (coor.top + 30));
  };

  useEffect(() => {
    if (open) openSubmenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
      onClick={() => setOpen(false)}
      className={classNames(
        "group/submenu min-h-[60px] -my-2 flex items-center",
        open && "isOpen"
      )}
      ref={submenu}
    >
      {item.mainNavCollection?.items?.length > 0 && (
        <span
          className={
            classNames(
              "flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b text-blue-dark focus:outline-none cursor-pointer",
              open ? "border-lucuma" : "border-transparent"
            )
          }
        >
          <LinkElement item={item} isOpen={open} />
        </span>
      )
      }
      {!item.mainNavCollection?.items && !item.internalLink?.slug &&
        !item.externalLink &&
        getUrlPath(item) === "/" && (
          <CustomLink
            content={item}
            linkClassName={
              "relative group-hover/submenu:after:content-[''] group-hover/submenu:after:block group-hover/submenu:after:absolute group-hover/submenu:after:min-h-[60px] group-hover/submenu:after:w-full"
            }
            className={classNames(
              "flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b text-blue-dark focus:outline-none",
              open ? "border-lucuma" : "border-transparent"
            )}
          >
            <LinkElement item={item} isOpen={open} />
          </CustomLink>
        )}
      {!item.mainNavCollection?.items &&
        (item.internalLink?.slug || item.externalLink || getUrlPath(item) !== "/") &&
        (<CustomLink
          content={item}
          className={
            classNames(
              "flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b border-transparent text-blue-dark focus:outline-none",
              open && "border-blue-dark"
            )
          }
        >
          <LinkElement item={item} isOpen={false} />
        </CustomLink>
        )
      }
      {item.mainNavCollection?.items && item.urlPath
         &&
        (<CustomLink
          content={item}
          className={
            classNames(
              "flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b border-transparent text-blue-dark focus:outline-none",
              open && "border-blue-dark"
            )
          }
        >
          <LinkElement item={item} isOpen={false} />
        </CustomLink>
        )
      }
      {item.mainNavCollection?.items?.length > 0 && (
        <div
          ref={submenu}
          style={{ maxHeight: `${submenuH}px` }}
          className={classNames(
            "absolute inset-x-0 top-full z-10 transform duration-200 bg-grey-90 shadow border-t border-neutral-80 overflow-y-auto",
            open
              ? "pointer-events-auto opacity-100 transition-opacity"
              : "pointer-events-none opacity-0 transition-none"
          )}
        >
          <div className="relative flex py-6 my-6 gap-6">
            <div className="mx-auto xl:container">
              <div className="px-2 sm:px-4 2xl:px-[70px]">
                <nav className="grid gap-10 w-full" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                  <div className="grid gap-6 xl:gap-10 -mr-5 pr-5" style={columnList(item.mainNavCollection.items.length)}>
                    {item.mainNavCollection.items.map((subItem) => (
                      <div key={subItem.name}>
                        <p className="subTitleList">
                          {subItem.promoTitle ?? subItem.name}
                        </p>
                        <ul role="list" className="flex flex-col gap-5 mt-6">
                          {subItem.mainNavCollection?.items?.map((itemList) => (
                            itemList && (
                              <li key={itemList?.name} className="flow-root">
                                <CustomLink
                                  content={itemList}
                                  onClick={() => setOpen(false)}
                                  className="flex itemLists-center text-base text-blue-dark hover:text-lucuma-60"
                                >
                                  <span>{itemList?.promoTitle ?? itemList?.name}</span>
                                </CustomLink>
                              </li>
                            )
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {item?.secondaryNavCollection?.items && item.secondaryNavCollection.items.length && (
                    <div className="grid gap-6 xl:gap-10 -ml-5 pl-5 border-l border-neutral-70" style={columnCard(item.mainNavCollection.items.length)}>
                      {item.secondaryNavCollection.items.map((block) => (
                        <div
                          className={
                            classNames(
                              "card-mega-menu flex overflow-hidden",
                              !block.promoImage && 'not-image'
                            )
                          }
                          key={`card_${block?.sys.id}-megamenu`}
                          style={{ gridColumn: block.__typename == "AuxNavigation" ? `span 2 / span 2` : null }}
                        >
                          {jsonToReactComponent(block)}
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

const MegaMenu: React.FC<INavigation> = ({ mainNavCollection }) => {
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
            <div className="flex gap-6">
              {mainNavCollection.items.map((item) => (
                <MegaMenuItem item={item} key={`${item.name}_mega-menu-item`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
