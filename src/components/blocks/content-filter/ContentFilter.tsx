// import ProductFilterBlock from "../product-filter/ProductFilter";
// import CarouselCategoriesBlock from "../carousel-categories/CarouselCategories";

export interface IContentFilter {
  categories?: any;
  products?: any;
}

const ContentFilter: React.FC<IContentFilter> = (/*{ categories, products }*/) => {
  return (
    <div className="relative w-full">
      {/* <CarouselCategoriesBlock {...categories} />

      <ProductFilterBlock {...products} /> */}

      Componente aquí
    </div>
  );
};

export default ContentFilter;
