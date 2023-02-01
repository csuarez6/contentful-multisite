import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useContext } from "react";
import { useRouter } from 'next/router';

import { NextPageWithLayout } from "../_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";
import { IProductOverviewDetails, PaymentMethodType } from "@/lib/interfaces/product-cf.interface";

import getPageContent from "@/lib/services/page-content.service";
import jsonToReactComponents from "@/lib/services/render-blocks.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import ProductOverview from "@/components/blocks/product-details/ProductOverview";
import CheckoutContext from "@/context/Checkout";

const CustomPage: NextPageWithLayout = (props: IPage & IProductOverviewDetails) => {
  const router = useRouter();
  const { addToCart } = useContext(CheckoutContext);
  
  const { blocksCollection, __typename } = props;

  const buyHandlerMap = {
    [PaymentMethodType.pse]: () => {
      router.push('/checkout/pse/verify');
    }
  };

  const onBuyHandler = async (type: PaymentMethodType, skuCode: string, imageProduct: string, titleProduct: string ) => {
    await addToCart(skuCode, imageProduct, titleProduct);
    if (buyHandlerMap[type]) buyHandlerMap[type]();
  };

  return __typename == CONTENTFUL_TYPENAMES.PRODUCT
    ? <ProductOverview {...props} onBuy={onBuyHandler} />
    : <>{jsonToReactComponents(blocksCollection.items)}</>;
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

  const pageContent = await getPageContent(
    slugArray.join("/"),
    context.preview ?? false
  );

  if (!pageContent) return { notFound: true };

  const headerInfo = await getMenu(DEFAULT_HEADER_ID, context.preview ?? false);
  const footerInfo = await getMenu(
    DEFAULT_FOOTER_ID,
    context.preview ?? false,
    2
  );

  return {
    props: {
      ...pageContent,
      layout: {
        name: pageContent.name,
        footerInfo,
        headerInfo,
        menuNavkey: context.params.slug[0]
      },
    },
    revalidate,
  };
};

export default CustomPage;
