import { useEffect, useState } from "react";
import useSWR from "swr";

import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";

import ProductFilterBlock from "../product-filter/ProductFilter";
import CarouselCategoriesBlock from "../carousel-categories/CarouselCategories";
import { ISelect } from "@/components/atoms/select-atom/SelectAtom";

const ContentFilter: React.FC<IContentFilter> = ({
  contentTypesFilter,
  parentsCollection,
  availableFacets = [],
  title = null,
  description = null,
  blockId = null,
  mainFacet = null,
}) => {
  const [facetsContent, setFacetsContent] = useState<ISelect[]>([]);
  const [mainFacetContent, setMainFacetContent] = useState<ISelect>(null);

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

  return (
    <div className="relative w-full">
      {mainFacetContent?.listedContents && (
        <CarouselCategoriesBlock
          view={{
            alignTitle: mainFacet && mainFacetContent ? "Left" : "Center",
          }}
          title={title}
          description={description}
          featuredContentsCollection={{ items: mainFacetContent.listedContents }}
          blockId={blockId}
          queryParamName={mainFacetContent.name}
        />
      )}

      {productGrill()}
    </div>
  );
};

export default ContentFilter;
