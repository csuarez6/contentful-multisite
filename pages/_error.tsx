import NextErrorComponent from "next/error";

// import * as Sentry from "@sentry/nextjs";

import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";

const CustomErrorComponent = (props: any) => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (context: any) => {
  // if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
  //   await Sentry.captureUnderscoreErrorException(context);
  // }

  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 2);

  // This will contain the status code of the response
  const errors = NextErrorComponent.getInitialProps(context);
  return {
    ...errors,
    layout: {
      name: 'Error 404',
      footerInfo,
      headerInfo,
    },
  };
};

export default CustomErrorComponent;
