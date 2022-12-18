import { GetStaticProps, GetStaticPropsResult } from "next";

import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";
import { IPage } from "@/lib/interfaces/page-cf.interface";

import PageLayout from "@/components/layouts/page-layout/PageLayout";
import InfoCard from "@/components/organisms/cards/info-card/InfoCard";
import ButtonAtom from "@/components/atoms/button/ButtonAtom";

const Home: React.FC<IPage> = ({ layout }) => {
  return (
    <PageLayout
      name={layout.name}
      footerInfo={layout.footerInfo}
      headerInfo={mockPageLayoutProps.data.headerInfo}
    >
      <div className="xl:container mx-auto my-20">
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
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps =
  (): GetStaticPropsResult<IPage> => {
    return {
      props: {
        layout: {
          name: mockPageLayoutProps.data.name,
          footerInfo: mockPageLayoutProps.data.footerInfo,
          headerInfo: null,
        },
      },
      revalidate: 600,
    };
  };

export default Home;
