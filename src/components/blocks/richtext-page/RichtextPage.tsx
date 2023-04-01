import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import defaultFormatOptions from "@/lib/richtext/default.formatter";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";

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
      return <h2 className="text-blue-dark !mb-9">{children}</h2>;
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

const RichtextPage: React.FC<IPage> = (props) => {
  const { content, showHeader, promoTitle, promoImage, relatedContentCollection } = props;

  return (
    <section className="section flex gap-10 md:gap-16">
      <div className="content-page flex flex-col gap-16">
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
        <div className="richtext-container grow">
          {documentToReactComponents(content.json, richtextFormatOptions)}
        </div>
      </div>
      {relatedContentCollection?.items?.length > 0 && (
        <div className="w-[278px] flex flex-col gap-5 shrink-0 mt-16 p-6">
          <p className="title is-4 text-neutral-30 !font-semibold">Enlaces relacionados</p>
          <div className="flex flex-col gap-7 pl-3">
            {relatedContentCollection.items.map(el => (
              <CustomLink content={el} key={el.sys.id} className="w-full border-b border-neutral-70 pb-2">
                <div className="flex flex-nowrap items-baseline gap-[10px]">
                  {!el.promoIcon && <span className="w-6 h-6 shrink-0 text-neutral-30"><Icon icon={"alert"} className="w-full h-full" /></span>}
                  <span className="text-grey-30 hover:text-blue-dark text-size-p2 leading-[1.3] font-medium">{el.promoTitle || el.name}</span>
                </div>
              </CustomLink>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default RichtextPage;
