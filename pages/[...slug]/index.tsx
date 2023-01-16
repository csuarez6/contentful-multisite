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
// import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
// import {
//   DEFAULT_FOOTER_ID,
//   DEFAULT_HEADER_ID,
// } from "@/constants/contentful-ids.constants";
// import getEntryContent from "@/lib/services/entry-content.service";
import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";

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

  // const footerInfo = await getEntryContent({
  //   __typename: CONTENTFUL_TYPENAMES.AUX_NAVIGATION,
  //   sys: {
  //     id: DEFAULT_FOOTER_ID,
  //   },
  // });
  // console.log('Footer cargado');

  // const headerInfo = await getEntryContent({
  //   __typename: CONTENTFUL_TYPENAMES.AUX_NAVIGATION,
  //   sys: {
  //     id: DEFAULT_HEADER_ID,
  //   },
  // });
  // console.log('Header cargado');

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo: mockPageLayoutProps.data.layout.footerInfo,
        headerInfo: mockPageLayoutProps.data.layout.headerInfo,
      },
    },
    revalidate: 10,
  };
};

export default CustomPage;
