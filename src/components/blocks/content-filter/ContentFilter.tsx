import { useEffect, useState } from "react";
import useSWR from "swr";

import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";

import ProductFilterBlock from "../product-filter/ProductFilter";
import CarouselCategoriesBlock from "../carousel-categories/CarouselCategories";
import { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import { useRouter } from "next/router";

const ContentFilter: React.FC<IContentFilter> = ({
  sys,
  contentTypesFilter,
  parentsCollection,
  title = null,
  description = null,
  blockId = null,
  mainFacet = null,
  preloadContent = null,
}) => {
  const { push, pathname, asPath } = useRouter();
  const [page, setPage] = useState<number>(1);

  const principalSearch = sys.id === '75w6bsU9MWCoxDtT7HXyGb';

  const fixedFilters = [
    ...contentTypesFilter.map((s) => ["type", s]),
    ...parentsCollection.items.map((p) => ["parent", p.sys.id]),
    ["pageResults", preloadContent?.pageResults ?? 9]
  ];

  const [facetsContent, setFacetsContent] = useState<ISelect[]>([]);
  const [mainFacetContent, setMainFacetContent] = useState<ISelect>(null);
  const [queryString, setQueryString] = useState<string>(
    new URLSearchParams(fixedFilters).toString()
  );
  const urlParams = new URLSearchParams(queryString);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/content-filter?${queryString}&page=${page}`,
    fetcher
  );
  const facetsChangeHandle = (newQueryParams: string) => {
    const { pathname: realPathname } = location;
    push(pathname, realPathname + newQueryParams, { shallow: true });

    const searchQuery =
      newQueryParams.indexOf("?") >= 0
        ? newQueryParams.substring(1)
        : newQueryParams;
    if (searchQuery) {
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
    }
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

    const { search } = document.location;
    if (search) {
      facetsChangeHandle(search);
    } else {
      setQueryString(new URLSearchParams(fixedFilters).toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);
  return (
    <div className="relative w-full">
      {(principalSearch && data?.totalItems > 0) && (
        <div>
          <h2 className="text-4xl text-center text-blue-dark">Resultados de búsqueda</h2>
          <p className="text-2xl text-center">Hemos encontrado ({data.totalItems}) resultados asociados a tu búsqueda</p>
        </div>
      )}
      {(title || mainFacetContent?.listedContents?.length > 0) && (
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
          filterName={urlParams?.get(mainFacetContent?.name)}
        />
      )}
      {facetsContent && (
        <ProductFilterBlock
          products={{ listedContentsCollection: data }}
          facets={facetsContent}
          principalSearch={principalSearch}
          onFacetsChange={facetsChangeHandle}
          isLoading={isLoading}
          error={error}
          type={contentTypesFilter[0]}
          types={contentTypesFilter}
        />
      )}
      {data?.totalPages > 1 && (
        <div className="block w-full my-4 mb-12">
          <ul className="flex flex-row items-center justify-center w-full gap-1">
            {data?.actualPage !== undefined && data.actualPage > 0 && (
              <li>
                <button
                  onClick={() => setPage(data.actualPage)}
                  className="py-1 mx-2 text-sm font-normal bg-white border-b border-transparent border-solid blue-dark hover:border-blue-dark"
                >
                  &lt; Anterior
                </button>
              </li>
            )}
            {new Array(data?.totalPages ?? 1).fill("").map((_, k) => (
              <li key={`page-${k}`}>
                <button
                  onClick={() => setPage(k + 1)}
                  className={`blue-dark bg-white mx-2 py-1 text-sm font-normal border-b border-solid ${k == data?.actualPage
                    ? "border-blue-dark"
                    : "border-transparent"
                    }`}
                >
                  {k + 1}
                </button>
              </li>
            ))}
            {data?.actualPage !== undefined &&
              data?.totalPages !== undefined &&
              data.actualPage + 1 < data.totalPages && (
                <li>
                  <button
                    onClick={() => setPage(data.actualPage + 2)}
                    className="py-1 mx-2 text-sm font-normal bg-white border-b border-transparent border-solid blue-dark hover:border-blue-dark"
                  >
                    Siguiente &gt;
                  </button>
                </li>
              )}
          </ul>
        </div>
      )}
      {data === null && (
        <h3 className="flex justify-center items-center w-full min-h-[200px] pb-12 text-center">
          No se encontraron resultados
        </h3>
      )}
    </div>
  );
};

export default ContentFilter;
