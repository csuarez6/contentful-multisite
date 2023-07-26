import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classColumns, classNames } from "@/utils/functions";
import Icon from "@/components/atoms/icon/Icon";
import defaultFormatOptions from "@/lib/richtext/default.formatter";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";

const Accordion: React.FC<any> = ({
  featuredContents,
  columnsSize,
  displayIcon,
}) => {
  return (
    <div className={classNames("grid", classColumns(columnsSize ?? "2"))}>
      {featuredContents?.items?.map((el, index) => {
        console.log(el.promoDescription)
        if (!el?.promoTitle && !el?.name) return;
        return (
          <Disclosure
            as="div"
            key={`${el.name}-${index}`}
            className="first:border-0 border-t border-neutral-80"
          >
            {({ open }) => {
              let contentJson = el?.content?.json;
              if (attachLinksToRichtextContent && contentJson) {
                contentJson = attachLinksToRichtextContent(
                  contentJson,
                  el?.content?.links ?? []
                );
              }
              return (
                <>
                  <div className="text-lg cursor-pointer">
                    <Disclosure.Button
                      as="div"
                      role="button"
                      className={`flex w-full items-center justify-between px-7 text-left text-gray-400 py-6`}
                    >
                      <div className="flex items-center gap-3">
                        {el.promoIcon && displayIcon && (
                          <span className={`flow-root shrink-0 w-7 h-7 -my-2`}>
                            <Icon
                              icon={el.promoIcon}
                              className="mx-auto w-full h-full text-blue-dark"
                            />
                          </span>
                        )}
                        <h3 className="text-blue-dark text-size-subtitle1 !mb-0">
                          {el.promoTitle ?? el.name}
                        </h3>
                      </div>
                      <span className="flex w-7 justify-center items-center h-auto">
                        <ChevronDownIcon
                          className={classNames(
                            open ? "-rotate-180" : "rotate-0",
                            "flex w-full h-auto transform text-neutral-30"
                          )}
                          aria-hidden="true"
                          width={10}
                          height={5}
                        />
                      </span>
                    </Disclosure.Button>
                  </div>
                  <Transition
                    show={open}
                    enter="transition-all ease-in duration-700"
                    enterFrom="max-h-0 opacity-0"
                    enterTo="max-h-screen opacity-100"
                    leave="transition-all ease-out duration-500"
                    leaveFrom="max-h-screen opacity-100"
                    leaveTo="max-h-0 opacity-0"
                  >
                    <Disclosure.Panel
                      as="div"
                      className={`pb-6 ${
                        el.promoIcon && displayIcon ? "px-10" : ""
                      }`}
                    >
                      <div className="text-base text-gray-500 px-7 custom-text">
                        {documentToReactComponents(
                          el?.promoDescription?.json,
                          defaultFormatOptions
                        )}
                        {documentToReactComponents(
                          contentJson,
                          defaultFormatOptions
                        )}
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              );
            }}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default Accordion;
