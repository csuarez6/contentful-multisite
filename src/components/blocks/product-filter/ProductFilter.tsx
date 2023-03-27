import { IProductFilterBlock } from "@/lib/interfaces/product-cf.interface";
import SelectAtom, { ISelect } from "@/components/atoms/select-atom/SelectAtom";
import FeaturedProductBlock from "../product-featured/FeaturedProductBlock";

import FeaturedProductBlockSkeleton from "@/components/skeletons/FeaturedProductBlockSkeleton/FeaturedProductBlockSkeleton";
import InfoCardBlock from "../info-card/InfoCard";

interface IWithLoadingData {
  isLoading?: boolean;
  error?: boolean;
}

const ProductFilterBlock: React.FC<IProductFilterBlock & IWithLoadingData> = ({
  products,
  facets,
  onFacetsChange = null,
  isLoading = false,
  error = false,
  type,
}) => {
  const onFacetsChangeHandle = (key, value) => {
    const { search: uri } = location;
    let newUri = "";

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

  return (
    <section className="w-full">
      <div className="flex md:justify-between">
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
      </div>
      {type === "Auxrate" ? rateGrill() : productGrill()}
    </section>
  );
};

export default ProductFilterBlock;
