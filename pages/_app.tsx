import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { IPage } from "@/lib/interfaces/page-cf.interface";
import PageLayout from "@/components/layouts/page-layout/PageLayout";

import "../styles/globals.css";
import "../styles/button.css";
import "../public/fonts/mulish/mulish.css";
import "../styles/richtext.css";
import CheckoutProvider from "src/context/Checkout/Provider";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps?: IPage) => ReactNode;
};

type AppPropsWithLayout = AppProps<IPage> & {
  Component: NextPageWithLayout<IPage>;
};

export const defaultLayout = (page: ReactNode, pageProps: IPage) => (
  <CheckoutProvider>
    <PageLayout {...(pageProps ? pageProps : null)}>
      {page}
    </PageLayout>
  </CheckoutProvider>
);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (defaultLayout);

  return getLayout(<Component {...pageProps} />, pageProps);
}
