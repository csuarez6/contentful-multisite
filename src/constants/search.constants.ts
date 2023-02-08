import ProductCategoryQuery from "@/lib/graphql/shared/product-category.gql";
import TrademarkQuery from "@/lib/graphql/shared/trademark.gql";

export const FACET_QUERY_MAP = {
  "fields.trademark.name": {
    title: 'Marca',
    inputName: 'marca',
    queryName: 'trademark',
    query: TrademarkQuery,
    modifier: 'stringify'
  },
  "fields.category.name": {
    title: 'Categoría',
    inputName: 'categoria',
    queryName: 'productCategory',
    query: ProductCategoryQuery,
    modifier: 'stringify'
  },
  "fields._price": {
    title: 'Precio',
    inputName: 'precio',
    queryName: null,
    query: null,
    rawOptions: [
      {name: '', text: `0 - 1'000.000`, image: null, value: '-1000000', totalItems: 0},
      {name: '', text: `1'000.001 - 2'000.000`, image: null, value: '1000001-2000000', totalItems: 0},
      {name: '', text: `2'000.001 - 3'000.000`, image: null, value: '2000001-3000000', totalItems: 0},
      {name: '', text: `3'000.001 - 4'000.000`, image: null, value: '3000001-4000000', totalItems: 0},
      {name: '', text: `4'000.001 - 5'000.000`, image: null, value: '4000001-5000000', totalItems: 0},
      {name: '', text: `+5'000.000`, image: null, value: '5000001-', totalItems: 0},
    ],
    modifier: 'range'
  },
};
