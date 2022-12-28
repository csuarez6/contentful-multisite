// import type { ReactElement } from "react";
import { GetStaticProps } from "next";

import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";

import { NextPageWithLayout } from "./_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
// import PageLayout, {
//   IPageLayout,
// } from "@/components/layouts/page-layout/PageLayout";

import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";

import InfoCard from "@/components/organisms/cards/info-card/InfoCard";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";
import getEntryContent from "@/lib/services/entry-content.service";

const Home: NextPageWithLayout = ({ name }: IPage) => {
  return (
    <div className="xl:container mx-auto my-20">
      <h1 className="mb-6 block">{name}</h1>

      <InfoCard
        promoTitle="Biblioteca de componentes"
        promoDescription="Desde el siguiente enlace puedes acceder a la biblioteca de componentes del proyecto."
      />
      <span className="block my-6"></span>
      <ButtonAtom
        type="link"
        text="Ir a al biblioteca"
        link={{
          href: "https://grupovanti.gitlab.io/Marketplace/web-commerce/main/",
          target: "_blank",
        }}
        classes="button-primary"
      />
    </div>
  );
};

/// Explicit pageLayout assign example
// Home.getLayout = (page: ReactElement, layoutProps: IPageLayout = null) => {
//   return <PageLayout {...layoutProps}>{page}</PageLayout>;
// };

export const getStaticProps: GetStaticProps = async () => {
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
      name: "Home",
      headerInfo,
      layout: {
        name: mockPageLayoutProps.data.name,
        footerInfo: footerInfo,
        headerInfo: headerInfo,
      },
    },
    revalidate: 600,
  };
};

export default Home;
