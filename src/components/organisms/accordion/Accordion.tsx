import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { classColumns, classNames } from '@/utils/functions';
import Icon from "@/components/atoms/icon/Icon";

const Accordion: React.FC<any> = ({ featuredContents, columnsSize, displayIcon }) => {
  return (
    <dl className={classNames("grid gap-3", classColumns(columnsSize ?? '2'))}>
      {featuredContents.items.map((el, i) => {
        if (!el.promoTitle && !el.name) return;
        return (
          <Disclosure
            as="div"
            key={i}
            className="border-t border-neutral-80"
          >
            {({ open }) => (
              <div>
                <dt className="text-lg">
                  <Disclosure.Button
                    className={`flex w-full items-center justify-between pl-7 text-left text-gray-400 pt-[24px] ${!open ? "md:mb-[55px] mb-7" : ""
                      }`}
                  >
                    <div className="flex">
                      {(el.promoIcon && displayIcon) && (
                        <span className={`flow-root shrink-0 w-7 h-7 mr-2`}>
                          <Icon icon={el.promoIcon} className="mx-auto w-full h-full text-blue-dark" />
                        </span>
                      )}
                      <h3 className="text-blue-dark text-size-subtitle1">
                        {el.promoTitle ?? el.name}
                      </h3>
                    </div>
                    <span className="flex w-8 justify-center items-center h-full mr-2">
                      <ChevronDownIcon
                        className={classNames(
                          open ? "-rotate-180" : "rotate-0",
                          "flex w-8 h-auto transform text-neutral-30"
                        )}
                        aria-hidden="true"
                        width={10}
                        height={5}
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2  pl-7 pr-12">
                  <div className="text-base text-gray-500">
                    {documentToReactComponents(el?.promoDescription?.json)}
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        );
      })}
    </dl>
  );
};

export default Accordion;
