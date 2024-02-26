import React, { useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';
import Cookies from "js-cookie";

import { IPromoContent } from '@/lib/interfaces/promo-content-cf.interface';
import Icon from '@/components/atoms/icon/Icon';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { classNames } from '@/utils/functions';

const TermsOfServices: React.FC<IPromoContent> = ({ promoIcon, promoDescription }) => {
  const [topElement, setTopElement] = useState("0px");
  const [showModal, setShowModal] = useState(false);
  const [cookiePolicy, setCookiePolicy] = useState(null);
  const cookieName = "cookie_terms";

  const { width } = useWindowSize();
  const { y } = useWindowScroll();

  const setCookies = () => {
    const cookie = Cookies.get(cookieName);
    setCookiePolicy(cookie ?? null);
    setShowModal(!cookie);
  };

  useEffect(() => {
    setCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookiePolicy]);

  const handleClose = () => {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    const cookie = Cookies.set(cookieName, "yes", {
      expires: expireDate
    });
    setCookiePolicy(cookie);
  };

  const calcTop = () => {
    const headerElement: any = document?.querySelector("#header");
    const headerRect = headerElement?.getBoundingClientRect();
    const cookieElement: any = document?.querySelector("#cookie-policy");
    const cookieRect = cookieElement?.getBoundingClientRect();
    let calcTop = headerRect?.height + headerRect?.top;
    calcTop = calcTop >= 0 ? calcTop: 0;

    if (width < 768) {
      setTopElement(`${(cookieElement ? calcTop + cookieRect?.height + 30 : calcTop + 20)}px`);
    } else {
      setTopElement(`${(calcTop + 20)}px`);
    }
  };

  useEffect(() => {
    calcTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, y]);

  useEffect(() => {
    setTimeout(() => {
      calcTop();
    }, 100);

    const customEvent = () => calcTop();
    window.addEventListener("CookieModalClosed", customEvent);

    return () => window.removeEventListener("CookieModalClosed", customEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cookiePolicy) return;

  return (
    <div id='cookie-terms' className="main-container w-full">
      <div
        className={classNames(
          "fixed max-w-full lg:max-w-sm main-container !pl-0 lg:!p-0 z-50",
          showModal ? "block" : "hidden"
        )}
        style={{ top: topElement }}
      >
        <div className="p-3 rounded-xl bg-neutral-90 border border-blue-dark border-opacity-40 flex flex-col gap-3">
          <div className="flex gap-2 h-full">
            {promoIcon && (
              <Icon
                icon={promoIcon}
                className="w-7 h-7 shrink-0 text-blue-dark"
                aria-hidden="true"
              />
            )}

            <div className="flex flex-col gap-2">
              {promoDescription && (
                <div className="text-xs md:text-size-p3 text-grey-30 mt-1">
                  {documentToReactComponents(promoDescription.json)}
                </div>
              )}

              <div className="flex">
                <button className="text-left text-[12px] leading-tight mb-1 underline" onClick={handleClose}>
                  Aceptar
                </button>
              </div>
            </div>

            <div className="flex">
              <button className='w-7 h-7 -mt-1 -mr-1 shrink-0' onClick={() => { setShowModal(false); }}>
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

export default TermsOfServices;