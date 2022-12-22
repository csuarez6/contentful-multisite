import { CONTENTFUL_TYPENAMES } from "./contentful-typenames.constants";

import PageQuery from "@/lib/graphql/page.gql";
import BlockPromoContentQuery from "@/lib/graphql/blocks/promo-content.gql";

const CONTENTFUL_QUERY_MAPS = {
  [CONTENTFUL_TYPENAMES.PAGE]: { 
    typeQuery: 'page', // @TODO: cambiar por queryName
    query: PageQuery,
  },
  [CONTENTFUL_TYPENAMES.PRODUCT]: { 
    typeQuery: 'product',
    query: null,
  },
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: { 
    typeQuery: 'blockPromoContent',
    query: BlockPromoContentQuery,
  },
};

export default CONTENTFUL_QUERY_MAPS;
