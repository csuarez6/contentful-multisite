import { CONTENTFUL_TYPENAMES } from "./contentful-typenames.constants";

import PageQuery, { PageFragments } from "@/lib/graphql/page.gql";
import BlockPromoContentQuery, { BlockPromoContentFragments } from "@/lib/graphql/blocks/promo-content.gql";
import AuxCustomContent from "@/lib/graphql/aux/custom-content.gql";
import ProductQuery from '../lib/graphql/product.gql';
import BlockContentFilterQuery from "@/lib/graphql/blocks/content-filter.gql";
import ProductCategoryQuery from "@/lib/graphql/shared/product-category.gql";
import TrademarkQuery from "@/lib/graphql/shared/trademark.gql";
import BlockFormQuery from "@/lib/graphql/blocks/form-content.gql";
import RateQuery from "@/lib/graphql/rate.gql";
import AllyQuery from "@/lib/graphql/ally.gql";
import copySetQuery from "@/lib/graphql/copy/copySet.gql";
import { QN_AUXALLY, QN_AUXCUSTOMCONTENT, QN_AUXRATE, QN_BLOCKFORM, QN_BLOCKPROMOCONTENT, QN_CONTENTFILTER, QN_COPYSET, QN_PAGE, QN_PRODUCT, QN_PRODUCTCATEGORY, QN_TRADEMARK } from "./contentful-querynames.constants";
import PageMinimalQuery from "@/lib/graphql/views/page-minimal.gql";
import ProductMinimalQuery from "@/lib/graphql/product-minimal.gql";
import AuxCustomContentMinimalQuery from "@/lib/graphql/aux/custom-content-minimal.gql";

const CONTENTFUL_QUERY_MAPS = {
  [CONTENTFUL_TYPENAMES.PAGE]: {
    queryName: QN_PAGE,
    query: PageQuery,
    fragments: PageFragments
  },
  [CONTENTFUL_TYPENAMES.PAGE_MINIMAL]: {
    queryName: QN_PAGE,
    query: PageMinimalQuery,
  },
  [CONTENTFUL_TYPENAMES.PRODUCT]: {
    queryName: QN_PRODUCT,
    query: ProductQuery,
  },
  [CONTENTFUL_TYPENAMES.PRODUCT_MINIMAL]: {
    queryName: QN_PRODUCT,
    query: ProductMinimalQuery,
  },
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: {
    queryName: QN_BLOCKPROMOCONTENT,
    query: BlockPromoContentQuery,
    fragments: BlockPromoContentFragments
  },
  [CONTENTFUL_TYPENAMES.BLOCK_FORM]: {
    queryName: QN_BLOCKFORM,
    query: BlockFormQuery,
  },
  [CONTENTFUL_TYPENAMES.BLOCK_CONTENT_FILTER]: {
    queryName: QN_CONTENTFILTER,
    query: BlockContentFilterQuery,
  },
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: {
    queryName: QN_AUXCUSTOMCONTENT,
    query: AuxCustomContent,
  },
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT_MINIMAL]: {
    queryName: QN_AUXCUSTOMCONTENT,
    query: AuxCustomContentMinimalQuery,
  },
  [CONTENTFUL_TYPENAMES.PRODUCT_CATEGORY]: {
    queryName: QN_PRODUCTCATEGORY,
    query: ProductCategoryQuery,
  },
  [CONTENTFUL_TYPENAMES.TRADEMARK]: {
    queryName: QN_TRADEMARK,
    query: TrademarkQuery,
  },
  [CONTENTFUL_TYPENAMES.AUX_RATE]: {
    queryName: QN_AUXRATE,
    algoliaType: 'aux_Rate',
    query: RateQuery,
  },
  [CONTENTFUL_TYPENAMES.AUX_ALLY]: {
    queryName: QN_AUXALLY,
    algoliaType: 'aux_Ally',
    query: AllyQuery,
  },
  [CONTENTFUL_TYPENAMES.COPY_SET]: {
    queryName: QN_COPYSET,
    query: copySetQuery,
  },
};

export default CONTENTFUL_QUERY_MAPS;
