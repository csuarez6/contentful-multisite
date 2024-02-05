import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IContentFilter } from "@/lib/interfaces/content-filter-cf.interface";
import { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import Pagination from "@/components/organisms/pagination/Pagination";
import ProductFilterBlock from "../product-filter/ProductFilter";
import CarouselCategoriesBlock from "../carousel-categories/CarouselCategories";

import { DEFAULT_GASODOMESTICOS_PARENT_ID } from "@/constants/contentful-ids.constants";

const ContentFilter: React.FC<IContentFilter> = ({
  sys,
  contentTypesFilter,
  parentsCollection,
  title = null,
  description = null,
  blockId = null,
  mainFacet = null,
  orderingOptions = null,
  pageResults = null,
  availableFacets = null,
}) => {
  const { push, pathname, asPath } = useRouter();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const { search: uri } = location;
    const res = uri?.split("page")?.[1]?.split("=")?.[1]?.split("&")?.[0] ?? "1";
    setPage(parseInt(res));
  }, [asPath]);

  const updatePage = (value) => {
    const { pathname: realPathname, search: uri } = location;
    const hasP = uri?.split("page")?.[1]?.split("=")?.[1]?.split("&")?.[0];
    if (hasP) {
      let finalPath = uri;
      const firstPart = uri?.split("page")?.[0];
      if (firstPart) {
        finalPath = firstPart + `page=${value}`;
        const secondPart =
          uri?.split("page")?.[1]?.split("=")?.[1]?.split("&")?.[1] ?? null;
        if (secondPart !== null) {
          finalPath = finalPath + "&" + secondPart;
          const thirtPart = uri?.split(secondPart)?.[1] ?? null;
          if (thirtPart) {
            finalPath = finalPath + thirtPart;
          }
        }
      }
      window.location.search = finalPath;
    } else {
      push(
        pathname,
        realPathname + uri + (uri !== "" ? `&page=${value}` : `?page=${value}`)
      );
    }
    setPage(value);
    const $header = document?.querySelector("header#header");
    const $anchor = document?.querySelector(`[data-anchor="${blockId}"]`);
    const $coord = $anchor?.getBoundingClientRect();

    window.scroll(0, $coord?.top - $header?.clientHeight);
  };

  const principalSearch = sys?.id === "75w6bsU9MWCoxDtT7HXyGb";

  const fixedFilters = [
    ...contentTypesFilter.map((s) => ["type", s]),
    ...parentsCollection.items.map((p) => ["parent", p.sys.id]),
    ["pageResults", pageResults.toString() ?? "9"],
    ["facets", availableFacets?.join(",") ?? ""],
  ];

  const [facetsContent, setFacetsContent] = useState<ISelect[]>([]);
  const [mainFacetContent, setMainFacetContent] = useState<ISelect>(null);
  const [initialValue, setInitialValue] = useState(null);
  const [queryString, setQueryString] = useState<string>();
  const [contentData, setContentData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const urlParams = new URLSearchParams(queryString);
  const facetsChangeHandle = (newQueryParams: string) => {
    const { pathname: realPathname } = location;
    push(pathname, realPathname + newQueryParams, { shallow: true });
    try {
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
        setInitialValue(newQueryParamsArr);
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
      } else {
        setInitialValue(null);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    (async () => {
      if (queryString) {
        try {
          const response = await fetch(`/api/content-filter?${queryString}&page=${page}`);
          const result = await response.json();

          if (result) {
            if (result?.facets?.length) {
              // Delete the select filter Vantilisto in the "gasodomesticos" searching and vice versa
              result.facets = result.facets.filter((facet: any) => {
                return !(
                  facet?.name === "precio_vantilisto" &&
                  parentsCollection.items?.[0]?.sys?.id ===
                    DEFAULT_GASODOMESTICOS_PARENT_ID
                );
              });

              if (mainFacet) {
                const tmpMainFacetContent = result.facets.find(
                  (f: ISelect) => f.labelSelect === mainFacet
                );
                setMainFacetContent(tmpMainFacetContent);
                setFacetsContent(
                  tmpMainFacetContent
                    ? result.facets.filter(
                        (f: ISelect) => f.name !== tmpMainFacetContent.name
                      )
                    : null
                );
              } else {
                setFacetsContent([...result.facets]);
                setMainFacetContent(null);
              }
            }
            setContentData(result);
            setError(null);
          } else {
            setContentData(null);
            setMainFacetContent(null);
            setError(null);
            setFacetsContent(null);
          }
        } catch (error) {
          setError(error);
          setContentData(null);
          setMainFacetContent(null);
        } finally {
          setIsLoading(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  useEffect(() => {
    setIsLoading(true);
    const { search } = document.location;
    if (search) {
      facetsChangeHandle(search);
    } else {
      setQueryString(new URLSearchParams(fixedFilters).toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <div className="relative w-full flex flex-col">
      {principalSearch && contentData?.totalItems > 0 && (
        <div className="flex flex-col gap-5 mb-7 md:mb-9">
          <h1 className="text-4xl text-center text-blue-dark">
            Resultados de búsqueda
          </h1>
          <p className="text-2xl text-center text-grey-30">
            Hemos encontrado ({contentData.totalItems}) resultados asociados a
            tu búsqueda
          </p>
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
          anchor={blockId}
          products={{ listedContentsCollection: contentData }}
          facets={facetsContent}
          principalSearch={principalSearch}
          onFacetsChange={facetsChangeHandle}
          isLoading={isLoading}
          error={error}
          type={contentTypesFilter[0]}
          types={contentTypesFilter}
          initialValue={initialValue}
          orderingOptions={orderingOptions}
        />
      )}
      {contentData?.totalPages > 1 && (
        <Pagination
          currentPage={contentData?.actualPage}
          pageRange={5}
          totalPages={contentData?.totalPages}
          onPage={updatePage}
        />
      )}
      {contentData === null && (
        <h3 className="flex justify-center items-center w-full min-h-[200px] pb-12 text-center">
          No se encontraron resultados
        </h3>
      )}
    </div>
  );
};

export default ContentFilter;
