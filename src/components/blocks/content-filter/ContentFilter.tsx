import { useEffect, useState } from "react";
import useSWR from "swr";

import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";

import ProductFilterBlock from "../product-filter/ProductFilter";
import CarouselCategoriesBlock from "../carousel-categories/CarouselCategories";
import { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import { useRouter } from "next/router";

const ContentFilter: React.FC<IContentFilter> = ({
  contentTypesFilter,
  parentsCollection,
  availableFacets = [],
  title = null,
  description = null,
  blockId = null,
  mainFacet = null,
}) => {
  const { query } = useRouter();
  const fixedFilters = [
    ...contentTypesFilter.map((s) => ["type", s]),
    ...parentsCollection.items.map((p) => ["parent", p.sys.id]),
    ...availableFacets.map((f) => ["facets", f]),
    (mainFacet ? ['mainFacet', mainFacet] : null)
  ];

  const [facetsContent, setFacetsContent] = useState<ISelect[]>([]);
  const [mainFacetContent, setMainFacetContent] = useState<ISelect>(null);
  const [queryString, setQueryString] = useState<string>(
    new URLSearchParams(fixedFilters).toString()
  );

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/content-filter?${queryString}`,
    fetcher
  );

  const productGrill = () => {
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
      <ProductFilterBlock
        products={{ listedContentsCollection: data }}
        facets={facetsContent}
      />
    );
  };

  useEffect(() => {
    if (mainFacet && data?.facets?.length) {
      const tmpMainFacetContent = data.facets.find(
        (f: ISelect) => f.labelSelect === mainFacet
      );
      setMainFacetContent(tmpMainFacetContent);

      if (tmpMainFacetContent) {
        const tmpFacetsContent = data.facets.filter(
          (f: ISelect) => f.name !== tmpMainFacetContent.name
        );
        setFacetsContent(tmpFacetsContent);
      }
    } else if (data?.facets?.length) {
      setFacetsContent([...data.facets]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (query) {
      const queryParams = [];
      for (const k in query) {
        if (k === "slug") continue;

        queryParams.push([k, query[k]]);
        setQueryString(
          new URLSearchParams([...fixedFilters, ...queryParams]).toString()
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="relative w-full">
      <CarouselCategoriesBlock
        view={{
          alignTitle: mainFacet && mainFacetContent ? "Left" : "Center",
        }}
        title={title}
        description={description}
        featuredContentsCollection={{
          items: mainFacetContent?.listedContents ?? [],
        }}
        blockId={blockId}
        queryParamName={mainFacetContent?.name ?? ''}
      />

      {productGrill()}
    </div>
  );
};

export default ContentFilter;
