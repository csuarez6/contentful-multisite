import ProductCategoryQuery from "@/lib/graphql/shared/product-category.gql";
import TrademarkQuery from "@/lib/graphql/shared/trademark.gql";

export const SORTING_OPTIONS = {
  Precio: [
    {
      value: "price_desc",
      text: "Precio de mayor a menor",
    },
    {
      value: "price_asc",
      text: "Precio de menor a mayor",
    },
  ],
};

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
  "fields._rangePriceGasodomestico": {
    title: 'Precio',
    inputName: 'precio_gasodomestico',
    queryName: null,
    query: null,
    modifier: 'stringify'
  },
  "fields._rangePriceVantiListo": {
    title: 'Precio',
    inputName: 'precio_vantilisto',
    queryName: null,
    query: null,
    modifier: 'stringify'
  },
  "fields.month": {
    title: 'Mes',
    inputName: 'mes',
    queryName: null,
    query: null,
    modifier: 'stringify'
  },
  "fields.year": {
    title: 'Año',
    inputName: 'anio',
    queryName: null,
    query: null,
    modifier: 'stringify'
  },
  "fields.zone": {
    title: 'Zona',
    inputName: 'zona',
    queryName: null,
    query: null,
    modifier: 'stringify'
  },
  "fields.company": {
    title: 'Empresa',
    inputName: 'empresa',
    queryName: null,
    query: null,
    modifier: 'stringify'
  },
  "fields.city": {
    title: 'Ciudad',
    inputName: 'city',
    queryName: null,
    query: null,
    modifier: 'stringify'
  },
  "fields.name": {
    title: 'Aliado',
    inputName: 'name',
    queryName: null,
    query: null,
    modifier: 'stringify'
  }
};
