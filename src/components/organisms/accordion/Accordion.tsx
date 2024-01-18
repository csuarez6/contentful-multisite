import { useEffect, useState, useRef } from "react";
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
  const $panelAccordion = useRef(null);
  const [accordions, setAccordions] = useState([]);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (domLoaded) {
      const $content = $panelAccordion.current.querySelectorAll("[data-content-accordion]");
      const $accordion = [];
      $content.forEach((item, index) => {
        item.style.height = item.firstChild.clientHeight + "px";
        $accordion[index] = false;
      });

      window.onresize = () => {
        $content.forEach((item, _index) => {
          item.style.height = item.firstChild.clientHeight + "px";
        });
      };

      setAccordions($accordion);
    }
  }, [domLoaded]);

  const onToggle = (index) => {
    setAccordions((state) =>
      state.map((item, i) => (i == index ? !item : false))
    );
  };

  return (
    <div ref={$panelAccordion} className={classNames("grid", classColumns(columnsSize ?? "2"))}>
      {featuredContents?.items?.map((el, index) => {
        if (!el?.promoTitle && !el?.name) return;
        let contentJson = el?.content?.json;
        if (attachLinksToRichtextContent && contentJson) {
          contentJson = attachLinksToRichtextContent(
            contentJson,
            el?.content?.links ?? []
          );
        }
        return (
          <div
            key={`${el.name}-${index}`}
            className="first:border-0 border-t border-neutral-80 group"
          >
            <div className="text-lg cursor-pointer">
              <div
                onClick={() => onToggle(index)}
                role="button"
                className={`flex w-full items-center justify-between px-7 text-left text-gray-400 py-6`}
              >
                <div className="flex items-center gap-3 flex-grow">
                  {el.promoIcon && displayIcon && (
                    <span className="flow-root shrink-0 w-7 h-7 -my-2 group-hover:scale-110 transition-transform">
                      <Icon
                        icon={el.promoIcon}
                        className="mx-auto w-full h-full text-blue-dark"
                      />
                    </span>
                  )}
                  <h3 className="text-blue-dark group-hover:text-category-blue-dark text-size-subtitle1 !mb-0 w-1 flex-grow">
                    {el.promoTitle ?? el.name}
                  </h3>
                </div>
                <span className="flex w-7 justify-center items-center h-auto">
                  <ChevronDownIcon
                    className={classNames(
                      accordions[index] ? "-rotate-180" : "rotate-0",
                      "flex w-full h-auto transform text-neutral-30"
                    )}
                    aria-hidden="true"
                    width={10}
                    height={5}
                  />
                </span>
              </div>
            </div>
            <div className={`overflow-hidden flex flex-col transition-[height] duration-500 ${!accordions[index] && "!h-0"}`} data-content-accordion>
              {domLoaded && (el?.promoDescription?.json || contentJson) && (
                <div className="text-base text-gray-500 px-7 richtext-container custom-text">
                  {documentToReactComponents(
                    el?.promoDescription?.json,
                    defaultFormatOptions
                  )}
                  {documentToReactComponents(contentJson, defaultFormatOptions)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
