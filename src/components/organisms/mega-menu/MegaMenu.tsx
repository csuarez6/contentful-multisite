import Icon from "@/components/atoms/icon/Icon";
import { classNames } from "@/utils/functions";

import React, { useState, useEffect, useRef } from "react";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { getUrlPath } from "@/utils/link.utils";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import {mockFeaturedProductProps} from "@/components/organisms/cards/featured-product/FeaturedProduct.mock.ts";
import FeaturedProduct from "@/components/organisms/cards/featured-product/FeaturedProduct.tsx";

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
      {(item.mainNavCollection?.items?.length > 0 && item.__typename !== 'AuxCustomContent') && (
        <span
          className={classNames(
            isOpen ? "transform rotate-180" : "",
            "flex items-center w-6 h-6 shrink-0 text-blue-dark"
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
const MegaMenuItem = ({item}) => {
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(1);
  const [screenW, setScreenW] = useState(0);
  const [screenH, setScreenH] = useState(0);
  const [submenuH, setSubmenuH] = useState(0);
  let submenu = useRef(null);

  useEffect(() => {
    setScreenW(window.innerWidth);
    setScreenH(window.innerHeight);
    responsive(screenW);
    window.addEventListener("resize", () => {
      setScreenW(window.innerWidth);
      setScreenH(window.innerHeight);
      responsive(screenW);
    });
  }, [screenW]);

  const calcRows = (value) => {
    let totalRows = Math.ceil((value + 1) / columns);
    // setRows(totalRows);
    return totalRows * 2;
  };

  const responsive = (w) => {
    if(w < 768)
      setColumns(1);
    else if(w < 1024)
      setColumns(3);
    else 
      setColumns(5);
  };

  const openSubmenu = () => {
    let _submenu = submenu.current;
    let coor = _submenu.getBoundingClientRect();
    setSubmenuH(screenH - (coor.top + 30));
  };

  useEffect(() => {
    if(open)
      openSubmenu();
  },[open]);

  return (
    <div 
      onMouseOver={()=>{setOpen(true);}}
      onMouseOut={()=>{setOpen(false);}}
      className={`${open ? "isOpen" : ""} group/submenu min-h-[60px] -my-2 flex items-center`}
     >
      {!item.internalLink?.slug &&
       !item.externalLink &&
       getUrlPath(item) === "/" && (
        <CustomLink
          content={item}
          linkClassName= {"relative group-hover/submenu:after:content-[''] group-hover/submenu:after:block group-hover/submenu:after:absolute group-hover/submenu:after:min-h-[60px] group-hover/submenu:after:w-full"}
          className={
            `${open ? "border-lucuma" : "border-transparent"} flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b text-blue-dark focus:outline-none`
          }
        >
          <LinkElement item={item} isOpen={open} />
        </CustomLink>
      )}
      {(item.internalLink?.slug ||
        item.externalLink ||
        getUrlPath(item) !== "/") && (
        <CustomLink
          content={item}
          className={
            `${open && "border-blue-dark"} flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b border-transparent text-blue-dark focus:outline-none`
          }
        >
          <LinkElement item={item} isOpen={false} />
        </CustomLink>

      )}
      {item.mainNavCollection?.items?.length > 0 && (
        <div 
          ref={submenu}
          style={{maxHeight: `${submenuH}px`}}
          className={
            `${open ? "pointer-events-auto opacity-100 transition-opacity" : "pointer-events-none opacity-0 transition-none"} absolute inset-x-0 top-full z-10 transform duration-200 bg-grey-90 shadow border-t border-neutral-80 overflow-y-auto`
          }
         >
          <div className="relative flex pt-6 my-6 gap-6">
            <div className="mx-auto xl:container">
              <div className="px-2 sm:px-4 2xl:px-[70px]">
                <nav className="grid gap-10 w-full" 
                  style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`
                  }}
                  >
                  {item.mainNavCollection.items.map((item, index) => (
                    <div key={item.name}>
                      <p 
                        // style={{gridRowStart: calcRows(index) - 1}}
                        className="text-size-subtitle1 font-bold text-blue-dark border-b border-neutral-70 pb-4"
                       >
                        {item.promoTitle ?? item.name}
                      </p>
                      <ul
                        role="list"
                        // style={{gridRowStart: calcRows(index)}}
                        className="flex flex-col gap-5 mt-6"
                      >
                        {item.mainNavCollection?.items?.map(
                          (item) => (
                            <li key={item.name} className="flow-root">
                              <CustomLink content={item} onClick={()=>{setOpen(false);}} className="flex items-center text-base text-blue-dark hover:text-lucuma-60">
                                <span>
                                  {item.promoTitle ?? item.name}
                                </span>
                              </CustomLink>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                  {
                    mockFeaturedProductProps.list.map( (item, index) => (
                      <FeaturedProduct key={`card_${index}`} {...item} className="card-mega-menu"/>
                    ))
                  }
                </nav>
                {/* <div className="py-8 sm:py-12 pl-6 border-l border-neutral-70">
                <div>
                  Cards
                </div>
              </div> */}
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
      <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true"/>
      <div className="z-20">
        <div className="mx-auto flex items-center">
          <div className="flex flex-1 items-center py-2 min-h-[60px]">
            <div className="flex gap-6">
              {mainNavCollection.items.map((item, index) => (
                <MegaMenuItem item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
