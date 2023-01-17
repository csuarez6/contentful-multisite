import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import { NextPageWithLayout } from "../_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";

import getPageContent from "@/lib/services/page-content.service";
import jsonToReactComponents from "@/lib/services/render-blocks.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";

const CustomPage: NextPageWithLayout = ({ blocksCollection }: IPage) => {
  return <>{jsonToReactComponents(blocksCollection.items)}</>;
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPage>> => {
  const slugArray =
    typeof context.params.slug === "string"
      ? ["", context.params.slug]
      : ["", ...context.params.slug];

  const pageContent = await getPageContent(
    slugArray.join("/"),
    context.preview ?? false
  );

  // console.log('Página cargada');
  if (!pageContent) return { notFound: true };

  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(
    DEFAULT_FOOTER_ID,
    context.preview ?? false,
    2
  );

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo,
        headerInfo,
      },
    },
    revalidate: 10,
  };
};

export default CustomPage;
