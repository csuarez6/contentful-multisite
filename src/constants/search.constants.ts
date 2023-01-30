import ProductCategoryQuery from "@/lib/graphql/shared/product-category.gql";
import TrademarkQuery from "@/lib/graphql/shared/trademark.gql";

export const FACET_QUERY_MAP = {
  "fields.trademark.es.sys.id": {
    title: 'Marca',
    inputName: 'marca',
    queryName: 'trademark',
    query: TrademarkQuery
  },
  "fields.category.es.sys.id": {
    title: 'Categoría',
    inputName: 'categoria',
    queryName: 'productCategory',
    query: ProductCategoryQuery
  },
};
