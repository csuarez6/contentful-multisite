import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { IPage } from "@/lib/interfaces/page-cf.interface";
import PageLayout, {
  IPageLayout,
} from "@/components/layouts/page-layout/PageLayout";

import "../styles/globals.css";
import "../styles/button.css";
import "../public/fonts/mulish/mulish.css";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, layoutProps?: IPageLayout) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <PageLayout {...(pageProps.layout ? pageProps.layout : null)}>
        {page}
      </PageLayout>
    ));

  return getLayout(
    <Component {...pageProps} />,
    pageProps.layout ? pageProps.layout : null
  );
}
