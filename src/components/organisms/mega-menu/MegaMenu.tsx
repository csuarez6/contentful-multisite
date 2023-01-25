import Icon from "@/components/atoms/icon/Icon";
import { classNames } from "@/utils/functions";

import React, { useState, useEffect } from "react";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { getUrlPath } from "@/utils/link.utils";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

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
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    setScreen(window.innerWidth);
    responsive(screen);
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
      responsive(screen);
    });
  }, [screen]);

  const rows = (value) => {
    let rows = Math.ceil((value + 1) / columns);
    rows = rows * 2;
    return rows;
  };

  const responsive = (w) => {
    if(w < 768)
      setColumns(1);
    else if(w < 1024)
      setColumns(3);
    else 
      setColumns(5);
  };

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
            `${open ? "border-blue-dark" : ""} flex items-center gap-1 pb-1 font-semibold leading-tight text-center border-b text-blue-dark focus:outline-none`
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
          className={
            `${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute inset-x-0 top-full mt-px z-10 transform transition-all duration-200`
          }
         >
          <div className="bg-white min-w-[100vw] absolute h-full left-1/2 translate-x-[-50%] shadow"></div>
          <div className="relative flex pt-6 my-6 gap-6">
            <nav className="grid gap-6 w-full" style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
              {item.mainNavCollection.items.map((item, index) => (
                <>
                  <p 
                    key={`title_${item.name}`}
                    style={{gridRowStart: rows(index) - 1}}
                    className="text-size-subtitle1 font-bold text-blue-dark border-b border-neutral-70 pb-4"
                   >
                    {item.promoTitle ?? item.name}
                  </p>
                  <ul
                    key={`title_${item.name}`}
                    role="list"
                    style={{gridRowStart: rows(index)}}
                    className="flex flex-col gap-5 mt-5"
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
                </>
              ))}
            </nav>
            {/* <div className="py-8 sm:py-12 pl-6 border-l border-neutral-70">
            <div>
              Cards
            </div>
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

const MegaMenu: React.FC<INavigation> = ({ mainNavCollection }) => {
  
  if (mainNavCollection.items?.length <= 0) return;
  return (
    <div className="relative hidden lg:block">
       <div className="relative bg-white">
          <div className="pointer-events-none absolute inset-0 z-30"aria-hidden="true"/>
          <div className="relative z-20">
            <div className="mx-auto flex items-center">
              <div className="flex flex-1 items-center py-2 min-h-[60px]">
                <div className="flex gap-6">
                  {mainNavCollection.items.map((item) => (
                    <MegaMenuItem item={item} key={item.sys.id}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default MegaMenu;
