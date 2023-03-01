import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import { NextPageWithLayout } from "../_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import {
  IProductOverviewDetails,
} from "@/lib/interfaces/product-cf.interface";

import getPageContent from "@/lib/services/page-content.service";
import jsonToReactComponents from "@/lib/services/render-blocks.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
  DEFAULT_HELP_BUTTON_ID,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import ProductOverview from "@/components/blocks/product-details/ProductOverview";
import getEntriesSlugs from "@/lib/services/entries-slugs.query";
import getBreadcrumbs from "@/utils/breadcrumbs";

const CustomPage: NextPageWithLayout = (
  props: IPage & IProductOverviewDetails
) => {
  const { blocksCollection, __typename } = props;

  return __typename == CONTENTFUL_TYPENAMES.PRODUCT ? (
    <>
      {jsonToReactComponents(blocksCollection.items)}
      <ProductOverview {...props} />
    </>
  ) : (
    <>{jsonToReactComponents(blocksCollection.items)}</>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  const entries = await getEntriesSlugs({ limit: 100 }, false);

  for (const entry of entries) {
    if (entry.urlPath !== null && entry.urlPath !== "/") {
      paths.push({
        params: {
          slug: entry.urlPath.split("/").slice(1),
        },
      });
    }
  }

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

  const pageContent = await getPageContent(
    slugArray.join("/"),
    context.preview ?? false
  );

  if (!pageContent) return { notFound: true };
  const breadCrumbContent = getBreadcrumbs(pageContent);
  //let headerID = breadCrumbContent?.ctaCollection?.items[0]?.sys?.id ?? DEFAULT_HEADER_ID;
  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(
    DEFAULT_FOOTER_ID,
    context.preview ?? false,
    2
  );
  const helpButton = await getMenu(
    DEFAULT_HELP_BUTTON_ID,
    context.preview ?? false
  );

  if (pageContent?.blocksCollection?.items?.length > 0) {
    const firstBlockViewTypename =
      pageContent.blocksCollection?.items[0].view?.__typename;
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

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo,
        headerInfo,
        menuNavkey: context.params.slug[0],
        helpButton,
      },
    },
    revalidate,
  };
};

export default CustomPage;
