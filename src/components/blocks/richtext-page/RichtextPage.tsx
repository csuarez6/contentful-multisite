import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import defaultFormatOptions from "@/lib/richtext/default.formatter";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { classNames } from "@/utils/functions";
import { useEffect, useState } from "react";
import { attachLinksToRichtextContent } from "@/lib/services/render-blocks.service";

const fixId = (value) => {
  const newId = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return newId.replaceAll(' ', '-');
};

const pageFormatOptions: Options = {
  renderNode: {
    [BLOCKS.HR]: () => {
      return <div className="my-5"></div>;
    },
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return <p className="text-grey-30 text-size-p1">{children}</p>;
    },
    [BLOCKS.HEADING_1]: (_node, children) => {
      return <h1 className="text-blue-dark !mb-9">{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (_node, children) => {
      return <h2 id={fixId(children[0])} className="text-blue-dark !mb-9 scroll-m-44 lg:scroll-m-56">{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (_node, children) => {
      return <h3 className="text-blue-dark !mb-5">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (_node, children) => {
      return <h4 className="text-blue-dark">{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (_node, children) => {
      return <h5 className="text-blue-dark">{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (_node, children) => {
      return <h6 className="text-blue-dark">{children}</h6>;
    },
  }
};

const richtextFormatOptions = {
  renderNode: {
    ...defaultFormatOptions.renderNode,
    ...pageFormatOptions.renderNode
  }
};

const filterHeading = (objData) => {
  const _data = objData?.filter((item) => item.nodeType === "heading-2");
  return _data.map(el => {
    return { value: el.content[0].value };
  });
};

const RichtextPage: React.FC<IPage> = (props) => {
  const { content, showHeader, promoTitle, promoImage, relatedContentCollection } = props;
  const filteredHeading = filterHeading(content?.json?.content);
  const [currentIndex, setCurrentIndex] = useState(0);
  const calcScroll = () => {
    const header: HTMLElement = document.querySelector('header');
    const sectionHeaders: NodeListOf<HTMLElement> = document.querySelectorAll('.richtext-container h2');

    sectionHeaders.forEach((heading, key) => {
      const rect = heading.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = (viewportHeight - header.offsetHeight) / 2;
      const elementCenter = rect.top + rect.height / 2;
      const isInViewportCenter = elementCenter > (viewportCenter - (rect.height / 2)) && elementCenter < (viewportCenter + (rect.height / 2));

      if (isInViewportCenter) {
        setCurrentIndex(key);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => calcScroll());
  }, []);

  let contentJson = content?.json;
  if (attachLinksToRichtextContent && contentJson) {
    contentJson = attachLinksToRichtextContent(contentJson, content?.links ?? []);
  }

  return (
    <section className="section flex gap-10 md:gap-16 px-12">
      <div className="content-page flex flex-col grow gap-16">
        {showHeader && (promoTitle || promoImage) && (
          <div className="flex flex-col gap-8">
            {promoTitle && <h1 className="text-blue-dark">{promoTitle}</h1>}
            {promoImage && (
              <figure className="relative">
                <Image
                  className="w-full h-full object-cover aspect-[764/194] rounded-xl"
                  src={promoImage.url}
                  alt={promoImage.title}
                  width={promoImage.width}
                  height={promoImage.height}
                />
              </figure>
            )}
          </div>
        )}
        {contentJson && (
          <div className="richtext-container grow">
            {documentToReactComponents(contentJson, richtextFormatOptions)}
          </div>
        )}
      </div>
      {(relatedContentCollection?.items?.length > 0 || filteredHeading?.length > 0) && (
        <div className="mt-16 hidden lg:flex flex-col gap-4 w-[278px] shrink-0">
          {relatedContentCollection?.items?.length > 0 && (
            <div className="flex flex-col gap-5 p-6">
              <p className="title is-4 text-neutral-30 !font-semibold">Enlaces relacionados</p>
              <div className="flex flex-col gap-7 pl-3">
                {relatedContentCollection.items.map(el => (
                  <CustomLink content={el} key={el?.sys?.id} className="w-full border-b border-neutral-70 pb-2">
                    <div className="flex flex-nowrap items-baseline gap-[10px]">
                      {el?.promoIcon && <span className="w-6 h-6 shrink-0 text-neutral-30"><Icon icon={el.promoIcon} className="w-full h-full" /></span>}
                      <span className="text-grey-30 hover:text-blue-dark text-size-p2 leading-[1.3] font-medium">{el?.promoTitle || el?.name}</span>
                    </div>
                  </CustomLink>
                ))}
              </div>
            </div>
          )}
          {filteredHeading?.length > 0 && (
            <div className="flex flex-col gap-3 sticky top-56">
              <p className="title is-4 text-neutral-30 !font-semibold pl-6">En esta página:</p>
              <div className="flex flex-col gap-3">
                {filteredHeading.map((item, idxHeading) =>
                  <a
                    href={`#${fixId(item.value)}`}
                    key={`#${item.value}`}
                    onClick={() => setCurrentIndex(idxHeading)}
                    className={classNames(
                      (idxHeading + 1 == 1) && "border-blue-dark",
                      "flex items-center justify-between px-6 py-3 bg-white border rounded-xl shadow-[-2px_-2px_0px_rgba(0,0,0,0.04),2px_2px_4px_rgba(0,0,0,0.08)]"
                    )}
                  >
                    <span className="text-blue-dark max-w-[164px] font-bold text-base leading-5">{item.value}</span>
                    <span className="flex text-neutral-30 items-center shrink-0 w-[34px] h-[34px]">
                      {(idxHeading <= currentIndex) ?
                        <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="17.5" cy="17" r="14" fill="#113455" />
                          <path d="M13.2768 17.1231H11.2098C10.445 17.1231 9.96331 17.9467 10.3383 18.6133L13.644 24.4903C13.8212 24.8051 14.1543 25 14.5156 25H18.1864C18.5905 25 18.9549 24.7568 19.1099 24.3836L24.9253 10.3836C25.1988 9.72505 24.7149 9 24.0018 9H21.2489C20.8425 9 20.4766 9.24589 20.323 9.6221L16.5477 18.8715C16.2137 19.6899 15.06 19.7042 14.7057 18.8944L14.1929 17.7223C14.0337 17.3583 13.6741 17.1231 13.2768 17.1231Z" fill="white" stroke="#F6F8F9" stroke-width="0.5" />
                          <circle cx="17.5" cy="17" r="16.75" stroke="#113455" stroke-width="0.5" />
                        </svg>
                        :
                        <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="17.5" cy="17" r="16.75" stroke="#113455" stroke-width="0.5" />
                        </svg>
                      }
                    </span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default RichtextPage;
