import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/button.css";
import "../public/fonts/mulish/mulish.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
