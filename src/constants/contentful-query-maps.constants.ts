import { CONTENTFUL_TYPENAMES } from "./contentful-typenames.constants";

import PageQuery from "@/lib/graphql/page.gql";
import BlockPromoContentQuery from "@/lib/graphql/blocks/promo-content.gql";
import AuxNavigationQuery from "@/lib/graphql/aux/navigation.gql";
import AuxCustomContent from "@/lib/graphql/aux/custom-content.gql";

const CONTENTFUL_QUERY_MAPS = {
  [CONTENTFUL_TYPENAMES.PAGE]: { 
    queryName: 'page',
    query: PageQuery,
  },
  [CONTENTFUL_TYPENAMES.PRODUCT]: { 
    queryName: 'product',
    query: null,
  },
  [CONTENTFUL_TYPENAMES.BLOCK_PROMO_CONTENT]: { 
    queryName: 'blockPromoContent',
    query: BlockPromoContentQuery,
  },
  [CONTENTFUL_TYPENAMES.AUX_NAVIGATION]: { 
    queryName: 'auxNavigation',
    query: AuxNavigationQuery,
  },
  [CONTENTFUL_TYPENAMES.AUX_CUSTOM_CONTENT]: { 
    queryName: 'auxCustomContent',
    query: AuxCustomContent,
  },
};

export default CONTENTFUL_QUERY_MAPS;
