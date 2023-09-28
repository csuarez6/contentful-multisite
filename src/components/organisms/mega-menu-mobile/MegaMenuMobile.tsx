import Icon from "@/components/atoms/icon/Icon";
import { useState, useContext, useRef, useEffect } from "react";
import MenuContext from "./MenuContext";
import MenuState from "./MenuState";
import { classNames, getBackgroundColorClass } from "@/utils/functions";
import CustomLink from "@/components/atoms/custom-link/CustomLink";

const NavItem = ({
  item,
  children,
  next,
  prev,
  parent,
  parentPanel,
  setParentPanel,
  close,
  noBorder = false,
}) => {
  const [panel, setPanel] = useState(false);
  const {
    dispatch
  } = useContext(MenuContext);
  const refBtnCollapse = useRef(null);
  const elements =
    item?.mainNavCollection?.items?.length > 0 ||
    item?.secondaryNavCollection?.items?.length > 0;

  const onPanel = () => {
    setPanel(!panel);
    if (setParentPanel) setParentPanel(!parentPanel);
    dispatch({
      type: "setLevel",
      value: { level: !panel ? next : prev - 1, nav: next ? parent : null },
    });
  };

  const handlerClick = (evt, item) => {
    const isLink = evt?.target?.tagName?.toLowerCase() === "a";
    if (isLink) close();
    else if (
      next % 2 == 0 &&
      item?.mainNavCollection?.items?.length > 0 &&
      !panel
    )
      onPanel();
  };

  useEffect(() => {
    const btn = refBtnCollapse.current;
    if (btn) {
      const current_li = btn.parentElement;
      const ul_panel = current_li.childNodes[1];
      const ul = current_li.parentElement;
      const all_li = ul.childNodes;
      btn.onclick = () => {
        ul_panel.style.maxHeight = ul_panel.scrollHeight + "px";
        if (current_li.classList.contains("open")) {
          current_li.classList.remove("open");
        } else {
          all_li.forEach((li) => li.classList.remove("open"));
          current_li.classList.add("open");
        }
      };
    }
  }, []);

  return (
    <>
      <li
        className={classNames(
          next % 2 != 0 && elements ? "collapse-list" : null,
          parentPanel && panel
            ? "absolute top-0 left-0 w-full translate-x-[calc(1rem_+_100%)] open"
            : null,
          next % 2 != 0 && !noBorder ? "border-b border-neutral-70" : null,
          next % 2 == 0 ? "item-panel" : null,
          !item?.promoTitle && "border-transparent",
          "flex flex-col font-bold text-blue-dark empty:hidden"
        )}
      >
        {parentPanel && panel && (
          <span
            className="font-bold cursor-pointer order-first flex gap-2 items-center h-[50px] aspect-[180/52] absolute bg-white bottom-full left-0 mb-3"
            onClick={onPanel}
          >
            <Icon icon="back" className="w-[14px] h-4" aria-hidden="true" />
            Menú principal
          </span>
        )}
        {
          <span
            ref={next % 2 != 0 && elements ? refBtnCollapse : null}
            className={classNames(
              panel ? "mb-4" : null,
              next % 2 != 0 &&
                elements &&
                getBackgroundColorClass(item.backgroundColor ?? "Azul Oscuro")
                  .background,
              "transition py-2.5 px-3.5 flex items-center gap-2 relative cursor-pointer"
            )}
            onClick={(evt: any) => handlerClick(evt, item)}
          >
            {item.promoIcon && (
              <span className="flex items-center shrink-0 w-6 h-6">
                <Icon
                  icon={item.promoIcon}
                  className="w-full h-full"
                  aria-hidden="true"
                />
              </span>
            )}
            {item?.internalLink?.urlPaths?.[0] ||
            item?.urlPaths?.[0] ||
            item?.externalLink ? (
              <CustomLink
                content={{ ...item, ...{ linkView: "" } }}
                className="pointer-events-none"
                linkClassName={classNames(
                  "py-2.5 px-3.5 -my-2.5 -mx-3.5",
                  !elements && "flex-grow"
                )}
              >
                {item.promoTitle ?? item.name}
              </CustomLink>
            ) : (
              <span className="py-2.5 px-3.5 -my-2.5 -mx-3.5">
                {item.promoTitle ?? item.name}
              </span>
            )}
            {next % 2 != 0 && elements && (
              <span className="btn-collpase font-bold cursor-pointer absolute right-3 top-1/2 z-10 -translate-y-1/2">
                <Icon
                  icon={"arrow-down"}
                  className="w-7 h-7"
                  aria-hidden="true"
                />
              </span>
            )}
            {next % 2 == 0 &&
              item?.mainNavCollection?.items?.length > 0 &&
              !panel && (
                <span className="font-bold cursor-pointer absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <Icon
                    icon="arrow-right"
                    className="w-7 h-7"
                    aria-hidden="true"
                  />
                </span>
              )}
          </span>
        }
        {elements && children}
      </li>
    </>
  );
};

const NavList = ({
  items,
  level,
  utilityNavCollection,
  close,
  id = "",
  currentPanel = null,
  hasSetCurrentPanel = null,
  noBorder = false,
  className = "",
}) => {
  const { state } = useContext(MenuContext);
  const [panel, setPanel] = useState(false);
  const setCurrentPanel = hasSetCurrentPanel ?? setPanel;
  const refList = useRef<HTMLUListElement>(null);

  const lv = level + 1;
  const col = Math.floor(state.level / 2);

  return (
    <>
      <ul
        ref={refList}
        className={classNames(
          className,
          lv % 2 == 0 ? "collapse-panel" : null,
          level % 2 == 0 && !noBorder
            ? "border-t border-neutral-70 my-[-1px]"
            : null
        )}
        style={{
          transform:
            panel && level == 0
              ? `translateX(calc(${col} * (-100% - 1rem)))`
              : null,
        }}
      >
        {level == 1 && (
          <div className="flex flex-col gap-3 my-4">
            <CustomLink
              content={{ urlPaths: ["/registro"] }}
              className="!block text-center button button-primary"
              onClick={() => close()}
            >
              Regístrate
            </CustomLink>
            <CustomLink
              content={{ urlPaths: ["/acceso"] }}
              className="!block text-center button button-outline"
              onClick={() => close()}
            >
              Inicia sesión
            </CustomLink>
          </div>
        )}
        {items?.map((item) => (
          <NavItem
            key={`${item?.sys?.id}-lv${lv}`}
            item={item}
            next={lv}
            prev={level}
            parent={id}
            noBorder={noBorder}
            parentPanel={currentPanel}
            setParentPanel={setCurrentPanel}
            close={close}
          >
            {item?.mainNavCollection?.items?.length > 0 && (
              <NavList
                utilityNavCollection={utilityNavCollection}
                level={lv}
                items={item?.mainNavCollection?.items}
                currentPanel={panel}
                hasSetCurrentPanel={setPanel}
                id={id}
                close={close}
              />
            )}
            {item?.secondaryNavCollection?.items?.length > 0 && level === 0 && (
              <NavList
                utilityNavCollection={utilityNavCollection}
                level={lv}
                items={item?.secondaryNavCollection?.items}
                currentPanel={panel}
                hasSetCurrentPanel={setPanel}
                id={id}
                close={close}
              />
            )}
          </NavItem>
        ))}
        {level == 1 && utilityNavCollection?.items?.length > 0 && (
          <nav
            aria-label="Utility"
            className="relative p-5 border-t border-neutral-70 mt-2"
          >
            <ul className="flex gap-2 flex-nowrap justify-center">
              {utilityNavCollection?.items?.map((item) => (
                <li className="flex w-[75px]" key={item?.sys?.id}>
                  <CustomLink
                    onClick={() => close()}
                    content={{ ...item, ...{ linkView: "" } }}
                    className={classNames(
                      "text-blue-dark group/icon hover:bg-blue-dark transition hover:text-white rounded-md bg-category-blue-light-90 flex flex-col items-center text-xs leading-none text-center font-light gap-0.5 px-2 py-3 w-full h-full",
                      item.promoIcon ? "justify-start" : "justify-center"
                    )}
                    linkClassName="block w-full"
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
        )}
      </ul>
    </>
  );
};

const MegaMenuMobile = ({
  items,
  secondaryNavCollection,
  utilityNavCollection,
  close,
}) => {
  return (
    <MenuState>
      <MenuContext.Consumer>
        {({ state: { level, nav } }) => (
          <div className="relative">
            {(!level || nav == "nav-1") && (
              <NavList
                level={0}
                items={items}
                className="mb-3"
                id="nav-1"
                utilityNavCollection={utilityNavCollection}
                close={close}
              />
            )}
            {(!level || nav == "nav-2") && (
              <NavList
                level={0}
                noBorder={true}
                id="nav-2"
                items={secondaryNavCollection?.items}
                utilityNavCollection={utilityNavCollection}
                close={close}
              />
            )}
          </div>
        )}
      </MenuContext.Consumer>
    </MenuState>
  );
};

export default MegaMenuMobile;
