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
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import getEntryContent from "@/lib/services/entry-content.service";

const CustomPage: NextPageWithLayout = ({ blocksCollection }: IPage) => {
  return (
    <>
      {jsonToReactComponents(blocksCollection.items)}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPage>> => {
  const pageContent = await getPageContent(
    context.params.slug,
    context.preview ?? false
  );
  const footerInfo = await getEntryContent({
    __typename: CONTENTFUL_TYPENAMES.AUX_NAVIGATION,
    sys: {
      id: DEFAULT_FOOTER_ID,
    },
  });

  const headerInfo = await getEntryContent({
    __typename: CONTENTFUL_TYPENAMES.AUX_NAVIGATION,
    sys: {
      id: DEFAULT_HEADER_ID,
    },
  });

  if (!pageContent) return { notFound: true };

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo: footerInfo,
        headerInfo: headerInfo,
      },
    },
    revalidate: 600,
  };
};

export default CustomPage;
