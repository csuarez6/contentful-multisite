import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { classNames } from "@/utils/functions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react";

const HelpButton: React.FC<INavigation> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(true);
  const { promoTitle, mainText, secondaryText, mainNavCollection } = props;
  if (!props) return;

  return (
    <div className="hidden md:block fixed bottom-[60px] right-[60px] z-50">
      {(message || open) &&
        <div className={
          classNames(
            open ? "bottom-full right-0 mb-3" : "bottom-0 right-full mr-3",
            "flex flex-col gap-4 absolute pt-2 px-3 pb-3 bg-white shadow rounded-md"
          )
        }>
          <div className={
            classNames(
              open ? "items-center" : "pr-6",
              "relative whitespace-nowrap flex flex-col justify-end"
            )
          }>
            {promoTitle && (
              <h4 className={
                classNames(
                  open && "flex-col",
                  "flex items-center text-blue-dark text-base gap-1"
                )
              }>
                <Icon icon="check-vanti" className="w-4 h-4" />
                {promoTitle}
              </h4>
            )}
            {
              !open
                ? (mainText && <div className="text-sm">{documentToReactComponents(mainText.json)}</div>)
                : (secondaryText && <div className="text-sm">{documentToReactComponents(secondaryText.json)}</div>)
            }
            {!open && (
              <span className="block absolute right-0 top-0 cursor-pointer" onClick={() => setMessage(false)}>
                <Icon icon="close" className="block w-7 -m-2 text-neutral-30" />
              </span>
            )}
          </div>
          {open && (
            <div className="w-60">
              {mainNavCollection?.items?.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {mainNavCollection.items.map((item) => (
                    (item?.internalLink || item?.externalLink) && (
                      <CustomLink
                        linkClassName="transition bg-neutral-90 text-blue-dark hover:bg-blue-dark hover:text-white rounded-lg p-4"
                        content={item}
                        className="flex flex-col text-center items-center gap-2 text-sm"
                        key={item?.promoTitle}
                      >
                        {item?.promoIcon && (<Icon icon={item.promoIcon} className="w-10 h-10" />)}
                        <p>{item.promoTitle ?? item.name}</p>
                      </CustomLink>
                    )
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      }

      <div
        onClick={() => setOpen(!open)}
        className="flex rounded-full w-16 h-16 shrink-0 aspect-square bg-lucuma p-2.5 cursor-pointer"
        data-testid="element"
      >
        <Icon
          icon={!open ? "customer-service" : "close"}
          className="w-full h-full m-auto"
        />
      </div>
    </div>
  );
};

export default HelpButton;
