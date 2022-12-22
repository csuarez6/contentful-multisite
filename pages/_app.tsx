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
// import CheckoutProvider from "src/context/Checkout/Provider";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, layoutProps?: IPageLayout) => ReactNode;
};

type AppPropsWithLayout = AppProps<IPage> & {
  Component: NextPageWithLayout<IPage>;
};

export const defaultLayout = (page: ReactNode, pageProps: any) => (
  // <CheckoutProvider>
  <PageLayout {...(pageProps.layout ? pageProps.layout : null)}>
    {page}
  </PageLayout>
  // </CheckoutProvider>
);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? defaultLayout;

  return getLayout(<Component {...pageProps} />, pageProps);
}
