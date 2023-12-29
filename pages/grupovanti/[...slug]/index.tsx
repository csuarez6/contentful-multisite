import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import { NextPageWithLayout } from "../../_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import getPageContent from "@/lib/services/page-content.service";
import jsonToReactComponents from "@/lib/services/render-blocks.service";
import {
  COOKIES_ID,
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
  DEFAULT_WARRANTY_COPY,
} from "@/constants/contentful-ids.constants";
import { getHeader, getNavigation } from "@/lib/services/menu-content.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import ProductOverview from "@/components/blocks/product-details/ProductOverview";
import getBreadcrumbs from "@/utils/breadcrumbs";
import RichtextPage from "@/components/blocks/richtext-page/RichtextPage";
import { getDataContent } from "@/lib/services/richtext-references.service";
import { classNames } from "@/utils/functions";

const CustomPage: NextPageWithLayout = (props: any) => {
  const { name, promoTitle, blocksCollection, content, enableHeaderPrecedence, showHeader, __typename, sys } = props;
  const __Breadcrumbs = getBreadcrumbs(props);
  return (
    <div className={classNames(
      "flex",
      enableHeaderPrecedence && showHeader ? "flex-col-reverse" : "flex-col"
    )}>
      {!showHeader && <h1 className="sr-only">{promoTitle ?? name}</h1>}
      {blocksCollection?.items?.length > 0 && (
        <div className="overflow-hidden">
          <div className="main-container">
            {jsonToReactComponents(blocksCollection.items)}
            {__typename == CONTENTFUL_TYPENAMES.PRODUCT && (
              <ProductOverview {...props} />
            )}
          </div>
        </div>
      )}
      {content?.json && (
        <div id="footerText" className="main-container max-w-full">
          {enableHeaderPrecedence && showHeader && (jsonToReactComponents([{ ...__Breadcrumbs }]))}
          <RichtextPage {...props} key={sys?.id} />
        </div>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

export const revalidate = 60;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPage>> => {
  const slugArray =
    typeof context.params.slug === "string"
      ? ["", context.params.slug]
      : ["", ...context.params.slug];
  const slugStringPath = slugArray.join("/");

  const pageContent = await getPageContent(
    slugStringPath,
    context.preview ?? false
  );

  if (!pageContent) return { notFound: true };
  if (pageContent.urlPaths[0] != slugStringPath) {
    return {
      redirect: {
        destination: pageContent.urlPaths[0],
        permanent: false,
      },
    };
  }

  const breadCrumbContent = getBreadcrumbs(pageContent);
  const headerInfo = await getHeader(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getNavigation(DEFAULT_FOOTER_ID, context.preview ?? false);
  const helpButton = await getNavigation(DEFAULT_HELP_BUTTON_ID, context.preview ?? false);
  const cookieInfo = await getNavigation(COOKIES_ID, context.preview ?? false);

  const info = {
    __typename: CONTENTFUL_TYPENAMES.COPY_SET,
    sys: {
      id: DEFAULT_WARRANTY_COPY,
    }
  };
  const copyRes = await getDataContent(info);
  const copyServices = copyRes?.copiesCollection?.items;

  const { content, enableHeaderPrecedence, showHeader, } = pageContent;
  const isInfoPageHeader = content?.json && enableHeaderPrecedence && showHeader;
  if (!isInfoPageHeader) {
    if (pageContent?.blocksCollection?.items?.length > 0) {
      const firstBlockViewTypename = pageContent.blocksCollection?.items[0]?.view?.__typename;
      const firstItemsTypes: string[] = [
        CONTENTFUL_TYPENAMES.VIEW_BANNER_IMAGE,
        CONTENTFUL_TYPENAMES.VIEW_BANNER_CAROUSEL,
      ];

      if (firstItemsTypes.indexOf(firstBlockViewTypename) >= 0) {
        pageContent.blocksCollection.items.splice(1, 0, breadCrumbContent);
      } else {
        pageContent.blocksCollection.items.unshift(breadCrumbContent);
      }
    } else if (!pageContent?.blocksCollection?.items?.length) {
      pageContent["blocksCollection"] = {
        items: [breadCrumbContent],
      };
    }
  }

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo,
        headerInfo,
        menuNavkey: context.params.slug[0],
        helpButton,
        preview: context.preview ?? false,
        cookieInfo
      },
      copyServices,
    },
    revalidate,
  };
};

export default CustomPage;
