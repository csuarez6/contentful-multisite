import { mockCarouselCategoriesProps } from '../carousel-categories/CarouselCategories.mocks';
import { mockProductFilterProps } from '../product-filter/ProductFilter.mocks';

import { IContentFilter } from './ContentFilter';

const data: IContentFilter = {
  categories: mockCarouselCategoriesProps.data,
  products: mockProductFilterProps.data
};

export const mockContentFilterProps = {
  data,
};
