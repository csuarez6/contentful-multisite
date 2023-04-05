import { IProductFilterBlock } from "@/lib/interfaces/product-cf.interface";
import SelectAtom, { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import FeaturedProductBlock from "../product-featured/FeaturedProductBlock";

import FeaturedProductBlockSkeleton from "@/components/skeletons/FeaturedProductBlockSkeleton/FeaturedProductBlockSkeleton";
import InfoCardBlock from "../info-card/InfoCard";
import SearchCardBlock from "../search-card/SearchCard";
import Icon from "@/components/atoms/icon/Icon";
import { useState } from "react";

interface IWithLoadingData {
  isLoading?: boolean;
  error?: boolean;
}

const ProductFilterBlock: React.FC<IProductFilterBlock & IWithLoadingData> = ({
  principalSearch,
  products,
  facets,
  onFacetsChange = null,
  isLoading = false,
  error = false,
  type,
}) => {
  const [filterText, setFilterText] = useState<string>("");
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

  const productGrill = () => {
    if (error) return <div>failed to load</div>;
    if (isLoading) return <FeaturedProductBlockSkeleton />;
    return <FeaturedProductBlock {...products} />;
  };

  const rateGrill = () => {
    if (error) return <div>failed to load</div>;
    if (isLoading) return <FeaturedProductBlockSkeleton />;
    return <InfoCardBlock {...products} />;
  };

  const generalSearchGrill = () => {
    if (error) return <div>failed to load</div>;
    if (isLoading) return <FeaturedProductBlockSkeleton />;
    return <SearchCardBlock {...products} />;
  };

  return (
    <section className="w-full">
      <div className="flex items-center md:justify-between">
        <div className="flex gap-6">
          {facets?.map((el: ISelect, i: number) => {
            return (
              <SelectAtom
                {...el}
                key={`${el.name}-${i}`}
                handleChange={(value) => onFacetsChangeHandle(el.name, value)}
              />
            );
          })}
        </div>
        {(type === "AuxAlly") ? (
          <div className="flex">
            <div className='relative'>
              <input
                className="border border-grey-60 rounded w-full py-3 px-3 text-[#293842] placeholder:text-grey-60 leading-tight focus:outline-none"
                type="text"
                placeholder="Buscar"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
              />
              <button
                className='absolute right-[11px] top-[27%] flex h-fit text-grey-30'
                onClick={() => onFacetsChangeHandle("name", filterText)}
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
      {principalSearch ? generalSearchGrill() : (() => {
        switch (type) {
          case 'AuxRate':
            return rateGrill();
          default:
            return productGrill();
        }
      })()}
    </section>
  );
};

export default ProductFilterBlock;
