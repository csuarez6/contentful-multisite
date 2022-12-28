import Head from "next/head";

import { INavigation } from "@/lib/interfaces/menu-cf.interface";

import HeaderBlock from "@/components/blocks/header-block/HeaderBlock";
import FooterBlock from "@/components/blocks/footer-block/FooterBlock";

export interface IPageLayout {
  children?: React.ReactNode;
  name?: string;
  headerInfo?: INavigation;
  footerInfo?: INavigation;
}

const PageLayout: React.FC<IPageLayout> = ({ children, name, headerInfo, footerInfo }) => {
  const title = `${name} - Grupo Vanti`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
