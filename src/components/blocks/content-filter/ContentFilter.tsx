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
  title = null,
  description = null,
  blockId = null,
  mainFacet = null,
  preloadContent = null,
}) => {
  const { push, pathname } = useRouter();
  const fixedFilters = [
    ...contentTypesFilter.map((s) => ["type", s]),
    ...parentsCollection.items.map((p) => ["parent", p.sys.id]),
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

  const facetsChangeHandle = (newQueryParams: string) => {
    const { pathname: realPathname } = location;
    push(pathname, realPathname + newQueryParams, { shallow: true });

    const searchQuery =
      newQueryParams.indexOf("?") >= 0
        ? newQueryParams.substring(1)
        : newQueryParams;

    const newQueryParamsArr = JSON.parse(
      '{"' + searchQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );

    const queryParams = [];

    if (newQueryParamsArr && Object.keys(newQueryParamsArr)) {
      for (const k in newQueryParamsArr) {
        if (k === "slug") continue;

        queryParams.push([k, newQueryParamsArr[k]]);
      }
    }

    setQueryString(
      new URLSearchParams([...fixedFilters, ...queryParams]).toString()
    );
  };

  useEffect(() => {
    if (mainFacet && preloadContent?.facets?.length) {
      const tmpMainFacetContent = preloadContent.facets.find(
        (f: ISelect) => f.labelSelect === mainFacet
      );
      setMainFacetContent(tmpMainFacetContent);

      if (tmpMainFacetContent) {
        const tmpFacetsContent = preloadContent.facets.filter(
          (f: ISelect) => f.name !== tmpMainFacetContent.name
        );
        setFacetsContent(tmpFacetsContent);
      }
    } else if (preloadContent?.facets?.length) {
      setFacetsContent([...preloadContent.facets]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        queryParamName={mainFacetContent?.name ?? ""}
      />

      <ProductFilterBlock
        products={{ listedContentsCollection: data }}
        facets={facetsContent}
        onFacetsChange={facetsChangeHandle}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ContentFilter;
