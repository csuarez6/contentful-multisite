import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import { NextPageWithLayout } from "../_app";
import { IPage } from "@/lib/interfaces/page-cf.interface";

import getPageContent from "@/lib/services/page-content.service";
import jsonToReactComponents from "@/lib/services/render-blocks.service";
import {
  DEFAULT_FOOTER_ID,
  DEFAULT_HEADER_ID,
} from "@/constants/contentful-ids.constants";
import { getMenu } from "@/lib/services/menu-content.service";
import { CONTENTFUL_TYPENAMES } from "@/constants/contentful-typenames.constants";
import ProductOverview from "@/components/blocks/product-details/ProductOverview";
import { PaymentMethodType } from "@/lib/interfaces/product-cf.interface";
import CheckoutContext from 'src/context/Checkout';
import { useContext } from "react";
import { useRouter } from 'next/router';

const CustomPage: NextPageWithLayout = (props: IPage) => {
  const router = useRouter();
  const { blocksCollection, __typename } = props;
  const { addToCart } = useContext(CheckoutContext);
  const buyHandlerMap = {
    [PaymentMethodType.pse]: () => {
      router.push('/checkout/pse/verify');
    }
  };
  const onBuyHandler = (type: PaymentMethodType, skuCode: string) => {
    console.log("skuCode", skuCode);
    addToCart(skuCode);
    if (buyHandlerMap[type]) buyHandlerMap[type]();
  };
  console.log(props);
  return __typename == CONTENTFUL_TYPENAMES.PRODUCT
    ? <ProductOverview {...props} onBuy={onBuyHandler} />
    : <>{jsonToReactComponents(blocksCollection.items)}</>;
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [];
  return { paths, fallback: "blocking" };
};

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

  // console.log('Página cargada');
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
      },
    },
    revalidate: 10,
  };
};

export default CustomPage;
