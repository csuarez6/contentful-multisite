// import type { ReactElement } from "react";
import { GetStaticProps } from "next";

import jsonToReactComponents from "@/lib/services/render-blocks.service";
import { NextPageWithLayout } from "../_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
// import PageLayout from "@/components/layouts/page-layout/PageLayout";

import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID, COOKIES_ID  } from "@/constants/contentful-ids.constants";

import getPageContent from "@/lib/services/page-content.service";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";

const Home: NextPageWithLayout = ({ name, promoTitle, blocksCollection }: IPage) => {
  return (
    <>
      <h1 className="sr-only">{promoTitle ?? name}</h1>
      <div className="overflow-hidden">
        <div className="main-container">
          {jsonToReactComponents(blocksCollection.items)}
        </div>
      </div>
    </>
  );
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (context) => {
  const pageContent = await getPageContent(
    '/',
    context.preview ?? false
  );

  const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
  const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);
  const cookieInfo = await getNavigation(COOKIES_ID, context.preview ?? false);
  
  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo,
        headerInfo,
        helpButton,
        cookieInfo
      },
    },
    revalidate,
  };
};

export default Home;
