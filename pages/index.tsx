// import type { ReactElement } from "react";
import { GetStaticProps } from "next";

import jsonToReactComponents from "@/lib/services/render-blocks.service";
import { NextPageWithLayout } from "./_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
// import PageLayout from "@/components/layouts/page-layout/PageLayout";

import { HOME_URL_PATH } from "@/constants/url-paths.constants";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";

import getEntryContent from "@/lib/services/entry-content.service";
import getPageContent from "@/lib/services/page-content.service";

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

export const getStaticProps: GetStaticProps = async (context) => {
  const pageContent = await getPageContent(
    HOME_URL_PATH,
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

export default Home;
