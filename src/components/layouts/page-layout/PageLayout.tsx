import Head from "next/head";
import { useRouter } from "next/router";
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import HeaderBlock from "@/components/blocks/header-block/HeaderBlock";
import FooterBlock from "@/components/blocks/footer-block/FooterBlock";
import HelpButton from "@/components/organisms/help-button/HelpButton";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import Link from "next/link";

const PageLayout: React.FC<IPage> = ({ layout, promoTitle, promoDescription, promoImage, children, mainNavCollection, __typename }) => {
  const { preview } = layout;
  const { asPath } = useRouter() ?? { asPath: "/" };
  const domain = process.env.DEFAULT_DOMAIN;
  const title = `${layout?.name ?? ''} - Grupo Vanti`;
  const description = promoDescription?.json? documentToPlainTextString(promoDescription.json) : "Conoce cómo agendar, modificar o cancelar tu cita en los puntos de atención.Gestiona los consumos de tus productos Vanti desde la comodidad de tu casa.";
  const image = promoImage?.url ? promoImage.url : "https://images.ctfassets.net/3brzg7q3bvg1/5qkqIbzB1VpZ1DapXhIMho/30e84d821498ebe49b89e1f32597e7c1/vanti-logo-og.png";

  let canonicalUrl = ((asPath === "/" || asPath === "/index") ? "" : asPath).split("?")[0];
  canonicalUrl = domain + canonicalUrl;

  const addProductJsonLd = () => {
    let sdType = __typename;
    if(sdType === 'Page') {
      sdType = 'WebPage';
    }
    return {
      __html: `{
        "mainEntityOfPage":  ${domain}/,
        "name": ${ title },
        "image": ["${image}"],
        "description": ${description},
        "url": ${canonicalUrl},
        ${(sdType === 'WebPage' &&
          `"headline": ${promoTitle ?? description},
          "publisher": {
            "@type": "Organization",
            "name": "GrupoVanti web",
            "logo": "${image}"
          },
          "author": "Vanti",`
        )}
        "@context": "https://schema.org",
        "@type": "${sdType}"
      }`
    };
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

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
        {description && (
          <>
            <meta name="description" content={description} />
            <meta name="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}
        {image && (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:image" content={`${image}`} />
            <meta name="twitter:image" content={`${image}`} />
          </>
        )}
        <meta name="robots" content="noindex, nofollow" />       

        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>

      {preview && (
        <div className="z-30 fixed bottom-0 left-0 w-full h-8 flex justify-between items-center py-2 px-4 bg-category-orange-light-40 text-white font-semibold">
          <span>Estás en modo previsualización (contenido en borrador no publicado)</span>
          <Link href="/api/preview/exit" className="underline hover:text-red-800">
            Exit
          </Link>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <HeaderBlock {...layout.headerInfo} menuNavkey={layout.menuNavkey} overrideNavCollection={mainNavCollection} name={layout.name}/>
        <HelpButton {...layout.helpButton} />
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
