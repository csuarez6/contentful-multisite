import Icon from "@/components/atoms/icon/Icon";
import { useState, useContext, useEffect } from "react";
import MenuContext from "./MenuContext";
import MenuState from "./MenuState";
import { getUrlPath } from "@/utils/link.utils";
import { classNames } from "@/utils/functions";

const NavItem = ({ item, children, level }) => {
  const { state, dispatch } = useContext(MenuContext);
  const [collapse, setCollapse] = useState(false);
  const [panel, setPanel] = useState(false);

  const onCollapse = () => {
    setCollapse(!collapse);
  };

  const onPanel = () => {
    dispatch({ type: "open" });
    setPanel(true);
  };

  useEffect(() => {
    if (!state.panel)
      setPanel(false);
  }, [state.panel]);

  return (
    <li className={classNames(level > 1 ? "bg-white" : collapse ? "bg-neutral-90" : "", "flex flex-col font-bold text-blue-dark empty:hidden relative border-b border-neutral-70")}>
      {(!state.panel || level == 3 || panel) &&
        <span className={classNames(panel ? "mb-4 mt-6" : "", "hover:bg-neutral-90 py-2.5 px-3.5 flex items-center gap-2 relative")}>
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
          {(level == 1 && !!item?.mainNavCollection?.items.length) &&

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
          {level == 2 && !state.panel &&
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
      {(collapse || (state.panel && panel)) && children}
    </li>
  );
};
const NavList = ({ items, level }) => {

  const { dispatch } = useContext(MenuContext);
  const lv = level + 1;
  return (
    <>
      {level == 2 &&
        <span
          className="font-bold cursor-pointer order-first flex gap-2 items-center block h-[50px] aspect-[180/52] absolute bg-white bottom-full left-0 mb-3"
          onClick={() => { dispatch({ type: "close" }); }}
        >
          <Icon
            icon="back"
            className="w-[14px] h-4"
            aria-hidden="true"
          />
          Menú principal
        </span>
      }
      <ul className={classNames("border-t border-neutral-70 my-[-1px]")}>
        {items.map((item) => (
          <NavItem key={item.name} item={item} level={lv}>

            {!!item?.mainNavCollection?.items &&
              <NavList items={item?.mainNavCollection?.items} level={lv}></NavList>
            }
          </NavItem>
        ))}
      </ul>
    </>
  );
};
const MegaMenuMobile = ({ items }) => {
  return (
    <MenuState>
      <NavList items={items} level={0}></NavList>
    </MenuState>
  );
};

export default MegaMenuMobile;