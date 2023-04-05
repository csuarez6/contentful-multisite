import NextErrorComponent from "next/error";

// import * as Sentry from "@sentry/nextjs";

import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";

const CustomErrorComponent = (props: any) => {
  return (
    <div className="overflow-hidden">
      <div className="main-container">
        <NextErrorComponent statusCode={props.statusCode} />;
      </div>
    </div>
  );
};

CustomErrorComponent.getInitialProps = async (context: any) => {
  // if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
  //   await Sentry.captureUnderscoreErrorException(context);
  // }

  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(DEFAULT_FOOTER_ID, context.preview ?? false, 2);
  const helpButton = await getMenu(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

  // This will contain the status code of the response
  const errors = NextErrorComponent.getInitialProps(context);
  return {
    ...errors,
    layout: {
      name: 'Error 404',
      footerInfo,
      headerInfo,
      helpButton,
    },
  };
};

export default CustomErrorComponent;
