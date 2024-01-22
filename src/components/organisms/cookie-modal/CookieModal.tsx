import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { classNames } from "@/utils/functions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";

interface ICookieModal extends INavigation {
  onClose?: () => void;
}

const CookieModal: React.FC<ICookieModal> = ({
  promoTitle,
  onClose = () => null,
  mainText,
}) => {
  const [testCookie, setTestCookie] = useState("noCookie");
  const expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 10);
  const setCookies = () => {
    const cookie = Cookies.get("cookie_policy");
    setTestCookie(cookie);
    if (cookie) return;
  };
  useEffect(() => {
    setCookies();
  }, [testCookie]);

  const handleClose = () => {
    const cookie = Cookies.set("cookie_policy", "yes", {
      expires: expireDate
    });
    setTestCookie(cookie);
    onClose();
  };
  return (
    <div
      className={classNames(
        "w-full flex justify-center items-center p-2 sm:p-4 max-w-[500px] z-50 bottom-0 fixed right-0",
        testCookie ? "hidden" : "block"
      )}
    >
      <div
        className={classNames(
          "relative transform w-full rounded-lg bg-white align-middle shadow-xl transition-all flex flex-col gap-12 justify-end"
        )}
      >
        <div>
          {(promoTitle || mainText) && (
            <div className="flex flex-col">
              {promoTitle && (
                <div className="bg-blue-dark px-6 py-4 rounded-t-lg">
                  <h3 className="!text-white !m-0">
                    {promoTitle ?? "Política de Cookies"}
                  </h3>
                </div>
              )}
              {mainText && (
                <div className="text-grey-30 text-size-p3 md:text-size-p1 pt-3 pr-2 pl-5 richtext-container">
                  {documentToReactComponents(mainText?.json)}
                </div>
              )}
              <div className="w-full pr-2 pb-4 pl-5 flex justify-end">
                <button
                  className="button button-outline shadow-xl"
                  onClick={handleClose}
                >
                  Aceptar 
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
