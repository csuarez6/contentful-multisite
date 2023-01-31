import ProductCategoryQuery from "@/lib/graphql/shared/product-category.gql";
import TrademarkQuery from "@/lib/graphql/shared/trademark.gql";

export const FACET_QUERY_MAP = {
  "fields.trademark.name": {
    title: 'Marca',
    inputName: 'marca',
    queryName: 'trademark',
    query: TrademarkQuery
  },
  "fields.category.name": {
    title: 'Categoría',
    inputName: 'categoria',
    queryName: 'productCategory',
    query: ProductCategoryQuery
  },
  "fields._price": {
    title: 'Precio',
    inputName: 'precio',
    queryName: null,
    query: null
  },
};
