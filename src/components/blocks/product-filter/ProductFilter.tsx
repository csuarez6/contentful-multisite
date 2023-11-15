import { IProductFilterBlock } from "@/lib/interfaces/product-cf.interface";
import SelectAtom, { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import FeaturedProductBlock from "../product-featured/FeaturedProductBlock";

import FeaturedProductBlockSkeleton from "@/components/skeletons/FeaturedProductBlockSkeleton/FeaturedProductBlockSkeleton";
import InfoCardBlock from "../info-card/InfoCard";
import SearchCardBlock from "../search-card/SearchCard";
import Icon from "@/components/atoms/icon/Icon";
import { useEffect, useState } from "react";

interface IWithLoadingData {
  isLoading?: boolean;
  error?: boolean;
}

const FailedContent = () => {
  return (
    <div
      className="w-full max-w-xs px-4 py-3 m-auto bg-red-100 border border-red-400 rounded-md md:max-w-2xl"
      role="alert"
    >
      <p className="font-bold text-red-700 text-size-subtitle1">
        ¡Notificación - Error!
      </p>
      <p className="text-red-600">No se pudo cargar el contenido</p>
    </div>
  );
};

const ProductFilterBlock: React.FC<IProductFilterBlock & IWithLoadingData> = ({
  principalSearch,
  anchor,
  products,
  facets,
  onFacetsChange = null,
  isLoading = false,
  error = false,
  type,
  types,
  initialValue = null,
}) => { 
  const [filterText, setFilterText] = useState<string>("");
  const [refreshFacets, setrefreshFacets] = useState(0);
  const onFacetsChangeHandle = (key, value) => {
    const { search: uri } = location;
    let newUri = "";

    value = (value === "") ? "*" : value;
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf("?") !== -1 ? "&" : "?";

    if (uri.match(re)) {
      newUri =
        value !== "*"
          ? uri.replace(re, "$1" + key + "=" + value + "$2")
          : uri.replace(re, "$2");
    } else {
      newUri = value !== "*" ? uri + separator + key + "=" + value : uri;
    }

    onFacetsChange(newUri);
  };

  useEffect(() => {
    const { search: uri } = location;
    const contUri = uri.split("&");
    const tempPos = contUri?.[0].split("=");
    if ((contUri?.length <= 1 && ((tempPos?.[0] === "?categoria" && !anchor) || (tempPos?.[0] === "?marca" && anchor === "BusquedaCatalogoVantiListo")))|| contUri?.[0] === '') setrefreshFacets(refreshFacets + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facets]);

  const productGrill = () => {
    if (error) return <FailedContent />;
    if (isLoading) return <FeaturedProductBlockSkeleton />;
    return <FeaturedProductBlock {...products} />;
  };

  const rateGrill = () => {
    if (error) return <FailedContent />;
    if (isLoading) return <FeaturedProductBlockSkeleton />;
    return <InfoCardBlock {...products} />;
  };

  const generalSearchGrill = () => {
    if (error) return <FailedContent />;
    if (isLoading) return <FeaturedProductBlockSkeleton />;
    return <SearchCardBlock {...products} />;
  };

  return (
    <section className="w-full">
      <div className="flex items-end gap-6 mb-5 md:justify-between">
        <div className="grid flex-grow grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {facets?.map((el: ISelect, i: number) => {
            return (
              <div className="flex flex-col w-full xs:w-auto" key={`${el.name}-${i}`}>
                <SelectAtom
                  {...el}
                  handleChange={(value) => onFacetsChangeHandle(el.name, value)}
                  key={refreshFacets}
                  currentValue={initialValue?.[el.name]}
                />
              </div>
            );
          })}
        </div>
        {!types?.includes("page") && (type === "AuxAlly" || type === "product") ? (
          <div className="flex">
            <div className='relative'>
              <input
                className="h-[50px] w-full md:w-[345px] border border-grey-60 hover:border-grey-30 focus:border-lucuma-60 rounded py-3 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                type="text"
                placeholder="Buscar"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                onKeyDown={event => (event.key == 'Enter') ? onFacetsChangeHandle("text", filterText) : null}
              />
              <button
                className='absolute right-[11px] top-[27%] flex h-fit text-grey-30'
                onClick={() => onFacetsChangeHandle("text", filterText)}
                type='button'
              >
                <Icon icon='search' size={20} />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="w-full" data-anchor={anchor}>
        {principalSearch
          ? generalSearchGrill()
          : (
            type === "AuxRate"
              ? rateGrill()
              : productGrill()
          )
        }
      </div>
    </section>
  );
};

export default ProductFilterBlock;
