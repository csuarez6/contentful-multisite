import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import defaultFormatOptions from "@/lib/richtext/default.formatter";

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
  const { content, showHeader, promoTitle, promoImage } = props;

  return (
    <section className="section grid gap-10 md:gap-16">
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
      <div className="content-page">
        <div className="richtext-container">
          {documentToReactComponents(content.json, richtextFormatOptions)}
        </div>
      </div>
    </section>
  );
};

export default RichtextPage;
