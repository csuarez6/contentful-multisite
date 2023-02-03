import Icon from "@/components/atoms/icon/Icon";
import { useState, useContext, useEffect, useRef } from "react";
import MenuContext from "./MenuContext";
import MenuState from "./MenuState";
import { getUrlPath } from "@/utils/link.utils";
import { classNames } from "@/utils/functions";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

const NavItem = ({ 
  item,
  children,
  next,
  prev,
  parentPanel,
  setParentPanel,
  resetCollapse,
  noBorder
}) => {
  const [collapse, setCollapse] = useState(false);
  const [panel, setPanel] = useState(false);
  const { dispatch } = useContext(MenuContext);

  const onCollapse = () => {
    setCollapse(!collapse);
  };

  const onPanel = () => {
    setPanel(!panel);
    if(setParentPanel)
      setParentPanel(!parentPanel);
    dispatch({type: "setLevel", value: !panel ? next : (prev - 1)});
  };


  return (
    <>
      <li className={classNames(
        (parentPanel && panel) ? 
         "absolute top-0 left-0 w-full translate-x-[calc(1rem_+_100%)]" : null ,
         next % 2 != 0 && !noBorder ? "border-b border-neutral-70" : null,
        "flex flex-col font-bold text-blue-dark empty:hidden"
      )}>
        {parentPanel && panel &&
          <span
            className="font-bold cursor-pointer order-first flex gap-2 items-center block h-[50px] aspect-[180/52] absolute bg-white bottom-full left-0 mb-3"
            onClick={onPanel}
          >
            <Icon
              icon="back"
              className="w-[14px] h-4"
              aria-hidden="true"
            />
            Menú principal
          </span>
        }
        {
          <span className={classNames(panel ? "mb-4 mt-6" : collapse && next == 1 ? "bg-blue-dark text-white" : "hover:bg-neutral-90", " transition py-2.5 px-3.5 flex items-center gap-2 relative")}>
            {item.promoIcon && (
              <span className="flex items-center shrink-0 w-6 h-6">
                <Icon
                  icon={item.promoIcon}
                  className="w-full h-full"
                  aria-hidden="true"
                />
              </span>
            )}
            <a
              className="py-2.5 px-3.5 -my-2.5 -mx-3.5 flex-grow"
              href={getUrlPath(item)}
            >
              {item.promoTitle ?? item.name}
            </a>
            {(next % 2 != 0 && !!item?.mainNavCollection?.items.length) &&

              <span
                className="font-bold cursor-pointer absolute right-3 top-1/2 z-10 -translate-y-1/2"
                onClick={onCollapse}
              >
                <Icon
                  icon={collapse ? "arrow-up" : "arrow-down"}
                  className="w-7 h-7"
                  aria-hidden="true"
                />

              </span>
            }
            {next % 2 == 0 && !!item?.mainNavCollection?.items.length && !panel &&
              <span
                className="font-bold cursor-pointer absolute right-3 top-1/2 z-10 -translate-y-1/2"
                onClick={onPanel}
              >
                <Icon
                  icon="arrow-right"
                  className="w-7 h-7"
                  aria-hidden="true"
                />
              </span>
            }
          </span>
        }
        {(collapse || panel) && children}
      </li>
    </>
  );
};
const NavList = ({ items, level, currentPanel, setCurrentPanel, utilityNavCollection, noBorder, className }) => {
  const { state } = useContext(MenuContext);
  const [panel, setPanel] = useState(false);
  const list = useRef<HTMLDivElement>(null);

  const lv = level + 1;
  let col = Math.floor(state.level / 2);
  return (
    <>
      <ul 
        ref={list}
        className={classNames(className, level % 2 == 0 && !noBorder ? "border-t border-neutral-70 my-[-1px]" : null)}
        style={{transform: panel && level == 0 ? `translateX(calc(${col} * (-100% - 1rem)))` : null}}
       >
        {  level == 1 && 
          <div className="flex flex-col gap-3 my-4">
            <CustomLink
              content={{ urlPath: "/registro" }}
              className="block text-center button button-primary"
            >
              Regístrate
            </CustomLink>
            <CustomLink
              content={{ urlPath: "/acceso" }}
              className="block text-center button button-outline"
            >
              Inicia sesión
            </CustomLink>
          </div>
        }
        {items.map((item) => (
          <NavItem 
            key={item.name}
            item={item}
            next={lv}
            prev={level}
            noBorder={noBorder}
            parentPanel={currentPanel}
            setParentPanel={setCurrentPanel}
           >

            {!!item?.mainNavCollection?.items &&
              <NavList 
                utilityNavCollection={utilityNavCollection}
                level={lv} 
                items={item?.mainNavCollection?.items} 
                currentPanel={panel}
                setCurrentPanel={setPanel}
              />
            }
          </NavItem>
        ))}
        {  level == 1 && !!utilityNavCollection?.items.length && 
          <nav
            aria-label="Utility"
            className="relative p-5 border-t border-neutral-70 mt-2"
          >
            <ul className="flex gap-2 flex-nowrap justify-center ">
              {utilityNavCollection?.items.map((item) => (
                <li className="flex max-w-[75px]" key={item.sys.id}>
                  <CustomLink
                    content={item}
                    className={classNames(
                      "bg-white text-blue-dark group/icon hover:bg-blue-dark transition hover:text-white rounded-md bg-category-blue-light-90 flex flex-col items-center text-xs leading-none text-center font-light gap-0.5 px-2 py-3",
                      item.promoIcon
                        ? "justify-start"
                        : "justify-center"
                    )}
                  >
                    {item.promoIcon && (
                      <span className="flex items-center w-6 h-6 shrink-0 transition group-hover/icon:text-white text-neutral-30">
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
        }
      </ul>
    </>
  );
};
const MegaMenuMobile = ({ items, secondaryNavCollection, utilityNavCollection }) => {
  return (
    <MenuState>
      <div className="relative">
        <NavList 
          level={0}
          items={items}
          utilityNavCollection={utilityNavCollection}
         />
        <NavList 
          level={0}
          noBorder={true}
          className="mt-3"
          items={secondaryNavCollection?.items}
          utilityNavCollection={utilityNavCollection}
         />
      </div>
    </MenuState>
  );
};

export default MegaMenuMobile;