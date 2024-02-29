import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Options, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";

import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { classNames } from "@/utils/functions";
import { useWindowScroll, useWindowSize } from "react-use";
import Icon from "@/components/atoms/icon/Icon";

const formatOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <a
          className="text-blue-dark hover:text-category-blue-dark underline"
          href={node.data.uri}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    }
  }
};

interface ICookieModal extends INavigation {
  onClose?: () => void;
}

const CookieModal: React.FC<ICookieModal> = ({
  promoTitle,
  onClose = () => null,
  mainText,
  secondaryText
}) => {
  const [topElement, setTopElement] = useState("0px");
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cookiePolicy, setCookiePolicy] = useState(null);
  const cookieName = "cookie_policy";

  const customEvent = new Event("CookieModalClosed");

  const { width } = useWindowSize();
  const { y } = useWindowScroll();

  const setCookies = () => {
    const cookie = Cookies.get(cookieName);
    setCookiePolicy(cookie ?? null);
    setShowModal(!cookie);
    if (cookie) dispatchEvent(customEvent);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookiePolicy]);

  const calcTop = () => {
    const headerElement: any = document?.querySelector("#header");
    const headerRect = headerElement?.getBoundingClientRect();
    const calcTop = headerRect?.height + headerRect?.top;
    if (width < 768) {
      setTopElement(`${(calcTop >= 0 ? calcTop : 0) + 20}px`);
    } else {
      setTopElement('unset');
    }
  };

  useEffect(() => {
    calcTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, y]);

  useEffect(() => {
    const customEvent = () => calcTop();
    window.addEventListener("CookieModalClosed", customEvent);

    return () => window.removeEventListener("CookieModalClosed", customEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 1);

    const cookie = Cookies.set(cookieName, "yes", {
      expires: expireDate
    });
    setCookiePolicy(cookie);
    dispatchEvent(customEvent);
    onClose();
  };

  if (cookiePolicy) return;

  return (
    <div
      id="cookie-policy"
      className={classNames(
        "w-full flex justify-center items-center z-50 md:bottom-0 fixed right-0 mx-auto md:m-0 px-3 sm:px-5 md:px-0",
        showModal ? "block" : "hidden"
      )}
      style={{ top: topElement }}
    >
      <div className={classNames(
        "relative w-full rounded-xl bg-neutral-90 border border-blue-dark border-opacity-40 md:border-none md:rounded-none",
        "md:bg-white md:align-middle md:shadow-[-2px_-2px_0px_0px_rgb(0,0,0,0.04),2px_2px_4px_0px_rgb(0,0,0,0.08)] flex flex-col gap-12 justify-end"
      )}>
        <div className="block md:flex md:flex-col">
          {promoTitle && (
            <div className="bg-blue-dark px-6 py-3 hidden md:block">
              <h3 className="text-white title is-4">
                {promoTitle}
              </h3>
            </div>
          )}
          <div className="flex gap-2 p-3 md:px-5 md:mb-2">
            <button className='w-7 h-7 shrink-0 flex md:hidden'>
              <Icon
                icon="info"
                className="w-full h-full text-blue-dark"
                aria-hidden="true"
              />
            </button>

            <div className="flex flex-col md:flex-row flex-nowrap md:items-center gap-2 md:gap-4 grow">
              {isMounted && mainText && (
                <div className="text-grey-30 text-[12px] md:text-[16px] leading-snug hidden md:block">
                  {documentToReactComponents(mainText?.json, formatOptions)}
                </div>
              )}
              {isMounted && secondaryText && (
                <div className="text-grey-30 text-[12px] md:text-[16px] leading-snug block md:hidden">
                  {documentToReactComponents(secondaryText?.json, formatOptions)}
                </div>
              )}

              <div className="flex self-start md:hidden">
                <button className="text-[12px] leading-tight mb-1 underline" onClick={handleClose}>
                  Aceptar
                </button>
              </div>

              <div className="w-auto hidden md:block">
                <button className="button button-outline shadow-xl text-[14px] !leading-tight" onClick={handleClose}>
                  Aceptar
                </button>
              </div>
            </div>

            <div className="flex md:hidden">
              <button className='w-7 h-7 -mt-1 -mr-1 shrink-0' onClick={() => {
                setShowModal(false);
                setTimeout(() => {
                  dispatchEvent(customEvent);
                }, 100);
              }}>
                <Icon
                  icon="close"
                  className="text-blue-dark hover:text-grey-30"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
