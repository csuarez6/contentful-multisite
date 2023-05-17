import { IContentFilter } from '@/lib/interfaces/content-filter-cf.interface';
import { mockFeaturedProductProps } from '@/components/organisms/cards/featured-product/FeaturedProduct.mock';

const fetchs = [
  {
    url: "/api/content-filter?type=product&parent=75TurWcpITURu2Z4RPY5tB",
    method: "GET",
    status: 200,
    response: {
      total: 1,
      items: [
        mockFeaturedProductProps.data
      ],
    },
  },
  ...mockFeaturedProductProps.fetchs,
];

const data: IContentFilter = {
  contentTypesFilter: ['product'],
  parentsCollection: {
    items: [{
      sys: {
        id: '75w6bsU9MWCoxDtT7HXyGb'
      }
    }]
  },
};

export const mockContentFilterProps = {
  data,
  fetchs
};
