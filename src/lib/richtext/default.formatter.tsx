import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";
import CustomTable from "@/components/organisms/custom-table/CustomTable";
import jsonToReactComponent from "../services/render-cards.service";

const defaultFormatOptions: Options = {
  renderNode: {
    [BLOCKS.HR]: () => {
      return <div className="my-5"></div>;
    },
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return <p>{children}</p>;
    },
    [BLOCKS.HEADING_1]: (_node, children) => {
      return <h1>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (_node, children) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (_node, children) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (_node, children) => {
      return <h4>{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (_node, children) => {
      return <h5>{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (_node, children) => {
      return <h6>{children}</h6>;
    },
    [BLOCKS.UL_LIST]: (_node: any, children: any) => {
      return <ul>{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (_node: any, children: any) => {
      return <ol>{children}</ol>;
    },
    [BLOCKS.LIST_ITEM]: (_node: any, children: any) => {
      return (
        <li>
          <div>{children}</div>
        </li>
      );
    },
    [BLOCKS.TABLE]: (_node: any, children: any) => (
      <CustomTable>
        {children}
      </CustomTable>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
      <th className="pointer-events-auto first:sticky left-0 block w-1/2 flex-shrink-0 md:table-cell md:w-auto px-6 py-4 bg-neutral-90 text-grey-10 !font-semibold">{children}</th>
    ),
    [BLOCKS.TABLE_ROW]: (_node: any, children: any) => (
      <tr className="overflow-hidden pointer-events-none scroll-smooth group-[.touchOn]:scroll-auto flex md:table-row w-full text-center border-neutral-80 ">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (_node: any, children: any) => (
      <td className="pointer-events-auto first:sticky left-0 block w-1/2 flex-shrink-0 md:table-cell md:w-auto px-6 py-4 first:bg-grey-90 bg-white border-t border-neutral-80 text-center first:text-left text-grey-30 first:text-grey-10 leading-none">{children}</td>
    ),
    [BLOCKS.QUOTE]: (_node, children) => {
      return (
        <blockquote>{children}</blockquote>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, title, description, width, height } = node.data.target;
      return url ? (
        <>
          <figure className="w-full mt-10 block text-center">
            <Image
              src={url}
              className="w-auto h-auto max-w-full"
              alt={title ?? description}
              width={width}
              height={height}
            />
          </figure>
        </>
      ) : null;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      let isButton = false;
      for (const ct of node.content) {
        if (!ct["marks"] || ct["marks"] == undefined || ct["marks"] == null) {
          continue;
        }
        const marks = ct["marks"];

        isButton = marks.some((m) => m.type == "italic");
        if (isButton) {
          break;
        }
      }

      return (
        <a
          className={`text-violet-500 underline ${
            isButton ? "inline-cta-button" : ""
          }`}
          href={node.data.uri}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      return jsonToReactComponent(node.data.target);
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => { 
      return jsonToReactComponent(node.data.target);
    }
  },
};

export default defaultFormatOptions;
