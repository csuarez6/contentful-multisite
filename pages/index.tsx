// import type { ReactElement } from "react";
import { GetStaticProps } from "next";

import jsonToReactComponents from "@/lib/services/render-blocks.service";
import { NextPageWithLayout } from "./_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
// import PageLayout from "@/components/layouts/page-layout/PageLayout";

import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";

import getPageContent from "@/lib/services/page-content.service";
import { getMenu } from "@/lib/services/menu-content.service";

const Home: NextPageWithLayout = ({ blocksCollection }: IPage) => {
  return (
    <>
      {jsonToReactComponents(blocksCollection.items)}
    </>
  );
};

/// Explicit pageLayout assign example
// Home.getLayout = (page: ReactElement, pageProps: IPage = null) => {
//   return <PageLayout {...pageProps}>{page}</PageLayout>;
// };

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
  const pageContent = await getPageContent(
    '/',
    context.preview ?? false
  );

  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 3);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false, 3);

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
    revalidate,
  };
};

export default Home;
