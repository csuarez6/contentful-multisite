import Head from "next/head";

import { IHeader } from "@/lib/interfaces/header-cf.interface";
import { IFooter } from "@/lib/interfaces/footer-cf.interface";

import HeaderBlock from "@/components/blocks/header-block/HeaderBlock";
import FooterBlock from "@/components/blocks/footer-block/FooterBlock";

export interface IPageLayout {
  children?: React.ReactNode;
  name: string;
  headerInfo: IHeader;
  footerInfo: IFooter;
}

const PageLayout: React.FC<IPageLayout> = ({ children, name, headerInfo, footerInfo }) => {
  return (
    <>
      <Head>
        <title>{name} - Grupo Vanti</title>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <HeaderBlock {...headerInfo} />

      <main>
        {children}
      </main>

      <FooterBlock {...footerInfo} />
    </>
  );
};

export default PageLayout;
