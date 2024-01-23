import { mocksErrorBlockprops } from "@/components/blocks/error-block/ErrorBlock.mock";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import ErrorBlock from "@/components/blocks/error-block/ErrorBlock";

const CustomErrorComponent = () => {
  return <ErrorBlock {...mocksErrorBlockprops.message500} />;
};

export const getStaticProps = async (context: any) => {
  const headerInfo = await getHeader(
    DEFAULT_HEADER_ID,
    context.preview ?? false
  );
  const footerInfo = await getNavigation(
    DEFAULT_FOOTER_ID,
    context.preview ?? false
  );
  const helpButton = await getNavigation(
    DEFAULT_HELP_BUTTON_ID,
    context.preview ?? false
  );

  return {
    props: {
      layout: {
        name: "500 Page",
        footerInfo,
        headerInfo,
        helpButton,
      },
    },
  };
};

export default CustomErrorComponent;
