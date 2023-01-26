import useSWR from "swr";

import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";

import ProductFilterBlock from "../product-filter/ProductFilter";
import CarouselCategoriesBlock from "../carousel-categories/CarouselCategories";

const ContentFilter: React.FC<IContentFilter> = ({
  contentTypesFilter,
  parentsCollection,
  availableFacets = [],
  title = null,
  description = null,
  blockId = null
}) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const queryParams = new URLSearchParams([
    ...contentTypesFilter.map((s) => ["type", s]),
    ...parentsCollection.items.map((p) => ["parent", p.sys.id]),
    ...availableFacets.map((f) => ["facets", f]),
  ]).toString();

  const { data, error, isLoading } = useSWR(
    `/api/content-filter?${queryParams}`,
    fetcher
  );

  const productGrill = () => {
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return <ProductFilterBlock products={{ listedContentsCollection: data }} />;
  };

  return (
    <div className="relative w-full">
      <CarouselCategoriesBlock
        view={{ alignTitle: 'Left' }}
        title={title}
        description={description}
        featuredContentsCollection={data?.facets[0]}
        blockId={blockId}
      />
      {/* <ProductFilterBlock {...products} /> */}
      {productGrill()}
    </div>
  );
};

export default ContentFilter;
