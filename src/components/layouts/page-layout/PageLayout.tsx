import Head from "next/head";
import { useRouter } from "next/router";

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import HeaderBlock from "@/components/blocks/header-block/HeaderBlock";
import FooterBlock from "@/components/blocks/footer-block/FooterBlock";
import { IPage } from "@/lib/interfaces/page-cf.interface";

const PageLayout: React.FC<IPage> = ({ layout, promoTitle, promoDescription, promoImage, children }) => {
  const { asPath } = useRouter() ?? { asPath: "/" };
  const title = `${layout.name} - Grupo Vanti`;
  
  let canonicalUrl = (asPath === "/" ? "" : asPath).split("?")[0];
  canonicalUrl = "https://www.grupovanti.com" + canonicalUrl;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:type" content="Pagina" />
        <meta name="title" content={promoTitle ? promoTitle : layout.name} />
        <meta name="twitter:title" content={`${promoTitle ? promoTitle : layout.name}  - Grupo Vanti`} />
        <meta property="og:title" content={promoTitle ? promoTitle : layout.name} />
        {canonicalUrl && (
          <>
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="twitter:url" content={canonicalUrl} />
          </>
        )}
        {promoDescription && (
          <>
            <meta name="description" content={documentToPlainTextString(promoDescription.json)} />
            <meta name="og:description" content={documentToPlainTextString(promoDescription.json)} />
            <meta name="twitter:description" content={documentToPlainTextString(promoDescription.json)} />
          </>
        )}
        {promoImage && (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:image" content={`${promoImage.url}?w=1200`} />
            <meta name="twitter:image" content={`${promoImage.url}?w=1200`} />
          </>
        )}
      </Head>

      <div className="min-h-screen flex flex-col">
        <HeaderBlock {...layout.headerInfo} />

        <main className="flex-grow overflow-hidden">
          <div className="xl:container mx-auto px-3 sm:px-5 lg:px-8 2xl:px-28">
            {children}
          </div>
        </main>

        <FooterBlock {...layout.footerInfo} />
      </div>
    </>
  );
};

export default PageLayout;
