import NextErrorComponent from "next/error";
import { mocksErrorBlockprops } from "@/components/blocks/error-block/ErrorBlock.mock";
// import * as Sentry from "@sentry/nextjs";

import { DEFAULT_FOOTER_ID, DEFAULT_HEADER_ID, DEFAULT_HELP_BUTTON_ID } from "@/constants/contentful-ids.constants";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import ErrorBlock from "@/components/blocks/error-block/ErrorBlock";

const CustomErrorComponent = () => {
  return (
      <ErrorBlock {...mocksErrorBlockprops.data}/>
  );
};

CustomErrorComponent.getInitialProps = async (context: any) => {
  const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
  const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);

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
