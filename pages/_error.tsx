import NextErrorComponent from "next/error";

import * as Sentry from "@sentry/nextjs";

import { mockPageLayoutProps } from "@/components/layouts/page-layout/PageLayout.mocks";

const CustomErrorComponent = (props: any) => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (context: any) => {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    await Sentry.captureUnderscoreErrorException(context);
  }

  // This will contain the status code of the response
  const errors = NextErrorComponent.getInitialProps(context);
  return {
    ...errors,
    layout: {
      name: mockPageLayoutProps.data.name,
      footerInfo: mockPageLayoutProps.data.footerInfo,
      headerInfo: mockPageLayoutProps.data.headerInfo,
    },
  };
};

export default CustomErrorComponent;
