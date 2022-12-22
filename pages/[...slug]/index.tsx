import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import { NextPageWithLayout } from "../_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";

import getPageContent from "@/lib/services/page-content.service";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";
import jsonToReactComponents from "@/lib/services/render-blocks.service";

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
    context.params.slug[context.params.slug.length - 1],
    context.preview ?? false
  );

  if (!pageContent) return { notFound: true };

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo: mockPageLayoutProps.data.footerInfo,
        headerInfo: mockPageLayoutProps.data.headerInfo,
      },
    },
    revalidate: 600,
  };
};

export default CustomPage;
