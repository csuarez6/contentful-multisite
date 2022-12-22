// import type { ReactElement } from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";

import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";

import { NextPageWithLayout } from "./_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
// import PageLayout, {
//   IPageLayout,
// } from "@/components/layouts/page-layout/PageLayout";

import InfoCard from "@/components/organisms/cards/info-card/InfoCard";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";

const Home: NextPageWithLayout = ({ name }: IPage) => {
  return (
    <div className="xl:container mx-auto my-20">
      <h1 className="mb-6 block">{name}</h1>

      <InfoCard
        title="Biblioteca de componentes"
        description="Desde el siguiente enlace puedes acceder a la biblioteca de componentes del proyecto."
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

export const getStaticProps: GetStaticProps =
  (): GetStaticPropsResult<IPage> => {
    return {
      props: {
        name: 'Home',
        layout: {
          name: mockPageLayoutProps.data.name,
          footerInfo: mockPageLayoutProps.data.footerInfo,
          headerInfo: mockPageLayoutProps.data.headerInfo,
        },
      },
      revalidate: 600,
    };
  };

export default Home;
